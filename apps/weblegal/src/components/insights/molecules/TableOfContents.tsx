
"use client";

import React from 'react';
import { List } from 'lucide-react';
import { useTableOfContents } from '../hooks/useTableOfContents';

export const TableOfContents: React.FC = () => {
  const { headings, activeId } = useTableOfContents();

  if (headings.length === 0) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-32 transition-all duration-300">
      <h4 className="font-serif font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
        <List className="h-4 w-4 text-cbp-gold" /> Daftar Isi
      </h4>
      <nav className="flex flex-col gap-1 relative">
        {/* Active Indicator Line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        
        {headings.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`
              relative text-sm transition-all duration-300 py-1.5 pl-4 block border-l-2 -ml-0.5
              ${item.level === 3 ? 'ml-3 text-xs' : ''}
              ${activeId === item.id 
                ? 'border-cbp-gold text-cbp-navy dark:text-cbp-gold font-bold bg-gradient-to-r from-cbp-gold/5 to-transparent' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}
            `}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
