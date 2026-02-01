
import React, { SelectHTMLAttributes } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: LucideIcon;
  options: { value: string; label: string }[] | string[];
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  icon: Icon, 
  options, 
  className = '', 
  error,
  ...props 
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
        )}
        <select
          className={`
            w-full py-2.5 border rounded-lg outline-none transition-all appearance-none cursor-pointer
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white
            ${Icon ? 'pl-9 pr-10' : 'pl-4 pr-10'}
            ${error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold'
            }
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
          {...props}
        >
          {options.map((opt, index) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return <option key={index} value={value}>{text}</option>;
          })}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
