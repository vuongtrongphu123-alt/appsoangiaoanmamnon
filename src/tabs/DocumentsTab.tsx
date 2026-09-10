import React from 'react';
import { Scale, BookMarked, CheckCircle2, Star, FlaskConical, ExternalLink } from 'lucide-react';

export const DocumentsTab: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          <span>Văn Bản Quy Định &amp; Hướng Dẫn Năm Học 2026–2027</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Cập nhật đầy đủ các căn cứ pháp lý và định hướng chuyên môn của Vụ Giáo dục Mầm non - Bộ GD&amp;ĐT.
        </p>
      </div>

      <div className="space-y-4">
        {/* Special 2026-2027 Guidance Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 md:p-6 rounded-3xl border border-blue-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full">
              Trọng tâm Chuyên môn BGD
            </span>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>Định hướng năm học 2026–2027</span>
            </span>
          </div>

          <h4 className="font-extrabold text-slate-800 text-sm md:text-base">
            Hướng dẫn thực hiện nhiệm vụ &amp; Đổi mới phương pháp Giáo dục mầm non
          </h4>

          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Yêu cầu cốt lõi:</strong> Tuyệt đối không "tiểu học hóa" trẻ mầm non. Đẩy mạnh tổ chức các hoạt động giáo dục theo quan điểm "Lấy trẻ làm trung tâm", tăng cường học thông qua chơi và trải nghiệm thực tế. Tích hợp giáo dục kỹ năng sống, kỹ năng cảm xúc xã hội (SEL) và lồng ghép STEAM một cách tự nhiên. Không tạo áp lực học tập, mọi hoạt động đều phải được thiết kế nhằm kích thích óc tò mò, sáng tạo, phù hợp với tâm sinh lý từng độ tuổi.
          </p>
        </div>

        {/* Circular 51/2020 */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full">
              Thông tư số 51/2020/TT-BGDĐT
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đang áp dụng chính thức</span>
            </span>
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm">
            Sửa đổi, bổ sung một số nội dung của Chương trình Giáo dục mầm non
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quy định chi tiết mục tiêu, nội dung chăm sóc giáo dục cho nhóm trẻ từ 3 tháng đến mẫu giáo 6 tuổi; định hướng giáo dục hòa nhập và đổi mới phương pháp tổ chức hoạt động nhằm tạo cơ hội cho mọi trẻ đều được phát triển toàn diện.
          </p>
        </div>

        {/* National Child-centered school initiative */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full">
              Chuyên Đề Quốc Gia
            </span>
            <span className="text-xs text-slate-500 font-semibold">Giai đoạn mới</span>
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm">
            Xây dựng trường mầm non lấy trẻ làm trung tâm
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tạo môi trường an toàn, thân thiện; tổ chức hoạt động học thông qua trải nghiệm thực tế; tôn trọng tiếng nói và quyền chủ động của trẻ; không gò ép, không áp đặt thành tích giáo dục một chiều.
          </p>
        </div>

        {/* 2026-2027 Pilot Curriculum */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-0.5 rounded-full">
              Định Hướng 2026–2027
            </span>
            <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5 text-amber-500" />
              <span>Đang thí điểm một phần</span>
            </span>
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm">
            Thí điểm đổi mới Chương trình Giáo dục Mầm non mới
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tích hợp giáo dục cảm xúc xã hội (SEL), tiếp cận sớm kỹ năng số an toàn, giáo dục văn hóa bản địa và tăng cường các hoạt động khám phá khoa học gần gũi thiên nhiên và bảo vệ môi trường sinh thái.
          </p>
        </div>
      </div>
    </div>
  );
};
