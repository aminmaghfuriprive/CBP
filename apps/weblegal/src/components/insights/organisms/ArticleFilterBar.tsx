
import React from 'react';
import { SearchInput } from '@cbp/ui';

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
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`
              px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
              ${selectedCategory === cat 
                ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold shadow-md transform scale-105' 
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-cbp-navy dark:hover:border-cbp-gold'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="w-full md:w-72">
        <SearchInput 
          placeholder="Cari topik hukum..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="shadow-sm"
        />
      </div>
    </div>
  );
};
