import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, User, Mail, Lock, CheckCheck, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onLoginSuccess: (profile: UserProfile) => void;
  onToast: (message: string, type: 'success' | 'warning' | 'info') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLoginSuccess, onToast }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('Cô Giáo Nguyễn Mai Lan');
  const [email, setEmail] = useState('lan.nguyen@mamnon.edu.vn');
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('MN_USERS') || '{}');

    if (isLoginMode) {
      // Login check
      if (email === 'lan.nguyen@mamnon.edu.vn' || (storedUsers[email] && storedUsers[email].password === password)) {
        const teacherName = storedUsers[email]?.name || name || 'Cô Giáo Nguyễn Mai Lan';
        const userProf: UserProfile = {
          name: teacherName,
          email,
          school: localStorage.getItem('MN_TEACHER_SCHOOL') || 'Trường MN Sơn Đồng 3',
          className: localStorage.getItem('MN_TEACHER_CLASS') || 'Lớp Mẫu giáo 4-5 tuổi B5',
          academicYear: '2026–2027',
        };
        localStorage.setItem('MN_CURRENT_USER', email);
        localStorage.setItem('MN_TEACHER_NAME', teacherName);
        onToast('Đăng nhập thành công!', 'success');
        onLoginSuccess(userProf);
      } else {
        onToast('Tên đăng nhập hoặc mật khẩu không chính xác!', 'warning');
      }
    } else {
      // Registration
      if (password !== confirmPassword) {
        onToast('Mật khẩu xác nhận không khớp!', 'warning');
        return;
      }
      if (storedUsers[email]) {
        onToast('Tên đăng nhập / Email này đã tồn tại!', 'warning');
        return;
      }
      storedUsers[email] = { password, name: name.trim() || 'Cô Giáo' };
      localStorage.setItem('MN_USERS', JSON.stringify(storedUsers));
      onToast('Đăng ký tài khoản thành công! Hãy đăng nhập.', 'success');
      setIsLoginMode(true);
    }
  };

  const handleQuickDemoLogin = () => {
    const defaultUser: UserProfile = {
      name: 'Cô Giáo Nguyễn Mai Lan',
      email: 'lan.nguyen@mamnon.edu.vn',
      school: 'Trường MN Sơn Đồng 3',
      className: 'Lớp Mẫu giáo 4-5 tuổi B5',
      academicYear: '2026–2027',
    };
    localStorage.setItem('MN_CURRENT_USER', defaultUser.email);
    localStorage.setItem('MN_TEACHER_NAME', defaultUser.name);
    localStorage.setItem('MN_TEACHER_SCHOOL', defaultUser.school);
    localStorage.setItem('MN_TEACHER_CLASS', defaultUser.className);
    onToast('Đã đăng nhập tài khoản mẫu giáo viên!', 'success');
    onLoginSuccess(defaultUser);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100/90 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex max-w-4xl w-full border border-slate-200">
        {/* Left: Branding */}
        <div className="w-1/2 bg-gradient-to-br from-sky-600 to-teal-600 p-10 text-white flex flex-col justify-between hidden md:flex relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-lg border border-white/30">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold font-sans leading-tight">
              Giáo Án Mầm Non AI
            </h1>
            <p className="text-sky-100 text-sm leading-relaxed">
              Trợ lý thông minh hỗ trợ giáo viên mầm non soạn giáo án, kế hoạch giáo dục và tổ chức hoạt động giáo dục cho trẻ chuẩn BGD năm học 2026–2027.
            </p>
          </div>

          <div className="relative z-10 space-y-3 pt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-100 bg-black/15 px-3 py-2 rounded-xl inline-flex">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Bảo mật thông tin &amp; Lưu trữ dữ liệu cục bộ an toàn</span>
            </div>
            <div className="text-[11px] text-sky-200">
              Chương trình GDMN hiện hành &amp; Thí điểm 2026-2027
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-800">
              {isLoginMode ? 'Đăng nhập giáo viên' : 'Tạo tài khoản mới'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isLoginMode
                ? 'Chào mừng cô giáo quay trở lại với góc sư phạm mầm non!'
                : 'Đăng ký tài khoản để lưu trữ các giáo án và tài liệu của riêng cô.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block mb-1 text-xs font-bold text-slate-700">
                  Họ và tên Cô giáo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Cô Giáo Nguyễn Mai Lan"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1 text-xs font-bold text-slate-700">
                Tên đăng nhập / Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tên đăng nhập hoặc Email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-bold text-slate-700">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                />
              </div>
            </div>

            {!isLoginMode && (
              <div>
                <label className="block mb-1 text-xs font-bold text-slate-700">
                  Xác nhận mật khẩu <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <CheckCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-md transition mt-2 cursor-pointer uppercase tracking-wider"
            >
              {isLoginMode ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border border-sky-200"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Đăng nhập nhanh mẫu (Cô Mai Lan)</span>
            </button>

            <div className="text-slate-600">
              <span>{isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="font-bold text-sky-600 hover:text-sky-700 hover:underline ml-1 cursor-pointer"
              >
                {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
