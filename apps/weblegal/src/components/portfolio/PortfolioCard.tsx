
import React from 'react';
import { PortfolioItem } from '@cbp/core';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="h-56 relative overflow-hidden">
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors"></div>
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-cbp-navy dark:text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
             {item.category}
           </span>
        </div>
      </div>
      
      <div className="p-6 relative">
        {/* Accent Line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-slate-100 dark:bg-slate-800 group-hover:bg-cbp-gold transition-colors duration-500"></div>
        
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
          {item.clientIndustry} • {item.year}
        </p>
        <h3 className="text-xl font-serif font-bold text-cbp-navy dark:text-white mb-4 line-clamp-2 group-hover:text-cbp-gold transition-colors leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
          {item.challenge}
        </p>
        
        <div className="flex items-center text-sm font-bold text-cbp-navy dark:text-white group-hover:gap-3 gap-2 transition-all">
           Baca Studi Kasus <ArrowRight className="h-4 w-4 text-cbp-gold" />
        </div>
      </div>
    </div>
  );
};
