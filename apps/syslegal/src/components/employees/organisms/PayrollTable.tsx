
import React from 'react';
import { PayrollSlip, formatCurrencyIDR } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { CheckCircle, Download } from 'lucide-react';
import { PayrollStatusBadge } from '../atoms/PayrollStatusBadge';

interface PayrollTableProps {
  payrolls: PayrollSlip[];
  onMarkPaid: (id: string) => void;
}

export const PayrollTable: React.FC<PayrollTableProps> = ({ payrolls, onMarkPaid }) => {
  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Pegawai</th>
              <th className="px-6 py-4 font-bold">Periode</th>
              <th className="px-6 py-4 font-bold text-right">Gaji Pokok</th>
              <th className="px-6 py-4 font-bold text-right">Tunjangan</th>
              <th className="px-6 py-4 font-bold text-right">Potongan</th>
              <th className="px-6 py-4 font-bold text-right">THP (Net)</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {payrolls.length > 0 ? payrolls.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-bold text-cbp-navy dark:text-white">
                  {p.employeeName}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {p.period}
                </td>
                <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400 font-mono">
                  {formatCurrencyIDR(p.basicSalary)}
                </td>
                <td className="px-6 py-4 text-right text-green-600 dark:text-green-400 font-mono">
                  + {formatCurrencyIDR(p.allowances)}
                </td>
                <td className="px-6 py-4 text-right text-red-500 dark:text-red-400 font-mono">
                  - {formatCurrencyIDR(p.deductions)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-cbp-navy dark:text-white font-mono text-base">
                  {formatCurrencyIDR(p.netSalary)}
                </td>
                <td className="px-6 py-4 text-center">
                  <PayrollStatusBadge status={p.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {p.status === 'Draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => onMarkPaid(p.id)}
                        className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                        title="Tandai Lunas"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-8 px-2" title="Download Slip">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">Belum ada data penggajian.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
