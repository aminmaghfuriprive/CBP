
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface ArticleFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ArticleFilterBar: React.FC<ArticleFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input saat dibuka
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="flex items-center justify-between gap-4 mb-10 relative h-12">
      
      {/* Category Tabs (Hidden if Search Open on Mobile) */}
      <div className={`flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`
              px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border flex-shrink-0
              ${selectedCategory === cat 
                ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold shadow-md' 
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-cbp-navy dark:hover:border-cbp-gold'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expandable Search */}
      <div className={`flex items-center justify-end transition-all duration-300 ${isSearchOpen ? 'w-full absolute inset-0 z-10' : 'w-auto'}`}>
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-2 bg-white dark:bg-slate-900 p-1 rounded-full border border-cbp-gold shadow-lg animate-in fade-in slide-in-from-right-4">
            <Search className="h-4 w-4 text-cbp-gold ml-3 flex-shrink-0" />
            <input 
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 h-9"
              placeholder="Cari topik..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Escape') setIsSearchOpen(false); }}
            />
            <button 
              onClick={() => { setIsSearchOpen(false); onSearchChange(''); }}
              className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 mr-1 transition-colors"
            >
              <X className="h-3 w-3 text-slate-500" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cbp-gold hover:border-cbp-gold transition-all shadow-sm group"
            title="Cari Artikel"
          >
            <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

    </div>
  );
};
