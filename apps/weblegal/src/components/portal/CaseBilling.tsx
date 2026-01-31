
import React from 'react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';
import { Badge, Button } from '@cbp/ui';
import { DollarSign, ArrowRight, CheckCircle, Clock } from 'lucide-react';

interface CaseBillingProps {
  invoices: Invoice[];
}

export const CaseBilling: React.FC<CaseBillingProps> = ({ invoices }) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
        <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400">Tidak ada tagihan untuk kasus ini.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {invoices.map((inv) => (
        <div key={inv.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              inv.status === 'Paid' 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            }`}>
              {inv.status === 'Paid' ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-cbp-navy dark:text-white">{inv.id}</h4>
                <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>{inv.status}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{inv.description}</p>
              <p className="text-xs text-slate-400 mt-1">Jatuh Tempo: {inv.dueDate}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <span className="text-2xl font-bold text-cbp-navy dark:text-white">
              {formatCurrencyIDR(inv.amount)}
            </span>
            {inv.status !== 'Paid' && (
              <Button className="w-full md:w-auto gap-2">
                Bayar Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
