import React, { useState } from 'react';
import { Dice5, Wand2, Loader2, Sparkles, User, Users } from 'lucide-react';
import { generateGamesAI } from '../services/geminiService';

interface GamesTabProps {
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

export const GamesTab: React.FC<GamesTabProps> = ({ onToast }) => {
  const [topic, setTopic] = useState('Đếm và nhận biết số lượng trong phạm vi 5');
  const [age, setAge] = useState('Mẫu giáo 4-5 tuổi');
  const [space, setSpace] = useState('Trong lớp học');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);

  const handleGenerateGames = async () => {
    if (!topic.trim()) {
      onToast('Vui lòng nhập tên đề tài hoạt động!', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      const html = await generateGamesAI(topic, age, space);
      setGeneratedHtml(html);
      onToast('Đã thiết kế các trò chơi mầm non thành công!', 'success');
    } catch {
      onToast('Không thể tạo trò chơi lúc này, vui lòng thử lại.', 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <Dice5 className="w-5 h-5 text-pink-500" />
          <span>Ngân Hàng Trò Chơi Mầm Non Tự Động</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tự động gợi ý trò chơi cá nhân, trò chơi tập thể có luật chơi, cách chơi phù hợp độ tuổi và không gian tổ chức của lớp học.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form controls */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b pb-2">
            Thiết lập hoạt động
          </h3>

          <div className="space-y-3.5 text-xs font-semibold">
            <div>
              <label className="block mb-1 text-slate-700">Tên hoạt động / Đề tài</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-700">Độ tuổi của trẻ</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white font-medium"
              >
                <option value="Mẫu giáo 4-5 tuổi">Mẫu giáo 4-5 tuổi (Nhỡ)</option>
                <option value="Mẫu giáo 3-4 tuổi">Mẫu giáo 3-4 tuổi (Bé)</option>
                <option value="Mẫu giáo 5-6 tuổi">Mẫu giáo 5-6 tuổi (Lớn)</option>
                <option value="Nhà trẻ 24-36 tháng">Nhà trẻ 24-36 tháng</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-slate-700">Không gian tổ chức</label>
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white font-medium"
              >
                <option value="Trong lớp học">Trong lớp học thông thường</option>
                <option value="Ngoài trời / Sân trường">Ngoài sân trường / Khu vận động</option>
                <option value="Góc học tập / Nhóm nhỏ">Theo góc hoạt động mở</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleGenerateGames}
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ĐANG THIẾT KẾ TRÒ CHƠI...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>GỢI Ý TRÒ CHƠI MỚI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading && (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-500" />
              <p className="text-xs font-semibold">
                AI đang thiết kế trò chơi cá nhân và trò chơi tập thể theo chuẩn lấy trẻ làm trung tâm...
              </p>
            </div>
          )}

          {!isLoading && generatedHtml && (
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: generatedHtml }}
            />
          )}

          {!isLoading && !generatedHtml && (
            <>
              {/* Default sample game 1 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Trò chơi 1 (Cá nhân)</span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Rèn luyện phản xạ</span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">Ai Tìm Nhanh Nhất</h4>
                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p>
                    <strong>Mục đích:</strong> Trẻ củng cố nhận biết các nhóm đồ dùng có số lượng 5 xung quanh lớp.
                  </p>
                  <p>
                    <strong>Chuẩn bị:</strong> Đồ chơi xếp sẵn ở các góc có gắn thẻ chấm tròn hoặc số từ 1-5.
                  </p>
                  <p>
                    <strong>Cách chơi:</strong> Cô rung xắc xô và yêu cầu trẻ tìm xung quanh lớp nhóm hoa quả/đồ dùng có số lượng đúng 5 và đứng cạnh.
                  </p>
                  <p>
                    <strong>Luật chơi:</strong> Khi tiếng xắc xô kết thúc, bạn nào chưa tìm được sẽ phải nhảy lò cò một vòng.
                  </p>
                </div>
              </div>

              {/* Default sample game 2 */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Trò chơi 2 (Tập thể / Hợp tác)</span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Vận động nhóm</span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-sm">Chuyến Xe Về Đúng Bến</h4>
                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <p>
                    <strong>Mục đích:</strong> Rèn kỹ năng đếm, phân biệt số lượng và tăng cường tương tác bạn bè.
                  </p>
                  <p>
                    <strong>Chuẩn bị:</strong> 3 bến đỗ có biển số 3, 4, 5. Mỗi trẻ cầm 1 thẻ hình có số chấm tròn tương ứng.
                  </p>
                  <p>
                    <strong>Cách chơi:</strong> Trẻ làm đoàn tàu hát bài "Đoàn tàu nhỏ xíu". Khi cô hô "Xe về bến số 5", trẻ có thẻ 5 chấm tròn nhanh chân chạy về bến số 5.
                  </p>
                  <p>
                    <strong>Luật chơi:</strong> Về nhầm bến phải giải thích lại số chấm trên thẻ của mình và đổi bạn hỗ trợ.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
