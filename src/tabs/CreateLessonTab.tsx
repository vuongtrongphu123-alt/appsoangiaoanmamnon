import React, { useState, useEffect, useRef } from 'react';
import {
  Wand2,
  Save,
  FileDown,
  Printer,
  Copy,
  Stethoscope,
  Lightbulb,
  FileText,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { DomainId, AgeGroupId, LessonPlan, UserProfile } from '../types';
import { DOMAIN_ACTIVITIES, AGE_GROUP_CONFIG, SAMPLE_LESSONS } from '../data/constants';
import { generateLessonPlanAI, suggestTopicAI } from '../services/geminiService';

interface CreateLessonTabProps {
  user: UserProfile;
  currentEditingPlan: LessonPlan | null;
  onSavePlan: (plan: LessonPlan) => void;
  onSendToAudit: (text: string, age: string) => void;
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

export const CreateLessonTab: React.FC<CreateLessonTabProps> = ({
  user,
  currentEditingPlan,
  onSavePlan,
  onSendToAudit,
  onToast,
}) => {
  const [curriculumType, setCurriculumType] = useState<'current' | 'pilot'>('current');
  const [school, setSchool] = useState(user.school || 'Trường MN Sơn Đồng 3');
  const [className, setClassName] = useState(user.className || 'Lớp Mẫu giáo 4-5 tuổi B5');
  const [ageGroup, setAgeGroup] = useState<AgeGroupId>('4-5t');
  const [domain, setDomain] = useState<DomainId>('nhan_thuc');
  const [actType, setActType] = useState<string>(DOMAIN_ACTIVITIES.nhan_thuc[0]);
  const [theme, setTheme] = useState('Thế giới Thực vật');
  const [subTheme, setSubTheme] = useState('Một số loại hoa quả ngày Tết');
  const [topic, setTopic] = useState('Đếm đến 5, nhận biết các nhóm có 5 đối tượng và nhận biết chữ số 5');
  const [duration, setDuration] = useState('25 - 30 phút');
  const [style, setStyle] = useState('chi_tiet');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestingTopic, setIsSuggestingTopic] = useState(false);
  const [statusTag, setStatusTag] = useState('Chưa lưu');

  const editorRef = useRef<HTMLDivElement>(null);

  // Sync with currentEditingPlan if passed
  useEffect(() => {
    if (currentEditingPlan) {
      setTopic(currentEditingPlan.title);
      setDomain(currentEditingPlan.domain);
      setAgeGroup(currentEditingPlan.ageGroup);
      setDuration(currentEditingPlan.duration);
      setTheme(currentEditingPlan.theme || 'Thế giới Thực vật');
      setSubTheme(currentEditingPlan.subTheme || 'Hoa quả');
      setStyle(currentEditingPlan.style || 'chi_tiet');
      if (editorRef.current) {
        editorRef.current.innerHTML = currentEditingPlan.contentHtml;
      }
      setStatusTag('Đang xem');
    }
  }, [currentEditingPlan]);

  // Update activity options when domain changes
  useEffect(() => {
    const activities = DOMAIN_ACTIVITIES[domain] || [];
    if (activities.length > 0 && !activities.includes(actType)) {
      setActType(activities[0]);
    }
  }, [domain, actType]);

  // Update duration automatically when age changes
  const handleAgeChange = (newAge: AgeGroupId) => {
    setAgeGroup(newAge);
    const config = AGE_GROUP_CONFIG[newAge];
    if (config) {
      setDuration(config.defaultDuration);
    }
  };

  // Generate Lesson Plan AI
  const handleGenerate = async () => {
    if (!topic.trim()) {
      onToast('Vui lòng nhập tên đề tài bài dạy!', 'warning');
      return;
    }

    setIsLoading(true);
    setStatusTag('Đang tạo...');

    try {
      const ageConfig = AGE_GROUP_CONFIG[ageGroup];
      const domainNameMap: Record<DomainId, string> = {
        nhan_thuc: 'Phát triển nhận thức',
        ngon_ngu: 'Phát triển ngôn ngữ',
        the_chat: 'Phát triển thể chất',
        tham_my: 'Phát triển thẩm mỹ',
        tinh_cam: 'Phát triển tình cảm & kỹ năng xã hội',
      };

      const html = await generateLessonPlanAI({
        school,
        className,
        ageGroupName: ageConfig.label,
        domainName: domainNameMap[domain],
        actType,
        theme,
        subTheme,
        topic,
        duration,
        style,
        notes,
        isPilot: curriculumType === 'pilot',
      });

      if (editorRef.current) {
        editorRef.current.innerHTML = html;
      }
      setStatusTag('Đã tạo');
      onToast('AI đã soạn giáo án thành công!', 'success');
    } catch (err) {
      onToast('Không thể kết nối dịch vụ AI, hãy thử lại.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  // Load sample plan into editor
  const handleLoadSample = () => {
    const sample = SAMPLE_LESSONS[0];
    setTopic(sample.title);
    setDomain(sample.domain);
    setAgeGroup(sample.ageGroup);
    setDuration(sample.duration);
    setTheme(sample.theme);
    setSubTheme(sample.subTheme);
    setStyle(sample.style);
    if (editorRef.current) {
      editorRef.current.innerHTML = sample.contentHtml;
    }
    setStatusTag('Mẫu chuẩn BGD');
    onToast('Đã nạp giáo án mẫu chuẩn để cô chỉnh sửa!', 'success');
  };

  // Suggest Topic AI
  const handleSuggestTopic = async () => {
    setIsSuggestingTopic(true);
    try {
      const topics = await suggestTopicAI(
        domain,
        AGE_GROUP_CONFIG[ageGroup].label,
        theme,
        actType
      );
      if (topics && topics.length > 0) {
        setTopic(topics[0]);
        onToast('Đã nạp tên đề tài mới gợi ý từ AI!', 'success');
      }
    } catch {
      setTopic(`Khám phá điều kỳ diệu quanh bé (${theme})`);
    } finally {
      setIsSuggestingTopic(false);
    }
  };

  // Save current plan to library
  const handleSave = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!content || content.includes('Chưa có nội dung giáo án hiển thị')) {
      onToast('Không có nội dung giáo án để lưu!', 'warning');
      return;
    }

    const domainNameMap: Record<DomainId, string> = {
      nhan_thuc: 'Phát triển nhận thức',
      ngon_ngu: 'Phát triển ngôn ngữ',
      the_chat: 'Phát triển thể chất',
      tham_my: 'Phát triển thẩm mỹ',
      tinh_cam: 'Phát triển tình cảm & kỹ năng xã hội',
    };

    const newPlan: LessonPlan = {
      id: currentEditingPlan?.id || 'plan-' + Date.now(),
      title: topic.trim() || 'Giáo án mầm non',
      domain,
      domainName: domainNameMap[domain],
      ageGroup,
      ageName: AGE_GROUP_CONFIG[ageGroup].label,
      duration,
      theme,
      subTheme,
      style,
      year: '2026–2027',
      school,
      className,
      contentHtml: content,
      isPilot: curriculumType === 'pilot',
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };

    onSavePlan(newPlan);
    setStatusTag('Đã lưu vào kho');
    onToast('Đã lưu giáo án vào Kho Của Tôi thành công!', 'success');
  };

  // Export to Word (.doc)
  const handleExportWord = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!content || content.includes('Chưa có nội dung')) {
      onToast('Không có nội dung để xuất file!', 'warning');
      return;
    }

    const fileName = (topic.trim() || 'Giao_An_Mam_Non').replace(/\s+/g, '_');
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${topic}</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.5; color: #000; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #000; padding: 6px 8px; font-size: 12pt; }
        h2 { font-size: 15pt; text-align: center; }
      </style>
      </head><body>
    `;
    const footerHtml = '</body></html>';
    const source = headerHtml + content + footerHtml;

    const blob = new Blob(['\ufeff' + source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_2026_2027.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast('Đã tải xuống file Word (.doc) thành công!', 'success');
  };

  // Print / PDF
  const handlePrint = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!content || content.includes('Chưa có nội dung')) {
      onToast('Không có nội dung để in!', 'warning');
      return;
    }
    window.print();
  };

  // Copy plain text
  const handleCopyText = () => {
    const text = editorRef.current?.innerText || '';
    if (!text || text.includes('Chưa có nội dung')) {
      onToast('Chưa có nội dung để sao chép!', 'warning');
      return;
    }
    navigator.clipboard.writeText(text);
    onToast('Đã sao chép toàn bộ văn bản vào Clipboard!', 'success');
  };

  // Send to Audit
  const handleSendToAudit = () => {
    const text = editorRef.current?.innerText || '';
    if (!text || text.includes('Chưa có nội dung')) {
      onToast('Chưa có nội dung giáo án để kiểm tra!', 'warning');
      return;
    }
    onSendToAudit(text, AGE_GROUP_CONFIG[ageGroup].label);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Curriculum Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-[#152238] flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#23395d]" />
            <span>Soạn Giáo Án Mầm Non Thông Minh</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tự động tối ưu hóa mục tiêu 3 phần, bảng 2 cột Cô - Trẻ, chuẩn 5 lĩnh vực và thời lượng theo đúng độ tuổi.
          </p>
        </div>

        {/* Curriculum Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setCurriculumType('current')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              curriculumType === 'current'
                ? 'bg-[#23395d] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chương trình Hiện hành
          </button>
          <button
            type="button"
            onClick={() => setCurriculumType('pilot')}
            className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
              curriculumType === 'pilot'
                ? 'bg-amber-100 text-amber-900 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chương trình Thí điểm
          </button>
        </div>
      </div>

      {/* Pilot Warning Notice */}
      {curriculumType === 'pilot' && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-2xl text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Lưu ý chuyên môn quan trọng:</p>
            <p>
              Chương trình này chỉ áp dụng cho các cơ sở giáo dục mầm non thuộc diện thí điểm hoặc theo văn bản hướng dẫn cụ thể của cơ quan quản lý giáo dục địa phương năm học 2026–2027.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Configuration */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-[#152238] text-xs uppercase tracking-wide">
              1. THÔNG TIN HOẠT ĐỘNG
            </h3>
            <span className="text-[10px] text-[#23395d] bg-[#e3ebf4] px-2 py-0.5 rounded-full font-bold">
              Bắt buộc
            </span>
          </div>

          <div className="space-y-3.5 text-xs font-semibold text-slate-700">
            {/* School & Class */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-1 text-slate-600">Trường Mầm Non</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-600">Lớp học</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Age Group */}
            <div>
              <label className="block mb-1 text-slate-600">
                Độ tuổi của trẻ <span className="text-rose-500">*</span>
              </label>
              <select
                value={ageGroup}
                onChange={(e) => handleAgeChange(e.target.value as AgeGroupId)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs font-bold text-slate-800"
              >
                <optgroup label="NHÀ TRẺ (Dưới 3 tuổi)">
                  <option value="3-12m">3 đến 12 tháng tuổi</option>
                  <option value="12-18m">12 đến 18 tháng tuổi</option>
                  <option value="18-24m">18 đến 24 tháng tuổi</option>
                  <option value="24-36m">24 đến 36 tháng tuổi</option>
                </optgroup>
                <optgroup label="MẪU GIÁO (3 - 6 tuổi)">
                  <option value="3-4t">Mẫu giáo bé (3 đến 4 tuổi)</option>
                  <option value="4-5t">Mẫu giáo nhỡ (4 đến 5 tuổi)</option>
                  <option value="5-6t">Mẫu giáo lớn (5 đến 6 tuổi)</option>
                </optgroup>
              </select>
            </div>

            {/* Domain */}
            <div>
              <label className="block mb-1 text-slate-600">
                Lĩnh vực phát triển <span className="text-rose-500">*</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as DomainId)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs bg-white font-medium"
              >
                <option value="nhan_thuc">Phát triển nhận thức (Toán, Khám phá, STEAM)</option>
                <option value="ngon_ngu">Phát triển ngôn ngữ (Thơ, Truyện, Chữ cái, Đàm thoại)</option>
                <option value="the_chat">Phát triển thể chất (Vận động cơ bản, TCVĐ, Vệ sinh)</option>
                <option value="tham_my">Phát triển thẩm mỹ (Âm nhạc, Tạo hình, Vẽ, Nặn, Xé dán)</option>
                <option value="tinh_cam">Phát triển tình cảm &amp; Kỹ năng xã hội (Kỹ năng sống, SEL)</option>
              </select>
            </div>

            {/* Specific Activity Type */}
            <div>
              <label className="block mb-1 text-slate-600">Loại hoạt động cụ thể</label>
              <select
                value={actType}
                onChange={(e) => setActType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs bg-white"
              >
                {(DOMAIN_ACTIVITIES[domain] || []).map((act) => (
                  <option key={act} value={act}>
                    {act}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme & Sub-theme */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-1 text-slate-600">Chủ đề chính</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-600">Chủ đề nhánh</label>
                <input
                  type="text"
                  value={subTheme}
                  onChange={(e) => setSubTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Topic with AI Suggestion */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-600">
                  Tên đề tài bài dạy <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleSuggestTopic}
                  disabled={isSuggestingTopic}
                  className="text-[10px] text-[#23395d] hover:text-[#152238] flex items-center gap-1 font-bold cursor-pointer disabled:opacity-50"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isSuggestingTopic ? 'Đang gợi ý...' : 'Gợi ý đề tài'}</span>
                </button>
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs font-bold text-slate-800"
              />
            </div>

            {/* Duration and Style */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-1 text-slate-600">Thời lượng (phút)</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-slate-600">Phong cách soạn</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none text-xs bg-white"
                >
                  <option value="chi_tiet">Chi tiết (Có lời thoại Cô - Trẻ)</option>
                  <option value="co_ban">Cơ bản (Ngắn gọn, súc tích)</option>
                  <option value="sang_tao">Sáng tạo (Tăng trò chơi, tình huống)</option>
                  <option value="steam">Mô hình STEAM (5E / EDP)</option>
                  <option value="du_gio">Giáo án Dự giờ (Khoa học, chỉn chu)</option>
                  <option value="thi_gv_gioi">Thi Giáo Viên Dạy Giỏi</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block mb-1 text-slate-600">Ý tưởng đặc biệt / Học liệu lớp (Tùy chọn)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: Tận dụng nắp chai nhựa, có tích hợp video hoạt hình quả táo..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#23395d] focus:outline-none text-xs resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3 bg-[#23395d] hover:bg-[#203354] text-white font-extrabold text-xs md:text-sm rounded-xl shadow-md shadow-[#152238]/30 border border-sky-400/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI ĐANG TẠO GIÁO ÁN...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-sky-300" />
                    <span>TẠO GIÁO ÁN BẰNG AI</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleLoadSample}
                className="w-full py-2 bg-[#e3ebf4] hover:bg-[#d0deee] text-[#152238] font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#23395d]" />
                <span>Nạp giáo án mẫu chuẩn để sửa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview / Editor */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col overflow-hidden min-h-[550px]">
          {/* Toolbar */}
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#152238] uppercase tracking-wide">
                Văn bản giáo án chuẩn
              </span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {statusTag}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-[#23395d] hover:bg-[#203354] text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                title="Lưu vào kho giáo án"
              >
                <Save className="w-3.5 h-3.5 text-sky-300" />
                <span>Lưu giáo án</span>
              </button>

              <button
                onClick={handleExportWord}
                className="px-3 py-1.5 bg-[#e3ebf4] hover:bg-[#d0deee] text-[#152238] text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                title="Xuất file Word (.doc)"
              >
                <FileDown className="w-3.5 h-3.5 text-[#23395d]" />
                <span className="hidden sm:inline">Xuất Word</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-[#e3ebf4] hover:bg-[#d0deee] text-[#152238] text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                title="In / Xuất PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#23395d]" />
                <span className="hidden sm:inline">In / PDF</span>
              </button>

              <button
                onClick={handleCopyText}
                className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
                title="Sao chép toàn bộ văn bản"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleSendToAudit}
                className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold rounded-lg transition cursor-pointer"
                title="Kiểm tra giáo án này"
              >
                <Stethoscope className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Loading View */}
          {isLoading && (
            <div className="p-12 flex flex-col items-center justify-center space-y-4 text-center my-auto">
              <div className="w-14 h-14 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 text-sm md:text-base">
                  AI đang phân tích chương trình GDMN 2026-2027...
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Thiết kế bảng 2 cột hoạt động, lồng ghép trò chơi cá nhân &amp; tập thể, chuẩn hóa mục tiêu phát triển.
                </p>
              </div>
            </div>
          )}

          {/* Printable & Editable Container */}
          <div
            className={`flex-1 p-6 md:p-8 overflow-y-auto bg-amber-50/20 text-slate-900 ${
              isLoading ? 'hidden' : 'block'
            }`}
          >
            <div
              id="printableLessonArea"
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="max-w-3xl mx-auto bg-white p-6 md:p-10 shadow-xs rounded-2xl border border-amber-100/70 outline-none leading-relaxed min-h-[400px]"
            >
              <div className="text-center py-16 text-slate-400 space-y-3">
                <Wand2 className="w-10 h-10 text-sky-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-600">
                  Chưa có nội dung giáo án hiển thị.
                </p>
                <p className="text-xs max-w-md mx-auto">
                  Hãy điền thông tin bên trái và nhấn nút{' '}
                  <span className="font-bold text-sky-600">"TẠO GIÁO ÁN BẰNG AI"</span> hoặc chọn nạp giáo án mẫu có sẵn để bắt đầu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
