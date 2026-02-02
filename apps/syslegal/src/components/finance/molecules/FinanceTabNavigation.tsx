
import React from 'react';
import { PieChart, CreditCard } from 'lucide-react';
import { FinanceTab } from '../hooks/useFinanceDashboard';

interface FinanceTabNavigationProps {
  activeTab: FinanceTab;
  onTabChange: (tab: FinanceTab) => void;
  pendingCount: number;
}

export const FinanceTabNavigation: React.FC<FinanceTabNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  pendingCount 
}) => {
  return (
    <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0 overflow-x-auto no-scrollbar">
      <button
        onClick={() => onTabChange('overview')}
        className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
          activeTab === 'overview' 
            ? 'text-cbp-navy dark:text-cbp-gold' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
      >
        <PieChart className="h-4 w-4" /> Ringkasan & Tagihan
        {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
      </button>

      <button
        onClick={() => onTabChange('verification')}
        className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
          activeTab === 'verification' 
            ? 'text-cbp-navy dark:text-cbp-gold' 
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
      >
        <CreditCard className="h-4 w-4" /> Verifikasi Pembayaran
        {pendingCount > 0 && (
          <span className="h-5 min-w-[1.25rem] px-1 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] animate-pulse">
            {pendingCount}
          </span>
        )}
        {activeTab === 'verification' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
      </button>
    </div>
  );
};
