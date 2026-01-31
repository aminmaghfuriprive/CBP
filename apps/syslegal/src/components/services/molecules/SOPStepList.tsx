
import React from 'react';
import { ServiceStep } from '@cbp/core';
import { Trash2, Sparkles } from 'lucide-react';

interface SOPStepListProps {
  steps: ServiceStep[];
  onDelete: (id: string) => void;
}

export const SOPStepList: React.FC<SOPStepListProps> = ({ steps, onDelete }) => {
  if (steps.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 flex flex-col items-center mb-8">
        <Sparkles className="h-8 w-8 mb-2 text-slate-300 dark:text-slate-600" />
        <p>Belum ada langkah SOP.</p>
        <p className="text-sm mt-1">Tambah manual atau gunakan <span className="font-bold text-cbp-navy dark:text-cbp-gold">Generate AI</span>.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 group animate-in fade-in slide-in-from-bottom-1 duration-300">
           <div className="h-8 w-8 rounded-full bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
             {index + 1}
           </div>
           <div className="flex-1">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{step.phase}</span>
             </div>
             <p className="font-bold text-slate-800 dark:text-white">{step.task}</p>
           </div>
           <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500 font-medium whitespace-nowrap">{step.estimatedDays} Hari</span>
             <button 
               onClick={() => onDelete(step.id)}
               className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
             >
               <Trash2 className="h-4 w-4" />
             </button>
           </div>
        </div>
      ))}
    </div>
  );
};
