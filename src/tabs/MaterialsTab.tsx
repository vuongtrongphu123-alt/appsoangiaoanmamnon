import React from 'react';
import { Boxes, Sparkles, ShieldCheck, Music, Video, Recycle } from 'lucide-react';
import { RECYCLED_MATERIALS } from '../data/constants';

export const MaterialsTab: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Boxes className="w-5 h-5 text-teal-600" />
          <span>Gợi Ý Học Liệu Tự Làm &amp; Nguyên Vật Liệu Tái Chế</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Đề xuất đồ dùng trực quan, học liệu an toàn, dễ kiếm, tiết kiệm và thân thiện môi trường cho trường mầm non theo định hướng giáo dục sinh thái 2026–2027.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECYCLED_MATERIALS.map((sec, idx) => {
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    idx === 0
                      ? 'bg-teal-100 text-teal-700'
                      : idx === 1
                      ? 'bg-sky-100 text-sky-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {idx === 0 && <Recycle className="w-5 h-5" />}
                  {idx === 1 && <Music className="w-5 h-5" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{sec.category}</h3>
              </div>

              <div className="space-y-3">
                {sec.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1"
                  >
                    <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
