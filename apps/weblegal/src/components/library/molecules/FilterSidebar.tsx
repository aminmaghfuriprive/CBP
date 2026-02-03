
"use client";

import React from 'react';
import { Filter, Check } from 'lucide-react';

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
    <div className="mb-8">
      <h4 className="font-bold text-xs text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-widest flex items-center gap-2">
        {title}
      </h4>
      <div className="space-y-1">
        {items.map((item: string) => {
          const isSelected = selected === item.toString();
          return (
            <label 
              key={item} 
              className={`
                flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all group
                ${isSelected 
                  ? 'bg-cbp-navy/5 dark:bg-white/10 text-cbp-navy dark:text-white font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'border-cbp-gold bg-cbp-gold text-cbp-navy' : 'border-slate-300 dark:border-slate-600 bg-transparent'}`}>
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm">{item}</span>
              </div>
              <input 
                type="radio" 
                className="hidden" 
                name={title} 
                value={item} 
                checked={isSelected} 
                onChange={() => onChange(item.toString())} 
              />
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sticky top-32 shadow-sm">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-cbp-gold">
           <Filter className="h-4 w-4" />
        </div>
        <h3 className="font-serif font-bold text-lg text-slate-800 dark:text-white">Filter Pustaka</h3>
      </div>

      <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pr-2">
        <FilterGroup title="Jenis Regulasi" items={options.types} selected={filters.selectedType} onChange={setters.setSelectedType} />
        <FilterGroup title="Bidang Hukum" items={options.categories} selected={filters.selectedCategory} onChange={setters.setSelectedCategory} />
        <FilterGroup title="Tahun Terbit" items={options.years} selected={filters.selectedYear} onChange={setters.setSelectedYear} />
      </div>
    </div>
  );
};
