
"use client";

import React from 'react';
import Link from 'next/link';
import { RegulationItem } from '@cbp/core';
import { FileText, Download, ChevronRight } from 'lucide-react';
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-lg hover:border-cbp-gold dark:hover:border-cbp-gold transition-all duration-300 relative overflow-hidden">
        
        {/* Accent Bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 group-hover:bg-cbp-gold transition-colors"></div>

        <div className="flex flex-col md:flex-row md:items-start gap-4 pl-4">
           {/* Icon Box */}
           <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white group-hover:bg-cbp-gold/10 transition-colors">
                 <FileText className="h-6 w-6" />
              </div>
           </div>

           {/* Content */}
           <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {item.type}
                 </span>
                 <Badge variant={getStatusColor(item.status)} className="text-[10px] py-0.5">{item.status}</Badge>
                 <span className="text-xs text-slate-400">• {item.year}</span>
              </div>
              
              <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-2 group-hover:text-cbp-gold transition-colors leading-tight">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                {item.summary}
              </p>

              <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors">
                 Lihat Detail & Download <ChevronRight className="h-3 w-3 ml-1" />
              </div>
           </div>

           {/* Stats (Desktop) */}
           <div className="hidden md:flex flex-col items-end justify-center pl-4 border-l border-slate-100 dark:border-slate-800 min-w-[80px]">
              <Download className="h-4 w-4 text-slate-300 mb-1" />
              <span className="text-xs font-mono text-slate-400">{item.downloadCount}</span>
           </div>
        </div>
      </div>
    </Link>
  );
};
