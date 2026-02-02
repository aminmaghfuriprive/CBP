
import React from 'react';
import { User, Building2 } from 'lucide-react';

interface ClientTypeSelectorProps {
  value: 'INDIVIDUAL' | 'CORPORATE';
  onChange: (type: 'INDIVIDUAL' | 'CORPORATE') => void;
}

export const ClientTypeSelector: React.FC<ClientTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <button
        type="button"
        onClick={() => onChange('INDIVIDUAL')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
          value === 'INDIVIDUAL' 
            ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
        }`}
      >
        <User className="h-4 w-4" /> Perorangan
      </button>
      <button
        type="button"
        onClick={() => onChange('CORPORATE')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
          value === 'CORPORATE' 
            ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
        }`}
      >
        <Building2 className="h-4 w-4" /> Perusahaan
      </button>
    </div>
  );
};
