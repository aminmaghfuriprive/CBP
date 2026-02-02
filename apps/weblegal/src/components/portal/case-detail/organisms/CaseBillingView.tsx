
import React from 'react';
import { Invoice } from '@cbp/core';
import { CaseBilling } from '../../../CaseBilling';

interface CaseBillingViewProps {
  invoices: Invoice[];
}

export const CaseBillingView: React.FC<CaseBillingViewProps> = ({ invoices }) => {
  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-6">Riwayat Tagihan</h3>
      <CaseBilling invoices={invoices} />
    </div>
  );
};
