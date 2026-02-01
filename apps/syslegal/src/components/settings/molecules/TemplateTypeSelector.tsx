
import React from 'react';

interface TemplateTypeSelectorProps {
  activeTab: 'LETTERHEAD' | 'ENVELOPE';
  onTabChange: (tab: 'LETTERHEAD' | 'ENVELOPE') => void;
}

export const TemplateTypeSelector: React.FC<TemplateTypeSelectorProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
       <button 
         onClick={() => onTabChange('LETTERHEAD')}
         className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'LETTERHEAD' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-500'}`}
       >
         Kop Surat
       </button>
       <button 
         onClick={() => onTabChange('ENVELOPE')}
         className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'ENVELOPE' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-500'}`}
       >
         Kop Amplop
       </button>
    </div>
  );
};
