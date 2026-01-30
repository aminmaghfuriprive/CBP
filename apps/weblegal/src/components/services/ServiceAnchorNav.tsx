
import React from 'react';

interface ServiceAnchorNavProps {
  divisions: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ServiceAnchorNav: React.FC<ServiceAnchorNavProps> = ({ divisions, activeTab, onTabChange }) => {
  return (
    // Sticky position dengan z-index tinggi
    <div className="sticky top-[80px] z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 mb-10 -mx-6 md:-mx-12 px-6 md:px-12 py-3 transition-colors">
      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2 flex-shrink-0 hidden md:block">
          Kategori:
        </span>
        {divisions.map((div) => {
          const isActive = activeTab === div;
          
          return (
            <button
              key={div}
              onClick={() => onTabChange(div)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border flex-shrink-0
                ${isActive 
                  ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold shadow-md transform scale-105' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-cbp-navy hover:text-cbp-navy dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:border-cbp-gold dark:hover:text-cbp-gold'}
              `}
            >
              {div}
            </button>
          );
        })}
      </div>
    </div>
  );
};
