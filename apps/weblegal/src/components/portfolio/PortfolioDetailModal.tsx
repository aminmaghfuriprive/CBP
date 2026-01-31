
"use client";

import React from 'react';
import { PortfolioItem } from '@cbp/core';
import { X, CheckCircle2, Target, Trophy, Building2, Calendar } from 'lucide-react';
import { Badge } from '@cbp/ui';

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const PortfolioDetailModal: React.FC<PortfolioDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Hero Image Header */}
        <div className="relative h-64 w-full bg-slate-200">
           <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90"></div>
           
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-md">
             <X className="h-5 w-5" />
           </button>

           <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="flex items-center gap-2 mb-3">
                 <Badge variant="warning" className="shadow-lg border-none">{item.category}</Badge>
                 <span className="text-white/80 text-sm font-bold flex items-center gap-1">
                   <Calendar className="h-3 w-3" /> {item.year}
                 </span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                {item.title}
              </h2>
           </div>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
           <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Building2 className="h-4 w-4" /> Klien: <span className="font-bold text-cbp-navy dark:text-white">{item.clientIndustry}</span>
           </div>

           <div className="space-y-8">
              <div className="flex gap-4">
                 <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                       <Target className="h-5 w-5" />
                    </div>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2">Tantangan (The Challenge)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                      {item.challenge}
                    </p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                       <CheckCircle2 className="h-5 w-5" />
                    </div>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2">Solusi Hukum (Our Solution)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                      {item.solution}
                    </p>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                 <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                       <div className="w-10 h-10 rounded-full bg-cbp-gold text-cbp-navy flex items-center justify-center shadow-md">
                          <Trophy className="h-5 w-5" />
                       </div>
                    </div>
                    <div>
                       <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2">Hasil Akhir (The Result)</h3>
                       <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                         {item.result}
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
