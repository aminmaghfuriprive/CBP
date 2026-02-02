
import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';

interface PaymentHeaderProps {
  invoice: Invoice;
  onClose: () => void;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({ invoice, onClose }) => (
  <div className="bg-white border-b border-slate-100 p-4 shadow-sm relative z-10">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-600" />
        <span className="font-bold text-lg text-slate-800 tracking-tight">Secure Payment</span>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors bg-slate-100 p-1 rounded-full">
        <X className="h-4 w-4" />
      </button>
    </div>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Amount</p>
        <p className="text-xl font-bold text-slate-900">{formatCurrencyIDR(invoice.amount)}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
        <p className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{invoice.id}</p>
      </div>
    </div>
  </div>
);
