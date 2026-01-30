
import React from 'react';
import { formatCurrencyIDR } from '@cbp/core';
import { Briefcase, FileText, Wallet } from 'lucide-react';

interface ClientStatsOverviewProps {
  totalCases: number;
  activeCases: number;
  unpaidAmount: number;
}

export const ClientStatsOverview: React.FC<ClientStatsOverviewProps> = ({ totalCases, activeCases, unpaidAmount }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center text-center">
        <Briefcase className="h-5 w-5 text-cbp-gold mb-2" />
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalCases}</span>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Kasus</span>
      </div>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center text-center">
        <FileText className="h-5 w-5 text-blue-500 mb-2" />
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{activeCases}</span>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Kasus Aktif</span>
      </div>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col items-center text-center">
        <Wallet className="h-5 w-5 text-red-500 mb-2" />
        <span className="text-sm font-bold text-slate-900 dark:text-white mt-1">{formatCurrencyIDR(unpaidAmount)}</span>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">Outstanding</span>
      </div>
    </div>
  );
};
