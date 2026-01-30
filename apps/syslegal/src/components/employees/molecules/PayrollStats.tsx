
import React from 'react';
import { Card } from '@cbp/ui';
import { formatCurrencyIDR, PayrollSlip } from '@cbp/core';
import { Wallet, TrendingUp, Clock } from 'lucide-react';

interface PayrollStatsProps {
  payrolls: PayrollSlip[];
}

export const PayrollStats: React.FC<PayrollStatsProps> = ({ payrolls }) => {
  // Hitung total pengeluaran bulan ini (Mock: ambil semua data Paid)
  const totalPaid = payrolls
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.netSalary, 0);

  const pendingCount = payrolls.filter(p => p.status === 'Draft').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" padding={false}>
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4 ml-4">
          <Wallet className="h-6 w-6" />
        </div>
        <div className="py-4 pr-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Total Terbayar</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{formatCurrencyIDR(totalPaid)}</p>
        </div>
      </Card>

      <Card className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" padding={false}>
        <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 mr-4 ml-4">
          <Clock className="h-6 w-6" />
        </div>
        <div className="py-4 pr-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Menunggu (Draft)</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{pendingCount} Slip</p>
        </div>
      </Card>

      <Card className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" padding={false}>
        <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4 ml-4">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div className="py-4 pr-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Periode Aktif</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Oktober 2023</p>
        </div>
      </Card>
    </div>
  );
};
