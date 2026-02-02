
import React from 'react';
import { Filter } from 'lucide-react';
import { InvoiceFilterType } from '../hooks/useFinanceDashboard';

interface InvoiceFilterToolbarProps {
  activeFilter: InvoiceFilterType;
  onFilterChange: (filter: InvoiceFilterType) => void;
}

export const InvoiceFilterToolbar: React.FC<InvoiceFilterToolbarProps> = ({ 
  activeFilter, 
  onFilterChange 
}) => {
  const filters: InvoiceFilterType[] = ['All', 'Paid', 'Unpaid', 'Overdue'];

  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-cbp-navy dark:text-white px-3 flex items-center gap-2 text-sm">
         <Filter className="h-4 w-4 text-cbp-gold" /> Filter Status
      </h3>
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto no-scrollbar">
        {filters.map((s) => (
          <button
            key={s}
            onClick={() => onFilterChange(s)}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
              activeFilter === s 
                ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white'
            }`}
          >
            {s === 'All' ? 'Semua' : s}
          </button>
        ))}
      </div>
    </div>
  );
};
