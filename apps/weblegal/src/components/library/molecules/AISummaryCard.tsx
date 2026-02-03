
"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface AISummaryCardProps {
  summary: string;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="h-24 w-24 text-cbp-gold" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
           <div className="p-1.5 bg-cbp-gold text-cbp-navy rounded-lg">
             <Sparkles className="h-4 w-4" />
           </div>
           <h4 className="font-bold text-sm uppercase tracking-widest text-cbp-navy dark:text-white">AI Executive Summary</h4>
        </div>
        
        <p className="text-lg text-slate-700 dark:text-slate-200 font-serif italic leading-relaxed">
          "{summary}"
        </p>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
           <p className="text-[10px] text-slate-400">
             *Ringkasan ini dihasilkan secara otomatis oleh AI (Gemini) untuk membantu pemahaman cepat. Selalu rujuk dokumen asli untuk kepastian hukum.
           </p>
        </div>
      </div>
    </div>
  );
};
