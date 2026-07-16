
import React from 'react';
import { X, LucideIcon } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  title, 
  subtitle,
  icon: Icon, 
  onClose 
}) => {
  return (
    <div className="flex justify-between items-start p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="p-1.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm">
             <Icon className="h-4 w-4 text-cbp-gold" />
          </div>
        )}
        <div>
          <h3 className="font-bold text-cbp-navy dark:text-white text-sm leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Close modal"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
