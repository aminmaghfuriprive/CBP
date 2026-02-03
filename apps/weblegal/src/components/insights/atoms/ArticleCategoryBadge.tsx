
import React from 'react';

interface ArticleCategoryBadgeProps {
  category: string;
  className?: string;
}

export const ArticleCategoryBadge: React.FC<ArticleCategoryBadgeProps> = ({ category, className = '' }) => {
  // Mapping warna statis atau dinamis sederhana
  const getColor = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('litigasi')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    if (lower.includes('bisnis') || lower.includes('izin')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    if (lower.includes('tanah') || lower.includes('agraria')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    return 'bg-cbp-gold/20 text-cbp-navy dark:text-cbp-gold border-cbp-gold/30';
  };

  return (
    <span className={`
      px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
      ${getColor(category)}
      ${className}
    `}>
      {category}
    </span>
  );
};
