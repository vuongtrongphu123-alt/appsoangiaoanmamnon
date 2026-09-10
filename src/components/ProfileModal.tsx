import React, { useState } from 'react';
import { UserCog, X, School, User, BookOpen, Calendar } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(user.name);
  const [school, setSchool] = useState(user.school);
  const [className, setClassName] = useState(user.className);
  const [academicYear, setAcademicYear] = useState(user.academicYear);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      name: name.trim() || 'Cô Giáo',
      school: school.trim() || 'Trường Mầm Non',
      className: className.trim() || 'Lớp Mầm Non',
      academicYear: academicYear.trim() || '2026–2027',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <UserCog className="w-5 h-5 text-sky-600" />
            <span>Thông Tin Cô Giáo</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1 text-slate-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Họ và tên giáo viên</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-sky-600" />
              <span>Trường Mầm Non</span>
            </label>
            <input
              type="text"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Phụ trách lớp</span>
            </label>
            <input
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-600 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Năm học mặc định</span>
            </label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
