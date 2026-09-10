import React, { useState } from 'react';
import {
  Presentation,
  RefreshCw,
  Image,
  Sparkles,
  Quote,
  Clock,
  LayoutGrid,
  Table,
  Copy,
  Check,
  FileDown,
  ArrowRight,
  PlaySquare,
  Sparkle,
  Smile,
} from 'lucide-react';
import { PptSlide } from '../types';

interface PowerPointTabProps {
  currentTopic?: string;
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

// Pre-built scenarios for quick selection
const PRESET_TOPICS: Record<string, PptSlide[]> = {
  'Đếm đến 5 và nhận biết số 5': [
    {
      id: 'slide-1',
      stepName: 'Slide 1: Khởi động',
      timeEst: '2 - 3 phút',
      title: 'Chào Mừng Các Bé Đến Với Khu Vườn Toán Học Vui!',
      visualCue: 'Mô hình khu vườn mùa xuân ngập tràn ánh nắng, các chú chim non ca hát và giỏ quà bí mật rực rỡ.',
      animationCue: 'Hiệu ứng Fade In nhẹ nhàng kết hợp bài hát "Màu hoa" hoặc tiếng chim hót líu lo.',
      teacherNarration:
        '"Cô chào tất cả các con! Hôm nay một vị khách bí mật trong khu vườn cổ tích đã gửi tặng lớp mình một giỏ quà rất đặc biệt. Chúng mình cùng lắng nghe xem bên trong có điều bất ngờ gì nhé!"',
    },
    {
      id: 'slide-2',
      stepName: 'Slide 2: Khám phá',
      timeEst: '10 - 15 phút',
      title: 'Khám Phá Nhóm 5 Đối Tượng & Nhận Biết Chữ Số 5',
      visualCue: 'Hàng 5 bông hoa khoe sắc và 5 chú bướm xinh xuất hiện từ trái qua phải kèm thẻ số 5 to rõ nét.',
      animationCue: 'Từng bông hoa và chú bướm Fly In nhịp nhàng tương ứng 1-1 theo tiếng đếm của trẻ.',
      teacherNarration:
        '"Bây giờ các con hãy quan sát trên màn hình: Có bao nhiêu bông hoa đang nở nào? Chúng mình cùng chỉ tay đếm với cô: 1, 2, 3, 4, 5 bông hoa! Có mấy chú bướm bay đến? Hai nhóm này như thế nào với nhau?"',
    },
    {
      id: 'slide-3',
      stepName: 'Slide 3: Trò chơi',
      timeEst: '6 - 8 phút',
      title: 'Trò Chơi Tương Tác: "Về Đúng Ngôi Nhà Số 5"',
      visualCue: '3 ngôi nhà hoạt hình mang số 3, 4, 5 với các cửa sổ mở ra hình ảnh các bạn động vật đáng yêu.',
      animationCue: 'Hiệu ứng Pulse (nhấp nháy) và tiếng vỗ tay chúc mừng (Chime) khi trẻ chọn đúng ngôi nhà số 5.',
      teacherNarration:
        '"Các chú thỏ con hãy chú ý lắng nghe hiệu lệnh: Khi tiếng nhạc rộn rã cất lên, chúng mình cùng nhảy múa. Khi nhạc dừng, bạn nào cầm thẻ 5 chấm tròn hãy chạy thật nhanh về ngôi nhà số 5 nhé!"',
    },
    {
      id: 'slide-4',
      stepName: 'Slide 4: Củng cố',
      timeEst: '1 - 2 phút',
      title: 'Bé Giỏi Quá! Cùng Khen Ngợi & Tạm Biệt',
      visualCue: 'Cơn mưa pháo hoa ngôi sao vàng rực rỡ và sticker bé ngoan mỉm cười giơ ngón tay like.',
      animationCue: 'Hiệu ứng Zoom In ngôi sao khen ngợi bay vào trung tâm kèm âm thanh hoan hô sôi động.',
      teacherNarration:
        '"Hôm nay cô thấy tất cả các con đều học rất ngoan, đếm rất giỏi và tìm nhà cực kỳ chuẩn xác! Cô khen ngợi cả lớp một tràng pháo tay thật giòn giã nào! Tiết học của chúng mình đến đây là hết rồi!"',
    },
  ],
  'Nhận biết phân biệt hình tròn - hình vuông': [
    {
      id: 'slide-1',
      stepName: 'Slide 1: Khởi động',
      timeEst: '2 - 3 phút',
      title: 'Vương Quốc Hình Học Diệu Kỳ Đón Bé',
      visualCue: 'Hai nhân vật hoạt hình: Bạn Tròn Vui Vẻ lăn tròn và Bạn Vuông Ngay Ngắn đứng nghiêm chào bé.',
      animationCue: 'Hiệu ứng Bounce cho Bạn Tròn lăn vào và Spin nhẹ cho Bạn Vuông.',
      teacherNarration:
        '"Chào mừng các bạn nhỏ đến thăm Vương quốc Hình học! Hôm nay có hai người bạn đặc biệt muốn làm quen với lớp mình đấy. Đố các con biết bạn nào có thể lăn tròn bon bon?"',
    },
    {
      id: 'slide-2',
      stepName: 'Slide 2: Khám phá',
      timeEst: '10 - 15 phút',
      title: 'Đặc Điểm Bạn Hình Tròn & Bạn Hình Vuông',
      visualCue: 'Hình tròn viền đỏ nét cong khép kín có thể lăn; hình vuông viền xanh có 4 cạnh bằng nhau và 4 góc.',
      animationCue: 'Bút vẽ hoạt hình viền quanh đường cong hình tròn và đếm lần lượt 4 cạnh hình vuông.',
      teacherNarration:
        '"Các con nhìn xem: Hình tròn có đường bao cong tròn nên lăn được dễ dàng. Còn hình vuông có các cạnh thẳng và các góc nhọn nên không lăn được. Con hãy sờ đường bao hình xem có đúng không nào?"',
    },
    {
      id: 'slide-3',
      stepName: 'Slide 3: Trò chơi',
      timeEst: '6 - 8 phút',
      title: 'Trò Chơi: "Tinh Mắt Tìm Đúng Đồ Vật"',
      visualCue: 'Chiếc đồng hồ tròn, chiếc bánh chưng vuông, bánh xe ô tô, khung ảnh gia đình.',
      animationCue: 'Vòng sáng lấp lánh (Highlight) khoanh tròn đồ vật đúng khi trẻ giơ tay phát biểu.',
      teacherNarration:
        '"Bây giờ chúng mình cùng thi tài: Bé nào phát hiện trong lớp có đồ dùng nào có dạng hình tròn giống Bạn Tròn? Đồ dùng nào có dạng hình vuông giống Bạn Vuông nào?"',
    },
    {
      id: 'slide-4',
      stepName: 'Slide 4: Củng cố',
      timeEst: '1 - 2 phút',
      title: 'Tổng Kết & Tuyên Dương Bé Thông Minh',
      visualCue: 'Hai bạn Tròn và Vuông cùng bắt tay nhau trao tặng huy hiệu Thám Tử Hình Học cho các bé.',
      animationCue: 'Zoom Out toàn cảnh lớp học ngập tràn nụ cười và âm thanh chúc mừng.',
      teacherNarration:
        '"Hôm nay các con đã trở thành những thám tử hình học xuất sắc! Về nhà con hãy quan sát xem trong gia đình mình có những đồ vật hình tròn và hình vuông nào để kể cho cô và các bạn nghe nhé!"',
    },
  ],
};

export const PowerPointTab: React.FC<PowerPointTabProps> = ({
  currentTopic = 'Đếm đến 5 và nhận biết số 5',
  onToast,
}) => {
  const [topic, setTopic] = useState(currentTopic);
  const [layoutMode, setLayoutMode] = useState<'cards' | 'table'>('cards');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialSlides =
    PRESET_TOPICS[currentTopic] || PRESET_TOPICS['Đếm đến 5 và nhận biết số 5'];
  const [slides, setSlides] = useState<PptSlide[]>(initialSlides);

  const handleRegenerate = () => {
    // Generate tailored 4 horizontal slides for the requested topic
    const newSlides: PptSlide[] = [
      {
        id: 'slide-1',
        stepName: 'Slide 1: Khởi động',
        timeEst: '2 - 3 phút',
        title: `Khởi Động Hào Hứng: ${topic}`,
        visualCue: `Hình ảnh động rực rỡ, nhân vật hoạt hình dẫn dắt câu chuyện về chủ đề "${topic}".`,
        animationCue: 'Hiệu ứng Fade In và nhạc nền vui tươi gây sự tò mò và hứng khởi.',
        teacherNarration: `'"Cô chào tất cả các con! Hôm nay cô mang đến cho lớp mình một điều kỳ diệu về chủ đề ${topic}. Các con có hào hứng muốn cùng cô khám phá không nào?"'`,
      },
      {
        id: 'slide-2',
        stepName: 'Slide 2: Khám phá',
        timeEst: '10 - 15 phút',
        title: `Khám Phá & Trải Nghiệm Trọng Tâm: ${topic}`,
        visualCue: `Các hình ảnh trực quan chi tiết, phóng to các đối tượng chính để trẻ quan sát, so sánh và nhận xét.`,
        animationCue: 'Từng chi tiết Fly In / Wipe theo nhịp điệu đặt câu hỏi gợi mở của cô giáo.',
        teacherNarration: `'"Các con hãy quan sát thật kỹ lên màn hình: Con nhìn thấy điều gì đặc biệt? Hãy chỉ cho cô và các bạn xem nào! Vì sao con lại nghĩ như vậy?"'`,
      },
      {
        id: 'slide-3',
        stepName: 'Slide 3: Trò chơi',
        timeEst: '6 - 8 phút',
        title: `Trò Chơi Ôn Luyện Tương Tác: Thử Tài Bé Ngoan`,
        visualCue: `Giao diện trò chơi sinh động, các ô số/hình ảnh lựa chọn phát sáng khi trẻ chạm hoặc trả lời đúng.`,
        animationCue: 'Hiệu ứng Pulse, tiếng chuông leng keng và tràng pháo tay khi chọn đáp án đúng.',
        teacherNarration: `'"Bây giờ chúng mình cùng bước vào phần chơi vô cùng hấp dẫn! Cô sẽ chia lớp thành các đội, bạn nào giơ tay nhanh nhất và trả lời đúng sẽ mang về cho đội mình một ngôi sao nhé!"'`,
      },
      {
        id: 'slide-4',
        stepName: 'Slide 4: Củng cố',
        timeEst: '1 - 2 phút',
        title: `Củng Cố, Khen Ngợi & Chuyển Hoạt Động`,
        visualCue: `Màn hình chúc mừng với sticker cúp chiến thắng và cơn mưa sao lấp lánh dành cho tất cả trẻ.`,
        animationCue: 'Zoom In ngôi sao khen ngợi bay vào màn hình, chuyển cảnh nhẹ nhàng sang giờ chơi.',
        teacherNarration: `'"Hôm nay bạn nào cũng rất giỏi và tích cực tham gia bài học ${topic}. Cô thưởng cho cả lớp một tràng pháo tay thật lớn! Bây giờ chúng mình cùng nhẹ nhàng đứng dậy hát bài hát nào!"'`,
      },
    ];

    setSlides(newSlides);
    onToast(`Đã tạo kịch bản 4 slide hàng ngang cho bài: ${topic}`, 'success');
  };

  const handleCopySlideNarration = (slide: PptSlide) => {
    navigator.clipboard.writeText(
      `[${slide.stepName}] - Tiêu đề: ${slide.title}\nLời dẫn của cô giáo:\n${slide.teacherNarration}`
    );
    setCopiedId(slide.id);
    setTimeout(() => setCopiedId(null), 2000);
    onToast(`Đã sao chép lời dẫn: ${slide.stepName}`, 'info');
  };

  const handleCopyAll = () => {
    const fullText = slides
      .map(
        (s) =>
          `=== ${s.stepName.toUpperCase()} (${s.timeEst}) ===\n` +
          `Tiêu đề: ${s.title}\n` +
          `Gợi ý hình ảnh: ${s.visualCue}\n` +
          `Hiệu ứng: ${s.animationCue}\n` +
          `Lời dẫn của cô giáo:\n${s.teacherNarration}\n`
      )
      .join('\n');

    navigator.clipboard.writeText(`KỊCH BẢN SLIDE POWERPOINT: ${topic}\n\n` + fullText);
    onToast('Đã sao chép toàn bộ kịch bản 4 slide theo hàng ngang!', 'success');
  };

  const handleExportDoc = () => {
    const rowsHtml = slides
      .map(
        (s) => `
        <td style="border:1px solid #000; padding:10px; vertical-align:top; width:25%;">
          <p><strong>${s.stepName}</strong><br><em>Thời gian: ${s.timeEst}</em></p>
          <hr/>
          <p><strong>Tiêu đề:</strong> ${s.title}</p>
          <p><strong>Hình ảnh:</strong> ${s.visualCue}</p>
          <p><strong>Hiệu ứng:</strong> ${s.animationCue}</p>
          <hr/>
          <p><strong>Lời dẫn của cô:</strong><br>${s.teacherNarration}</p>
        </td>
      `
      )
      .join('');

    const source = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Kich_Ban_Slide_${topic}</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.4; color: #000; }
        table { border-collapse: collapse; width: 100%; }
        h2 { font-size: 14pt; text-align: center; }
      </style>
      </head><body>
        <h2>KỊCH BẢN TRÌNH CHIẾU SLIDE GIẢNG DẠY MẦM NON (BẢNG HÀNG NGANG)</h2>
        <p style="text-align:center;"><strong>Bài dạy: ${topic}</strong> (Năm học 2026–2027)</p>
        <table border="1">
          <tr style="background:#f0f7ff;">
            <th style="padding:8px; border:1px solid #000;">1. Khởi động</th>
            <th style="padding:8px; border:1px solid #000;">2. Khám phá</th>
            <th style="padding:8px; border:1px solid #000;">3. Trò chơi</th>
            <th style="padding:8px; border:1px solid #000;">4. Củng cố</th>
          </tr>
          <tr>
            ${rowsHtml}
          </tr>
        </table>
      </body></html>
    `;

    const blob = new Blob(['\ufeff' + source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kich_Ban_Slide_${topic.replace(/\s+/g, '_')}_Hang_Ngang.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast('Đã xuất file Word dạng bảng hàng ngang', 'success');
  };

  // Color config for each of the 4 horizontal steps
  const stepStyles = [
    {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      tagText: 'Khởi động & Hứng thú',
      headerGrad: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-50 text-amber-600',
      cardBorder: 'border-amber-200 hover:border-amber-400',
      quoteBg: 'bg-amber-50/90 border-amber-200 text-amber-950',
    },
    {
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
      tagText: 'Khám phá & Trọng tâm',
      headerGrad: 'from-sky-500 to-blue-600',
      iconBg: 'bg-sky-50 text-sky-600',
      cardBorder: 'border-sky-200 hover:border-sky-400',
      quoteBg: 'bg-sky-50/90 border-sky-200 text-sky-950',
    },
    {
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
      tagText: 'Trò chơi & Ôn luyện',
      headerGrad: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-50 text-purple-600',
      cardBorder: 'border-purple-200 hover:border-purple-400',
      quoteBg: 'bg-purple-50/90 border-purple-200 text-purple-950',
    },
    {
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      tagText: 'Củng cố & Động viên',
      headerGrad: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-600',
      cardBorder: 'border-emerald-200 hover:border-emerald-400',
      quoteBg: 'bg-emerald-50/90 border-emerald-200 text-emerald-950',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-[#152238] flex items-center gap-2">
            <Presentation className="w-5 h-5 text-[#23395d]" />
            <span>Tạo Kịch Bản Slide Trình Chiếu Giảng Dạy</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Chuyển đổi giáo án thành 4 slide súc tích theo <strong>hàng ngang</strong>: Khởi động, Khám phá, Trò chơi và Củng cố kèm lời dẫn đàm thoại ấm áp của cô giáo.
          </p>
        </div>

        {/* Input & Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-xs px-3.5 py-2 border border-slate-200 rounded-xl w-56 sm:w-72 bg-slate-50 font-semibold focus:ring-2 focus:ring-[#23395d] focus:outline-none"
            placeholder="Nhập tên bài dạy..."
          />
          <button
            type="button"
            onClick={handleRegenerate}
            className="px-3.5 py-2 bg-[#23395d] hover:bg-[#203354] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
            title="Tạo mới kịch bản cho bài học này"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-300" />
            <span>Tạo Kịch Bản</span>
          </button>
        </div>
      </div>

      {/* Horizontal Flow Progression Bar (Breadcrumb) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-[#152238] uppercase tracking-wide flex items-center gap-1.5">
              <PlaySquare className="w-4 h-4 text-[#23395d]" />
              <span>Tiến trình 4 bước theo hàng ngang</span>
            </span>
            <span className="text-[11px] bg-[#e3ebf4] text-[#23395d] px-2.5 py-0.5 rounded-full font-bold">
              Bài: {topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View layout mode toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLayoutMode('cards')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                  layoutMode === 'cards'
                    ? 'bg-white text-[#152238] shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Thẻ hàng ngang</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('table')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                  layoutMode === 'table'
                    ? 'bg-white text-[#152238] shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Bảng ma trận ngang</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer border border-slate-200"
              title="Sao chép toàn bộ kịch bản 4 slide"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sao chép</span>
            </button>

            <button
              type="button"
              onClick={handleExportDoc}
              className="px-3 py-1.5 bg-[#e3ebf4] hover:bg-[#d0deee] text-[#152238] text-xs font-bold rounded-xl transition flex items-center gap-1 cursor-pointer border border-[#23395d]/20"
              title="Xuất file Word bảng ngang"
            >
              <FileDown className="w-3.5 h-3.5 text-[#23395d]" />
              <span className="hidden sm:inline">Xuất Word</span>
            </button>
          </div>
        </div>

        {/* Step-by-step Horizontal Arrow Chain */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3">
          {slides.map((s, idx) => {
            const style = stepStyles[idx];
            return (
              <div
                key={s.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between ${style.badgeBg} transition`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-white/80 font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-extrabold truncate leading-tight">
                      {s.stepName.replace(/Slide \d+: /, '')}
                    </p>
                    <p className="text-[10px] opacity-80">{s.timeEst}</p>
                  </div>
                </div>
                {idx < slides.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden md:block shrink-0 ml-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: Horizontal Cards (4 Columns) */}
      {layoutMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4.5 items-stretch">
          {slides.map((slide, idx) => {
            const style = stepStyles[idx];
            return (
              <div
                key={slide.id}
                className={`bg-white rounded-3xl border ${style.cardBorder} shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md`}
              >
                {/* Top Slide Preview Header */}
                <div>
                  <div className={`p-4 bg-gradient-to-r ${style.headerGrad} text-white flex items-center justify-between shadow-2xs`}>
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-xs text-white font-extrabold text-xs flex items-center justify-center border border-white/30">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="font-extrabold text-xs tracking-wide uppercase">
                          {slide.stepName}
                        </h3>
                        <span className="text-[10px] text-white/90 font-medium">
                          {style.tagText}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-black/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{slide.timeEst}</span>
                    </span>
                  </div>

                  {/* Slide Visual Mockup Box */}
                  <div className="p-4 space-y-3.5">
                    {/* 16:9 Presentation Frame */}
                    <div className="bg-slate-900 rounded-2xl p-3.5 text-white border border-slate-800 shadow-inner flex flex-col justify-between min-h-[110px] relative overflow-hidden">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                          <span className="ml-1">Slide #{idx + 1}</span>
                        </span>
                        <span>16 : 9</span>
                      </div>
                      <p className="text-xs font-bold text-amber-200 line-clamp-2 my-1 leading-snug">
                        {slide.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[140px] text-slate-300">
                          {slide.stepName.replace(/Slide \d+: /, '')}
                        </span>
                        <Smile className="w-3 h-3 text-amber-300" />
                      </div>
                    </div>

                    {/* Image & Visual Cue */}
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                        <Image className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 text-[11px] block">Gợi ý hình ảnh:</strong>
                          <span className="text-slate-600 text-xs leading-relaxed">{slide.visualCue}</span>
                        </div>
                      </div>

                      {/* Animation Cue */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 text-[11px] block">Hiệu ứng đề xuất:</strong>
                          <span className="text-slate-600 text-xs leading-relaxed">{slide.animationCue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Warm Teacher Narration Speech Bubble */}
                    <div className={`p-3.5 rounded-2xl border ${style.quoteBg} leading-relaxed text-xs space-y-1.5 shadow-2xs`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[11px] flex items-center gap-1">
                          <Quote className="w-3.5 h-3.5" />
                          <span>Lời dẫn đàm thoại ấm áp của cô:</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopySlideNarration(slide)}
                          className="text-slate-500 hover:text-slate-800 p-1 rounded-md hover:bg-black/5 transition cursor-pointer"
                          title="Sao chép lời dẫn này"
                        >
                          {copiedId === slide.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <p className="italic text-xs font-medium">{slide.teacherNarration}</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Bước {idx + 1} / 4</span>
                  <button
                    type="button"
                    onClick={() => handleCopySlideNarration(slide)}
                    className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Sao chép lời dẫn</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: Horizontal Comparison Matrix Table */}
      {layoutMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[860px]">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                  <th className="p-3.5 border-r border-slate-800 w-36 font-extrabold text-slate-300">
                    Thành phần
                  </th>
                  {slides.map((s, idx) => {
                    const style = stepStyles[idx];
                    return (
                      <th key={s.id} className="p-3.5 border-r border-slate-800 last:border-r-0 w-1/4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-white/20 text-white font-extrabold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-extrabold">{s.stepName}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                {/* Row: Thời lượng */}
                <tr className="bg-slate-50/70 font-semibold">
                  <td className="p-3 border-r border-slate-200 font-bold text-slate-800">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>Thời lượng</span>
                    </div>
                  </td>
                  {slides.map((s) => (
                    <td key={s.id} className="p-3 border-r border-slate-200 last:border-r-0 text-sky-800 font-bold">
                      {s.timeEst}
                    </td>
                  ))}
                </tr>

                {/* Row: Tiêu đề slide */}
                <tr>
                  <td className="p-3 border-r border-slate-200 font-bold text-slate-800 bg-slate-50/40">
                    Tiêu đề hiển thị
                  </td>
                  {slides.map((s) => (
                    <td key={s.id} className="p-3 border-r border-slate-200 last:border-r-0 font-bold text-slate-900 leading-snug">
                      {s.title}
                    </td>
                  ))}
                </tr>

                {/* Row: Gợi ý hình ảnh */}
                <tr className="bg-slate-50/20">
                  <td className="p-3 border-r border-slate-200 font-bold text-slate-800 bg-slate-50/40">
                    <div className="flex items-center gap-1">
                      <Image className="w-3.5 h-3.5 text-sky-600" />
                      <span>Gợi ý hình ảnh</span>
                    </div>
                  </td>
                  {slides.map((s) => (
                    <td key={s.id} className="p-3 border-r border-slate-200 last:border-r-0 leading-relaxed text-slate-600">
                      {s.visualCue}
                    </td>
                  ))}
                </tr>

                {/* Row: Hiệu ứng đề xuất */}
                <tr>
                  <td className="p-3 border-r border-slate-200 font-bold text-slate-800 bg-slate-50/40">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Hiệu ứng slide</span>
                    </div>
                  </td>
                  {slides.map((s) => (
                    <td key={s.id} className="p-3 border-r border-slate-200 last:border-r-0 leading-relaxed text-slate-600">
                      {s.animationCue}
                    </td>
                  ))}
                </tr>

                {/* Row: Lời dẫn của cô giáo */}
                <tr className="bg-amber-50/40">
                  <td className="p-3 border-r border-slate-200 font-bold text-amber-950 bg-amber-100/50">
                    <div className="flex items-center gap-1">
                      <Quote className="w-3.5 h-3.5 text-amber-700" />
                      <span>Lời dẫn đàm thoại</span>
                    </div>
                  </td>
                  {slides.map((s) => (
                    <td key={s.id} className="p-3 border-r border-slate-200 last:border-r-0 leading-relaxed text-amber-950 font-medium italic">
                      {s.teacherNarration}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

