import React, { useState, useEffect } from 'react';
import {
  FolderOpen,
  Search,
  PenSquare,
  Trash2,
  FileDown,
  Clock,
  Calendar,
  Sparkles,
  BookOpen,
  Maximize2,
  Minimize2,
  X,
  Printer,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { LessonPlan } from '../types';

interface LibraryTabProps {
  plans: LessonPlan[];
  onOpenPlan: (plan: LessonPlan) => void;
  onDeletePlan: (id: string) => void;
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({
  plans,
  onOpenPlan,
  onDeletePlan,
  onToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [readingPlan, setReadingPlan] = useState<LessonPlan | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  const [paperTheme, setPaperTheme] = useState<'paper' | 'white' | 'sepia'>('paper');

  const filtered = plans.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domainName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAge =
      ageFilter === 'all' ||
      item.ageGroup.includes(ageFilter) ||
      item.ageName.toLowerCase().includes(ageFilter.toLowerCase());

    return matchesQuery && matchesAge;
  });

  // ESC key to close reading mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && readingPlan) {
        setReadingPlan(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingPlan]);

  const handleExportDoc = (item: LessonPlan) => {
    const fileName = (item.title || 'Giao_An_Mam_Non').replace(/\s+/g, '_');
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${item.title}</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.5; color: #000; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #000; padding: 6px 8px; font-size: 12pt; }
        h2 { font-size: 15pt; text-align: center; }
      </style>
      </head><body>
    `;
    const footerHtml = '</body></html>';
    const source = headerHtml + item.contentHtml + footerHtml;

    const blob = new Blob(['\ufeff' + source], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_2026_2027.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onToast(`Đã xuất file Word: ${item.title}`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  // Flip through plans in reading mode
  const currentReadingIndex = readingPlan
    ? filtered.findIndex((p) => p.id === readingPlan.id)
    : -1;

  const handlePrevPlan = () => {
    if (currentReadingIndex > 0) {
      setReadingPlan(filtered[currentReadingIndex - 1]);
    }
  };

  const handleNextPlan = () => {
    if (currentReadingIndex >= 0 && currentReadingIndex < filtered.length - 1) {
      setReadingPlan(filtered[currentReadingIndex + 1]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Full-screen Reading Mode Overlay */}
      {readingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col animate-in fade-in duration-200">
          {/* Top distraction-free Reading Bar */}
          <header className="px-4 md:px-8 py-3 bg-[#152238] border-b border-[#192841] text-white flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
            {/* Left: Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#23395d] text-sky-200 text-[11px] font-extrabold rounded-lg flex items-center gap-1.5 shadow-xs border border-sky-400/30">
                  <BookOpen className="w-3.5 h-3.5 text-sky-300" />
                  <span>CHẾ ĐỘ ĐỌC TẬP TRUNG</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] bg-[#192841] text-slate-300 px-2 py-0.5 rounded-md border border-[#203354]">
                  {readingPlan.ageName || readingPlan.ageGroup}
                </span>
              </div>
              <h1 className="text-xs md:text-sm font-bold text-slate-100 truncate max-w-xs md:max-w-md">
                {readingPlan.title}
              </h1>
            </div>

            {/* Middle: Controls (Font size, Theme, Plan Pager) */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Previous / Next Plan navigation */}
              {filtered.length > 1 && (
                <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
                  <button
                    onClick={handlePrevPlan}
                    disabled={currentReadingIndex <= 0}
                    className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-700 transition cursor-pointer"
                    title="Bài trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono px-2 text-slate-300">
                    {currentReadingIndex + 1}/{filtered.length}
                  </span>
                  <button
                    onClick={handleNextPlan}
                    disabled={currentReadingIndex >= filtered.length - 1}
                    className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-700 transition cursor-pointer"
                    title="Bài tiếp theo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Theme selector */}
              <div className="hidden sm:flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 gap-1 text-[11px] font-semibold">
                <button
                  onClick={() => setPaperTheme('paper')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    paperTheme === 'paper'
                      ? 'bg-amber-100 text-amber-950 shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Giấy mộc
                </button>
                <button
                  onClick={() => setPaperTheme('white')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    paperTheme === 'white'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Trắng
                </button>
                <button
                  onClick={() => setPaperTheme('sepia')}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                    paperTheme === 'sepia'
                      ? 'bg-stone-200 text-stone-900 shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Dịu mắt
                </button>
              </div>

              {/* Font Size Adjust */}
              <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
                <button
                  onClick={() => setFontSize((f) => Math.max(13, f - 1))}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 transition cursor-pointer"
                  title="Giảm cỡ chữ"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1.5 text-slate-300">{fontSize}px</span>
                <button
                  onClick={() => setFontSize((f) => Math.min(20, f + 1))}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 transition cursor-pointer"
                  title="Tăng cỡ chữ"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExportDoc(readingPlan)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Tải file Word"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Xuất Word</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="In hoặc lưu PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden md:inline">In / PDF</span>
              </button>

              <button
                onClick={() => setReadingPlan(null)}
                className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Thoát chế độ đọc (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Thoát (Esc)</span>
              </button>
            </div>
          </header>

          {/* Reading Canvas Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center">
            <div
              className={`w-full max-w-4xl p-8 md:p-14 rounded-3xl shadow-2xl transition-colors duration-200 border my-auto ${
                paperTheme === 'paper'
                  ? 'bg-amber-50/90 text-slate-900 border-amber-200/70 shadow-amber-900/10'
                  : paperTheme === 'white'
                  ? 'bg-white text-slate-900 border-slate-200 shadow-slate-900/10'
                  : 'bg-stone-100 text-stone-900 border-stone-300 shadow-stone-900/10'
              }`}
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
            >
              {/* Document Header Info Banner inside Paper */}
              <div className="border-b border-slate-200/80 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-full text-[11px]">
                    {readingPlan.domainName}
                  </span>
                  <span>•</span>
                  <span>{readingPlan.school || 'Trường Mầm Non'}</span>
                  <span>•</span>
                  <span>{readingPlan.className || 'Lớp Mẫu Giáo'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>{readingPlan.duration || '25 - 30 phút'}</span>
                  <span>•</span>
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Năm học: {readingPlan.year || '2026–2027'}</span>
                </div>
              </div>

              {/* Lesson Plan Content Body */}
              <div
                className="leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-slate-300 [&_th]:p-3 [&_td]:border [&_td]:border-slate-300 [&_td]:p-3"
                dangerouslySetInnerHTML={{ __html: readingPlan.contentHtml }}
              />

              {/* Bottom footer stamp */}
              <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
                — Hết giáo án • Định hướng chương trình GDMN 2026–2027 —
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-extrabold text-[#152238] flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#23395d]" />
            <span>Kho Giáo Án Của Tôi</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Lưu trữ trên thiết bị của cô, phân loại theo độ tuổi, năm học 2026–2027 và lĩnh vực giáo dục.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên bài dạy, chủ đề..."
              className="pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#23395d] focus:outline-none w-48 sm:w-60 bg-slate-50 font-medium"
            />
          </div>

          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white font-semibold text-slate-700 focus:ring-2 focus:ring-[#23395d] focus:outline-none"
          >
            <option value="all">Tất cả độ tuổi</option>
            <option value="3-4t">3 - 4 tuổi</option>
            <option value="4-5t">4 - 5 tuổi</option>
            <option value="5-6t">5 - 6 tuổi</option>
            <option value="nhà trẻ">Nhà trẻ</option>
          </select>
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center text-slate-400 space-y-2 border border-slate-200">
          <FolderOpen className="w-10 h-10 mx-auto text-slate-300" />
          <p className="text-sm font-semibold text-slate-600">
            Không tìm thấy giáo án nào phù hợp với bộ lọc.
          </p>
          <p className="text-xs text-slate-400">
            Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang tab "Soạn Giáo Án Mới" để tạo bài học.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#23395d]/40 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-[#e3ebf4] text-[#23395d] px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {item.domainName || 'Lĩnh vực'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.year || '2026–2027'}</span>
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#152238] line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs text-slate-500 space-y-1">
                  <p className="flex items-center gap-1 text-slate-600 font-medium">
                    <span>{item.ageName || item.ageGroup}</span>
                  </p>
                  <p className="flex items-center gap-1 text-[#23395d] font-semibold">
                    <Clock className="w-3 h-3 text-[#23395d]" />
                    <span>{item.duration || '25 - 30 phút'}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setReadingPlan(item);
                      onToast(`Đang xem ở Chế độ đọc: ${item.title}`, 'info');
                    }}
                    className="px-2.5 py-1.5 bg-[#e3ebf4] hover:bg-[#d0deee] text-[#152238] text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs border border-[#23395d]/20"
                    title="Xem toàn màn hình không có thanh điều hướng"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#23395d]" />
                    <span>Chế độ đọc</span>
                  </button>

                  <button
                    onClick={() => onOpenPlan(item)}
                    className="text-xs text-[#23395d] hover:text-[#152238] font-bold flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#f0f4f9] transition cursor-pointer"
                    title="Chỉnh sửa giáo án này"
                  >
                    <PenSquare className="w-3.5 h-3.5" />
                    <span>Sửa</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleExportDoc(item)}
                    className="text-slate-400 hover:text-[#23395d] p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                    title="Xuất file Word"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                    title="Xóa giáo án"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
