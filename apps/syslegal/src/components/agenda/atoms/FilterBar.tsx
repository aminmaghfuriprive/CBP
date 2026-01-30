
import React from 'react';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  activeFilter, 
  onFilterChange,
  className = ''
}) => {
  return (
    <div className={`flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-1 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
            activeFilter === filter 
              ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {filter === 'All' ? 'Semua' : filter}
        </button>
      ))}
    </div>
  );
};
