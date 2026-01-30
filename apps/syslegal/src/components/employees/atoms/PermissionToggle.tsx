
import React from 'react';

interface PermissionToggleProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const PermissionToggle: React.FC<PermissionToggleProps> = ({ 
  label, isChecked, onChange, disabled 
}) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isChecked ? 'bg-cbp-navy/5 border-cbp-navy/20 dark:bg-cbp-gold/5 dark:border-cbp-gold/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
      <span className={`text-sm font-medium ${isChecked ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-600 dark:text-slate-400'}`}>
        {label}
      </span>
      
      <button 
        type="button"
        disabled={disabled}
        onClick={() => onChange(!isChecked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isChecked ? 'bg-cbp-navy dark:bg-cbp-gold' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  );
};
