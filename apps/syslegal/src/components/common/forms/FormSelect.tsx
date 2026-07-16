
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
      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none z-10" />
        )}
        <select
          className={`
            w-full py-1.5 border rounded-md outline-none transition-all appearance-none cursor-pointer text-xs
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white
            ${Icon ? 'pl-7 pr-8' : 'pl-3 pr-8'}
            ${error 
              ? 'border-red-500 focus:ring-1 focus:ring-red-500/20' 
              : 'border-slate-300 dark:border-slate-700 focus:ring-1 focus:ring-cbp-navy dark:focus:ring-cbp-gold'
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
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-[9px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
