
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@cbp/core';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ArticleNavigationProps {
  prev: Article | null;
  next: Article | null;
}

export const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ prev, next }) => {
  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t-2 border-slate-100 dark:border-slate-800">
      {/* Previous Article */}
      {prev ? (
        <Link href={`/insights/${prev.id}`} className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
           <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <Image src={prev.imageUrl} alt={prev.title} fill className="object-cover group-hover:scale-110 transition-transform" />
           </div>
           <div className="flex flex-col justify-center">
              {/* Changed color: text-cbp-gold by default, text-slate-400 on hover */}
              <div className="text-xs text-cbp-gold group-hover:text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 transition-colors">
                 <ArrowLeft className="h-3 w-3" /> SEBELUMNYA
              </div>
              <h4 className="text-sm font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors line-clamp-2">
                {prev.title}
              </h4>
           </div>
        </Link>
      ) : <div className="hidden md:block"></div>}

      {/* Next Article */}
      {next ? (
        <Link href={`/insights/${next.id}`} className="group flex flex-row-reverse md:flex-row gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-right">
           <div className="flex flex-col justify-center flex-1">
              {/* Changed color: text-cbp-gold by default, text-slate-400 on hover */}
              <div className="text-xs text-cbp-gold group-hover:text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 justify-end transition-colors">
                 SELANJUTNYA <ArrowRight className="h-3 w-3" />
              </div>
              <h4 className="text-sm font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors line-clamp-2">
                {next.title}
              </h4>
           </div>
           <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <Image src={next.imageUrl} alt={next.title} fill className="object-cover group-hover:scale-110 transition-transform" />
           </div>
        </Link>
      ) : <div className="hidden md:block"></div>}
    </div>
  );
};
