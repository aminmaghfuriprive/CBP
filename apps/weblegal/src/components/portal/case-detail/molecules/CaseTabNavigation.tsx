
import React from 'react';
import { Calendar, FolderOpen, DollarSign } from 'lucide-react';
import { CaseDetailTab } from '../hooks/useClientCaseDetail';

interface CaseTabNavigationProps {
  activeTab: CaseDetailTab;
  onTabChange: (tab: CaseDetailTab) => void;
}

export const CaseTabNavigation: React.FC<CaseTabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'timeline', label: 'Progress & SOP', icon: Calendar },
    { id: 'docs', label: 'Dokumen', icon: FolderOpen },
    { id: 'billing', label: 'Tagihan', icon: DollarSign },
  ];

  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as CaseDetailTab)}
          className={`
            flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap
            ${activeTab === tab.id 
              ? 'border-cbp-navy text-cbp-navy dark:border-cbp-gold dark:text-cbp-gold' 
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}
          `}
        >
          <tab.icon className="h-4 w-4" /> {tab.label}
        </button>
      ))}
    </div>
  );
};
