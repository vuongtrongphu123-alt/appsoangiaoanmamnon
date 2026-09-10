import React, { useState } from 'react';
import {
  ClipboardCheck,
  Microscope,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { AuditResult } from '../types';
import { auditLessonPlanAI } from '../services/geminiService';

interface AuditTabProps {
  initialText?: string;
  initialAge?: string;
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

export const AuditTab: React.FC<AuditTabProps> = ({
  initialText = '',
  initialAge = 'Mẫu giáo 4-5 tuổi',
  onToast,
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleStartAudit = async () => {
    if (!inputText.trim()) {
      onToast('Vui lòng dán nội dung giáo án cần kiểm tra!', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const res = await auditLessonPlanAI(inputText, selectedAge);
      setResult(res);
      onToast('Đã hoàn thành thẩm định giáo án theo 9 tiêu chuẩn!', 'success');
    } catch {
      onToast('Có lỗi xảy ra trong quá trình kiểm tra, thử lại sau.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-[#152238] flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-[#23395d]" />
            <span>Thẩm Định &amp; Kiểm Tra Giáo Án Chuyên Môn</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống AI rà soát 9 tiêu chuẩn: Độ tuổi, Mục tiêu, Thời lượng, Phương pháp lấy trẻ làm trung tâm, Trải nghiệm của trẻ, Ngôn ngữ, Chính tả &amp; Tính logic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#152238] bg-[#e3ebf4] border border-[#23395d]/20 px-3 py-1 rounded-full">
            Chuẩn BGD 2026-2027
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#152238] uppercase tracking-wide">
              Dán nội dung giáo án cần kiểm tra:
            </label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-slate-50 font-semibold text-slate-700 focus:ring-2 focus:ring-[#23395d] focus:outline-none"
            >
              <option value="Mẫu giáo 4-5 tuổi">Mẫu giáo 4-5 tuổi</option>
              <option value="Mẫu giáo 3-4 tuổi">Mẫu giáo 3-4 tuổi</option>
              <option value="Mẫu giáo 5-6 tuổi">Mẫu giáo 5-6 tuổi</option>
              <option value="Nhà trẻ 24-36 tháng">Nhà trẻ 24-36 tháng</option>
              <option value="Nhà trẻ dưới 24 tháng">Nhà trẻ dưới 24 tháng</option>
            </select>
          </div>

          <textarea
            rows={16}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Dán toàn bộ hoặc các phần của giáo án (Mục tiêu, Chuẩn bị, Tiến hành hoạt động) vào đây để AI kiểm tra đối chiếu chuyên môn theo 9 tiêu chuẩn..."
            className="w-full p-4 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#23395d] focus:outline-none bg-slate-50 leading-relaxed resize-none font-mono"
          />

          <button
            type="button"
            onClick={handleStartAudit}
            disabled={isLoading}
            className="w-full py-3 bg-[#23395d] hover:bg-[#203354] text-white font-extrabold text-xs md:text-sm rounded-xl shadow-md shadow-[#152238]/30 border border-sky-400/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ĐANG RÀ SOÁT 9 TIÊU CHUẨN...</span>
              </>
            ) : (
              <>
                <ClipboardCheck className="w-4 h-4 text-sky-300" />
                <span>BẮT ĐẦU KIỂM TRA CHUYÊN MÔN</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              KẾT QUẢ THẨM ĐỊNH CHI TIẾT
            </h3>
            {result && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-0.5 rounded-full">
                Đạt: {result.score}/100 Điểm
              </span>
            )}
          </div>

          {!result && !isLoading && (
            <div className="text-center py-20 text-slate-400 space-y-3 my-auto">
              <Microscope className="w-10 h-10 text-amber-300 mx-auto" />
              <p className="text-xs">
                Kết quả thẩm định 9 tiêu chuẩn sư phạm và phương án cải tiến sẽ xuất hiện ở đây.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-20 space-y-3 my-auto text-slate-500">
              <div className="w-10 h-10 rounded-full border-3 border-amber-200 border-t-amber-500 animate-spin mx-auto" />
              <p className="text-xs font-semibold">
                Đang đối chiếu với Thông tư 51/2020/TT-BGDĐT và định hướng 2026-2027...
              </p>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-4 overflow-y-auto max-h-[550px] text-xs">
              {/* Strengths */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-800 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Điểm Mạnh Chuyên Môn</span>
                </h4>
                <ul className="text-emerald-950 space-y-1 list-disc pl-5">
                  {result.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-800 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Những Điểm Cần Điều Chỉnh Để Đạt Tiết Giỏi</span>
                </h4>
                <ul className="text-amber-950 space-y-1 list-disc pl-5">
                  {result.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Questions */}
              {result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2">
                  <h4 className="font-bold text-sky-800 flex items-center gap-1.5 text-xs">
                    <HelpCircle className="w-4 h-4 text-sky-600" />
                    <span>Gợi Ý Câu Hỏi Gợi Mở Thay Thế (Lấy Trẻ Làm Trung Tâm)</span>
                  </h4>
                  <ul className="text-sky-950 space-y-1 list-disc pl-5 italic">
                    {result.suggestedQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improved Snippet */}
              {result.improvedSnippet && (
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1.5">
                  <h4 className="font-bold text-indigo-800 flex items-center gap-1.5 text-xs">
                    <Lightbulb className="w-4 h-4 text-indigo-600" />
                    <span>Đoạn Hoạt Động Được Cải Tiến Mẫu</span>
                  </h4>
                  <p className="text-indigo-950 leading-relaxed bg-white/70 p-3 rounded-xl border border-indigo-100">
                    {result.improvedSnippet}
                  </p>
                </div>
              )}

              {/* Full Text Analysis if available */}
              {result.fullAnalysis && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed">
                  {result.fullAnalysis}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
