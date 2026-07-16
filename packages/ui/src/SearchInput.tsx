import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = "Cari...", 
  className = "",
  ...props 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <input 
        type="text" 
        className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};