import React from 'react';
import {
  Wand2,
  ClipboardCheck,
  Book,
  Atom,
  Gamepad2,
  Bot,
  PenTool,
  FolderOpen,
  Dice5,
  Recycle,
  FileSpreadsheet,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Info,
  Heart,
  Shapes,
} from 'lucide-react';
import { TabId, LessonPlan } from '../types';

interface DashboardTabProps {
  onSwitchTab: (tab: TabId) => void;
  savedPlans: LessonPlan[];
  onOpenPlanInEditor: (plan: LessonPlan) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onSwitchTab,
  savedPlans,
  onOpenPlanInEditor,
}) => {
  const samplePreviews = savedPlans.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#152238] via-[#192841] to-[#23395d] text-white p-6 md:p-8 shadow-xl border border-[#203354]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#23395d]/70 backdrop-blur-md rounded-full text-xs font-semibold text-sky-200 border border-sky-400/30">
            <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
            <span>Đồng hành cùng giáo viên mầm non Việt Nam</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-sans tracking-normal leading-tight text-white">
            Xin chào cô giáo! Hôm nay cô muốn làm gì?
          </h2>
          <p className="text-sky-100 text-xs md:text-sm leading-relaxed">
            Hệ thống sẵn sàng hỗ trợ soạn giáo án 5 lĩnh vực phát triển theo Thông tư Bộ GD&ĐT, chuẩn định hướng năm học 2026–2027, lấy trẻ làm trung tâm, học thông qua chơi và tăng cường trải nghiệm khám phá.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSwitchTab('create')}
              className="px-5 py-2.5 bg-white text-[#152238] hover:bg-sky-50 font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-[#23395d]" />
              <span>Soạn Giáo Án Bằng AI</span>
            </button>
            <button
              onClick={() => onSwitchTab('check')}
              className="px-5 py-2.5 bg-[#203354] hover:bg-[#23395d] text-white border border-[#23395d] font-bold text-xs md:text-sm rounded-xl backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-sky-300" />
              <span>Kiểm Tra Giáo Án Đã Có</span>
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 opacity-10 md:opacity-15 pointer-events-none translate-x-6 translate-y-6">
          <Shapes className="w-64 h-64 text-sky-200" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e3ebf4] text-[#23395d] flex items-center justify-center text-xl font-bold">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Giáo án trong kho</p>
            <h4 className="text-xl font-extrabold text-[#152238]">{savedPlans.length}</h4>
            <p className="text-[11px] text-[#23395d] font-semibold mt-0.5">Sẵn sàng xuất Word / PDF</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e3ebf4] text-[#203354] flex items-center justify-center text-xl font-bold">
            <Atom className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Giáo án STEAM</p>
            <h4 className="text-xl font-extrabold text-[#152238]">Quy trình 5E</h4>
            <p className="text-[11px] text-[#203354] font-semibold mt-0.5">Khoa học &amp; Trải nghiệm</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e3ebf4] text-[#1c2e4a] flex items-center justify-center text-xl font-bold">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Kho trò chơi mẫu</p>
            <h4 className="text-xl font-extrabold text-[#152238]">120+</h4>
            <p className="text-[11px] text-[#1c2e4a] font-semibold mt-0.5">Cá nhân &amp; Tập thể</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e3ebf4] text-[#152238] flex items-center justify-center text-xl font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Trợ lý Cô Giáo AI</p>
            <h4 className="text-base font-extrabold text-[#23395d]">Trực tuyến</h4>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Định hướng 2026-2027</p>
          </div>
        </div>
      </div>

      {/* 8 Feature shortcuts */}
      <div className="space-y-3">
        <h3 className="text-sm md:text-base font-extrabold text-[#152238] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#23395d]" />
          <span>Trung Tâm Tính Năng Nhanh</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onSwitchTab('create')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#23395d] group-hover:bg-[#23395d] group-hover:text-white transition flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                SOẠN GIÁO ÁN MỚI
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">5 lĩnh vực, chuẩn form MOET</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('check')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#203354] group-hover:bg-[#203354] group-hover:text-white transition flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                KIỂM TRA GIÁO ÁN
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Đánh giá 9 tiêu chí sư phạm</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('library')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#1c2e4a] group-hover:bg-[#1c2e4a] group-hover:text-white transition flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                KHO GIÁO ÁN CỦA TÔI
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Lưu trữ, lọc theo tuần, chủ đề</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('games')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#23395d] group-hover:bg-[#23395d] group-hover:text-white transition flex items-center justify-center">
              <Dice5 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                TẠO TRÒ CHƠI
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Trò chơi vận động &amp; Nhận thức</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('materials')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#203354] group-hover:bg-[#203354] group-hover:text-white transition flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                GỢI Ý HỌC LIỆU
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Vật liệu tái chế, tiết kiệm</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('powerpoint')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#1c2e4a] group-hover:bg-[#1c2e4a] group-hover:text-white transition flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                TẠO POWERPOINT
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Kịch bản slide, câu hỏi gợi mở</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('assistant')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#192841] group-hover:bg-[#192841] group-hover:text-white transition flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                TRỢ LÝ BÍCH NGỌC
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">Tư vấn tình huống lớp học</p>
            </div>
          </button>

          <button
            onClick={() => onSwitchTab('documents')}
            className="group p-5 bg-white hover:bg-[#f0f4f9] border border-slate-200/80 hover:border-[#23395d] rounded-2xl text-left shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e3ebf4] text-[#152238] group-hover:bg-[#152238] group-hover:text-white transition flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-[#152238] group-hover:text-[#23395d]">
                VĂN BẢN GIÁO DỤC
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">TT 51/2020, nhiệm vụ 2026-2027</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ready to use sample lessons */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#152238] text-sm md:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#23395d]" />
              <span>Giáo Án Mẫu Chuẩn Chuyên Môn (Sẵn Dùng)</span>
            </h3>
            <button
              onClick={() => onSwitchTab('library')}
              className="text-xs text-[#23395d] hover:text-[#192841] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả kho</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {samplePreviews.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#f0f4f9] hover:bg-[#e3ebf4] rounded-2xl border border-slate-200/80 transition flex items-center justify-between gap-3"
              >
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-[#152238] truncate">{item.title}</h4>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-medium text-slate-600">{item.ageName}</span>
                    <span>•</span>
                    <span className="text-[#23395d] font-semibold">{item.duration}</span>
                    <span>•</span>
                    <span className="text-slate-400">{item.domainName}</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenPlanInEditor(item)}
                  className="shrink-0 px-3 py-1.5 bg-white hover:bg-[#23395d] hover:text-white border border-[#23395d]/30 text-[#23395d] text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                >
                  Xem &amp; Sửa
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Principles 2026-2027 */}
        <div className="bg-gradient-to-br from-[#f0f4f9] to-[#e3ebf4] border border-[#23395d]/30 p-6 rounded-3xl shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#152238] font-extrabold text-sm">
            <CheckCircle2 className="w-5 h-5 text-[#23395d] shrink-0" />
            <span>NGUYÊN TẮC VÀNG 2026–2027</span>
          </div>

          <ul className="text-xs text-[#192841] space-y-2.5 leading-relaxed font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#23395d] shrink-0 mt-0.5" />
              <span>
                <strong>Lấy trẻ làm trung tâm:</strong> Cô gợi mở – trẻ tự tay khám phá, sờ nắn và chia sẻ cảm xúc.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#23395d] shrink-0 mt-0.5" />
              <span>
                <strong>Không tiểu học hóa:</strong> Tuyệt đối không giao bài tập nặng, không ép ngồi thụ động quá 15–20 phút.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#23395d] shrink-0 mt-0.5" />
              <span>
                <strong>Học thông qua chơi:</strong> Trò chơi là phương tiện chủ đạo kết nối các bài học.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#23395d] shrink-0 mt-0.5" />
              <span>
                <strong>STEAM thực chất:</strong> Tận dụng vật liệu địa phương, kích thích óc tò mò thay vì mô hình phức tạp.
              </span>
            </li>
          </ul>

          <div className="p-3 bg-white/80 rounded-xl border border-[#23395d]/20 text-[11px] text-[#152238] leading-snug">
            <Info className="w-4 h-4 text-[#23395d] inline mr-1 -mt-0.5" />
            <strong>Đã cập nhật chuẩn BGD:</strong> Định hướng ứng dụng công nghệ trực quan và giáo dục kỹ năng cảm xúc xã hội (SEL).
          </div>
        </div>
      </div>
    </div>
  );
};
