
"use client";

import React from 'react';
import Link from 'next/link';
import { RegulationItem } from '@cbp/core';
import { FileText, Download, ChevronRight, Calendar, Bookmark, ShieldCheck } from 'lucide-react';
import { Badge } from '@cbp/ui';

interface RegulationCardProps {
  item: RegulationItem;
}

export const RegulationCard: React.FC<RegulationCardProps> = ({ item }) => {
  const getStatusColor = (s: string) => {
    if (s === 'Berlaku') return 'success';
    if (s === 'Dicabut') return 'danger';
    return 'warning';
  };

  return (
    <Link href={`/library/${item.id}`} className="block group">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0 hover:shadow-xl hover:border-cbp-gold/50 dark:hover:border-cbp-gold/50 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Accent Strip */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 group-hover:bg-cbp-gold transition-colors z-10"></div>

        {/* Icon & Meta Column */}
        <div className="p-6 md:w-24 flex flex-row md:flex-col items-center justify-center md:justify-start gap-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
           <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-cbp-navy dark:text-cbp-gold shadow-sm border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
           </div>
           <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tahun</div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">{item.year}</div>
           </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-center">
           <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-1 bg-cbp-navy/5 dark:bg-white/10 text-cbp-navy dark:text-white text-xs font-bold rounded-md border border-cbp-navy/10 dark:border-white/10">
                 {item.type} No. {item.number}
              </span>
              <Badge variant={getStatusColor(item.status)} className="text-[10px] py-0.5 px-2">
                {item.status}
              </Badge>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                 <Bookmark className="h-3 w-3" /> {item.category}
              </span>
           </div>
           
           <h3 className="text-lg md:text-xl font-serif font-bold text-cbp-navy dark:text-white mb-3 group-hover:text-cbp-gold transition-colors leading-snug">
             {item.title}
           </h3>
           
           <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
             {item.summary}
           </p>

           <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium">
                 <ShieldCheck className="h-3.5 w-3.5" /> Terverifikasi
              </div>
              <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors">
                 Lihat Detail <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
           </div>
        </div>

        {/* Downloads (Hidden on small mobile) */}
        <div className="hidden sm:flex flex-col items-center justify-center p-6 border-l border-slate-100 dark:border-slate-800 min-w-[100px] bg-slate-50/30 dark:bg-slate-800/10">
           <div className="text-center group-hover:translate-y-[-2px] transition-transform">
              <Download className="h-5 w-5 text-slate-300 group-hover:text-cbp-gold mx-auto mb-1 transition-colors" />
              <div className="text-sm font-bold text-slate-600 dark:text-slate-300 font-mono">{item.downloadCount}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Unduhan</div>
           </div>
        </div>

      </div>
    </Link>
  );
};
