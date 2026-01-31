
import React from 'react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';
import { StatusBadge } from '@cbp/ui';
import { CheckCircle, DollarSign, Clock } from 'lucide-react';

interface InvoiceTableProps {
  invoices: Invoice[];
  onMarkPaid: (id: string) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onMarkPaid }) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <div className="inline-flex p-3 bg-slate-50 dark:bg-slate-800 rounded-full mb-3">
          <DollarSign className="h-6 w-6 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-slate-500 text-sm">Tidak ada data tagihan ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold tracking-wider">No. Invoice</th>
              <th className="px-6 py-4 font-bold tracking-wider">Klien & Deskripsi</th>
              <th className="px-6 py-4 font-bold tracking-wider">Jatuh Tempo</th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">Jumlah</th>
              <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
              <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                   <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                     {inv.id}
                   </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-cbp-navy dark:text-white">{inv.clientName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] mt-0.5">
                    {inv.description}
                  </p>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                     <Clock className="h-3.5 w-3.5 text-slate-400" /> {inv.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-cbp-navy dark:text-white text-right font-mono">
                  {formatCurrencyIDR(inv.amount)}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  {inv.status !== 'Paid' && (
                    <button 
                      onClick={() => onMarkPaid(inv.id)}
                      className="text-xs font-bold flex items-center justify-end gap-1 ml-auto transition-colors px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
                    >
                      <CheckCircle className="h-3.5 w-3.5" /> Lunas
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
