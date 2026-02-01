
import React, { TextareaHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
  icon: Icon, 
  className = '', 
  error,
  rows = 3,
  ...props 
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
        )}
        <textarea 
          rows={rows}
          className={`
            w-full py-2.5 border rounded-lg outline-none transition-all
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white
            placeholder:text-slate-400 custom-scrollbar
            ${Icon ? 'pl-9 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold'
            }
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
