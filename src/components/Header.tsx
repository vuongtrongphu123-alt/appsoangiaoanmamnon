import React from 'react';
import { Menu, CalendarCheck, Sparkles, Plus } from 'lucide-react';
import { TabId } from '../types';

interface HeaderProps {
  currentTab: TabId;
  academicYear: string;
  onToggleSidebar: () => void;
  onNewPlan: () => void;
}

const TAB_TITLES: Record<TabId, { title: string; breadcrumb: string }> = {
  dashboard: { title: 'Trang chủ Giáo Viên', breadcrumb: 'Tổng quan' },
  create: { title: 'Soạn Giáo Án Mới AI', breadcrumb: 'Soạn bài' },
  check: { title: 'Kiểm Tra & Thẩm Định Giáo Án', breadcrumb: 'Thẩm định' },
  library: { title: 'Kho Giáo Án Của Tôi', breadcrumb: 'Kho bài giảng' },
  games: { title: 'Ngân Hàng Trò Chơi Mầm Non', breadcrumb: 'Trò chơi' },
  materials: { title: 'Gợi Ý Học Liệu Tự Làm', breadcrumb: 'Học liệu' },
  powerpoint: { title: 'Kịch Bản Slide Trình Chiếu', breadcrumb: 'PowerPoint' },
  assistant: { title: 'Trò Chuyện Cô Giáo Bích Ngọc', breadcrumb: 'Trợ lý AI' },
  documents: { title: 'Văn Bản & Hướng Dẫn Chuyên Môn', breadcrumb: 'Văn bản BGD' },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  academicYear,
  onToggleSidebar,
  onNewPlan,
}) => {
  const currentInfo = TAB_TITLES[currentTab] || {
    title: 'Giáo Án Mầm Non AI',
    breadcrumb: 'Hệ thống',
  };

  return (
    <header className="h-16 bg-[#192841] border-b border-[#152238] px-4 md:px-8 flex items-center justify-between shrink-0 z-20 text-white shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-[#203354] hover:text-white transition cursor-pointer"
          aria-label="Mở danh mục"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide hidden sm:inline">
            {currentInfo.breadcrumb}
          </span>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span>{currentInfo.title}</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Slogan Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#152238] border border-[#23395d] rounded-full text-sky-200 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>"SOẠN NHANH – ĐÚNG CHUYÊN MÔN – SÁNG TẠO MỖI NGÀY"</span>
        </div>

        {/* Academic Year Indicator */}
        <span className="px-2.5 py-1 bg-[#203354] text-sky-100 border border-[#23395d] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
          <CalendarCheck className="w-3.5 h-3.5 text-sky-300" />
          <span>{academicYear}</span>
        </span>

        {/* Quick Action: Soạn nhanh */}
        <button
          onClick={onNewPlan}
          className="bg-[#23395d] hover:bg-[#203354] text-white border border-sky-400/40 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold shadow-md shadow-[#152238]/50 transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span className="hidden sm:inline">Soạn bài mới</span>
        </button>
      </div>
    </header>
  );
};
