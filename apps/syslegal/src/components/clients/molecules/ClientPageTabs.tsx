
import React from 'react';
import { CLIENT_PAGE_TABS, TabView } from '../client-page.config';

interface ClientPageTabsProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
  pendingDocsCount: number;
}

export const ClientPageTabs: React.FC<ClientPageTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  pendingDocsCount 
}) => {
  return (
    <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
      {CLIENT_PAGE_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === tab.id 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <tab.icon className="h-4 w-4" /> 
          {tab.label}
          
          {/* Badge Logic */}
          {tab.hasBadge && pendingDocsCount > 0 && (
            <span className="h-5 w-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px]">
              {pendingDocsCount}
            </span>
          )}
          
          {/* Active Indicator */}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};
