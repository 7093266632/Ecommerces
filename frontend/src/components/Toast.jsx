import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-400/30 animate-bounce transition-all duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-100 flex-shrink-0" />
      <span className="text-sm font-medium tracking-wide">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
