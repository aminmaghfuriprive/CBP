
import React from 'react';

interface FieldHeaderProps {
  userName: string;
  taskCount: number;
  completedCount: number;
}

export const FieldHeader: React.FC<FieldHeaderProps> = ({ userName, taskCount, completedCount }) => {
  return (
    <div className="bg-cbp-navy text-white p-6 -m-8 mb-6 rounded-b-3xl pb-12 dark:bg-slate-900 dark:border-b dark:border-slate-800 shadow-xl">
      <h1 className="text-xl font-bold">Halo, {userName}</h1>
      <p className="text-slate-300 text-sm">Siap bertugas hari ini?</p>
      <div className="mt-6 flex gap-4">
          <div className="bg-white/10 p-4 rounded-xl flex-1 text-center backdrop-blur-sm border border-white/10">
            <span className="block text-3xl font-bold text-cbp-gold">{taskCount}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Agenda</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl flex-1 text-center backdrop-blur-sm border border-white/10">
            <span className="block text-3xl font-bold text-green-400">{completedCount}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Selesai</span>
          </div>
      </div>
    </div>
  );
};
