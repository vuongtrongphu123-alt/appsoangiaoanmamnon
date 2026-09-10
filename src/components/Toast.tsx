import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 transition-all duration-300 transform translate-y-0 opacity-100 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold border border-slate-700">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
      <span className="leading-snug">{toast.message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
