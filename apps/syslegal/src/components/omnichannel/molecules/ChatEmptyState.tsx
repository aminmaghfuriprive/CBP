
import React from 'react';
import { MessageSquare } from 'lucide-react';

export const ChatEmptyState: React.FC = () => {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400">
      <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
         <MessageSquare className="h-10 w-10 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">Belum ada percakapan dipilih</h3>
      <p className="text-sm">Pilih kontak dari daftar sebelah kiri untuk memulai.</p>
    </div>
  );
};
