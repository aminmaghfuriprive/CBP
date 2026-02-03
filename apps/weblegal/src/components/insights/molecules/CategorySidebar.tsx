
"use client";

import React from 'react';
import { Tag } from 'lucide-react';

interface CategorySidebarProps {
  onSelect: (category: string) => void;
  selectedCategory?: string;
}

// Data kategori lengkap
const CATEGORIES = [
  "Hukum Umum", "Hukum Pidana", "Hukum Keluarga",
  "Hukum Ketenagakerjaan", "Hukum Keuangan", "Hukum Pajak",
  "Hukum Lingkungan", "Hukum Internasional", "Hukum Perdagangan",
  "Perbankan & Fintech", "Litigasi", "Perijinan Usaha",
  "Bisnis", "Pertanahan", "Properti",
  "Legal Administratif", "Korporasi", "UMKM",
  "Kekayaan Intelektual", "Teknologi"
];

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ onSelect, selectedCategory }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <h4 className="font-serif font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-3">
        <Tag className="h-3.5 w-3.5 text-cbp-gold" /> Topik Terkait
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`
              text-[10px] px-2.5 py-1 rounded-md font-bold transition-all border
              ${selectedCategory === cat 
                ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold' 
                : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-cbp-gold hover:text-cbp-navy dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:text-white'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
