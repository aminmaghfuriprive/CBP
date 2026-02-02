
import React from 'react';
import { Invoice } from '@cbp/core';
import { InvoiceTable } from '../../../finance/molecules/InvoiceTable';

interface WorkspaceBillingProps {
  invoices: Invoice[];
}

export const WorkspaceBilling: React.FC<WorkspaceBillingProps> = ({ invoices }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-6">Riwayat Keuangan</h3>
      <InvoiceTable 
        invoices={invoices} 
        onMarkPaid={() => {}} 
      />
    </div>
  );
};
