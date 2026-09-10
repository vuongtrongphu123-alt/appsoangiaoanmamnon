import React from 'react';
import {
  GraduationCap,
  Home,
  Wand2,
  ClipboardCheck,
  FolderOpen,
  Shapes,
  Boxes,
  Presentation,
  MessagesSquare,
  BookMarked,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { TabId, UserProfile } from '../types';

interface SidebarProps {
  currentTab: TabId;
  onSelectTab: (tab: TabId) => void;
  libraryCount: number;
  user: UserProfile;
  onOpenProfile: () => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  libraryCount,
  user,
  onOpenProfile,
  onLogout,
  mobileOpen,
  onCloseMobile,
}) => {
  const handleNavClick = (tab: TabId) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const navItems = [
    {
      id: 'dashboard' as TabId,
      label: 'Trang chủ Tổng quan',
      icon: Home,
      iconColor: 'text-sky-600',
    },
    {
      id: 'create' as TabId,
      label: 'Soạn Giáo Án Mới (AI)',
      icon: Wand2,
      iconColor: 'text-emerald-600',
      badge: 'Hot',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'check' as TabId,
      label: 'Kiểm Tra & Thẩm Định',
      icon: ClipboardCheck,
      iconColor: 'text-amber-500',
    },
    {
      id: 'library' as TabId,
      label: 'Kho Giáo Án Của Tôi',
      icon: FolderOpen,
      iconColor: 'text-indigo-500',
      badge: libraryCount.toString(),
      badgeColor: 'bg-slate-200 text-slate-700',
    },
  ];

  const utilityItems = [
    {
      id: 'games' as TabId,
      label: 'Tạo Trò Chơi Tự Động',
      icon: Shapes,
      iconColor: 'text-pink-500',
    },
    {
      id: 'materials' as TabId,
      label: 'Gợi Ý Học Liệu Tái Chế',
      icon: Boxes,
      iconColor: 'text-teal-500',
    },
    {
      id: 'powerpoint' as TabId,
      label: 'Kịch Bản Slide Trình Chiếu',
      icon: Presentation,
      iconColor: 'text-orange-500',
    },
    {
      id: 'assistant' as TabId,
      label: 'Trò Chuyện Cô Bích Ngọc',
      icon: MessagesSquare,
      iconColor: 'text-sky-500',
    },
    {
      id: 'documents' as TabId,
      label: 'Văn Bản & Hướng Dẫn BGD',
      icon: BookMarked,
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-[#152238] border-r border-[#192841] flex flex-col shrink-0 transition-transform duration-300 z-50 md:z-30 text-white ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* App Brand Logo */}
        <div className="p-5 border-b border-[#192841] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#23395d] via-[#203354] to-[#1c2e4a] border border-[#23395d]/80 flex items-center justify-center text-white text-xl shadow-lg shadow-[#152238]/60">
              <GraduationCap className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold tracking-tight text-white leading-tight">
                  GIÁO ÁN MẦM NON
                </h1>
                <span className="text-[10px] bg-[#23395d] text-sky-200 font-bold px-1.5 py-0.5 rounded-full border border-sky-400/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-semibold text-sky-400">Năm học 2026–2027</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1c2e4a] md:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs md:text-sm font-semibold text-slate-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#23395d] text-white font-bold shadow-md shadow-[#152238]/50 border border-[#203354]'
                    : 'hover:bg-[#1c2e4a] text-slate-300 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#152238] text-sky-200' : 'bg-[#203354] text-sky-200 border border-[#23395d]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 pb-1 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Tiện ích Sư phạm
          </div>

          {utilityItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#23395d] text-white font-bold shadow-md shadow-[#152238]/50 border border-[#203354]'
                    : 'hover:bg-[#1c2e4a] text-slate-300 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-3.5 border border-[#203354] bg-[#192841] m-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#23395d] to-[#203354] border border-sky-400/30 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              CG
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate" title={user.name}>
                {user.name}
              </div>
              <div
                className="text-[11px] text-slate-400 truncate"
                title={`${user.school} • ${user.className}`}
              >
                {user.school} • {user.className}
              </div>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={onOpenProfile}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#23395d] transition cursor-pointer"
                title="Thiết lập thông tin cô giáo"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-[#23395d] transition cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
