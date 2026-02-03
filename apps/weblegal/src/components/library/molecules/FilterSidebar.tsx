
"use client";

import React from 'react';
import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  options: { types: string[]; categories: string[]; years: (string|number)[] };
  filters: { selectedType: string; selectedCategory: string; selectedYear: string };
  setters: { 
    setSelectedType: (v: string) => void; 
    setSelectedCategory: (v: string) => void; 
    setSelectedYear: (v: string) => void; 
  };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ options, filters, setters }) => {
  const FilterGroup = ({ title, items, selected, onChange }: any) => (
    <div className="mb-6">
      <h4 className="font-bold text-sm text-cbp-navy dark:text-white mb-3 uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        {items.map((item: string) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selected === item.toString() ? 'border-cbp-gold bg-cbp-gold' : 'border-slate-300 dark:border-slate-600'}`}>
              {selected === item.toString() && <div className="w-1.5 h-1.5 bg-cbp-navy rounded-full"></div>}
            </div>
            <span className={`text-sm ${selected === item.toString() ? 'font-bold text-cbp-navy dark:text-cbp-gold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
              {item}
            </span>
            <input 
              type="radio" 
              className="hidden" 
              name={title} 
              value={item} 
              checked={selected === item.toString()} 
              onChange={() => onChange(item.toString())} 
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sticky top-32">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <Filter className="h-4 w-4 text-cbp-gold" />
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-white">Filter</h3>
      </div>

      <FilterGroup title="Jenis Regulasi" items={options.types} selected={filters.selectedType} onChange={setters.setSelectedType} />
      <FilterGroup title="Kategori Hukum" items={options.categories} selected={filters.selectedCategory} onChange={setters.setSelectedCategory} />
      <FilterGroup title="Tahun" items={options.years} selected={filters.selectedYear} onChange={setters.setSelectedYear} />
    </div>
  );
};
