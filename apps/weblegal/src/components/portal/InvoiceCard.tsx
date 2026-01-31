
import React from 'react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';
import { Card, Badge, Button } from '@cbp/ui';
import { Download, CreditCard, Clock, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface InvoiceCardProps {
  invoice: Invoice;
  onPay: (invoice: Invoice) => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onPay }) => {
  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'Paid': return { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200', icon: CheckCircle2, label: 'Lunas' };
      case 'Verifying': return { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', icon: Loader2, label: 'Verifikasi' };
      case 'Overdue': return { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', icon: AlertTriangle, label: 'Jatuh Tempo' };
      default: return { color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', icon: Clock, label: 'Belum Lunas' };
    }
  };

  const status = getStatusConfig(invoice.status);
  const StatusIcon = status.icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row relative group">
      
      {/* Status Strip (Left) */}
      <div className={`w-full md:w-2 ${status.bg} dark:opacity-80 h-2 md:h-auto`}></div>

      <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Icon & ID */}
        <div className="flex items-center gap-4 min-w-[200px]">
           <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${status.bg} dark:bg-opacity-20`}>
              <StatusIcon className={`h-6 w-6 ${status.color} ${invoice.status === 'Verifying' ? 'animate-spin' : ''}`} />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Invoice</p>
              <p className="font-mono font-bold text-slate-900 dark:text-white text-base">{invoice.id}</p>
           </div>
        </div>

        {/* Description & Date */}
        <div className="flex-1">
           <h4 className="font-bold text-cbp-navy dark:text-white text-lg mb-1">{invoice.description}</h4>
           <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>Terbit: {invoice.issueDate}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className={invoice.status === 'Overdue' ? 'text-red-500 font-bold' : ''}>
                Jatuh Tempo: {invoice.dueDate}
              </span>
           </div>
        </div>

        {/* Amount & Action */}
        <div className="flex flex-col items-end gap-2 min-w-[180px]">
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Tagihan</p>
           <p className="text-2xl font-bold text-cbp-navy dark:text-white">{formatCurrencyIDR(invoice.amount)}</p>
           
           <div className="flex gap-2 mt-1">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full border border-slate-200 dark:border-slate-700">
                 <Download className="h-4 w-4 text-slate-500" />
              </Button>
              
              {invoice.status === 'Unpaid' || invoice.status === 'Overdue' ? (
                <Button 
                  onClick={() => onPay(invoice)} 
                  size="sm" 
                  className="bg-cbp-navy text-white hover:bg-slate-800 shadow-md font-bold px-4"
                >
                  Bayar
                </Button>
              ) : (
                <div className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${status.bg} dark:bg-opacity-10 ${status.color}`}>
                   <StatusIcon className="h-3.5 w-3.5" /> {status.label}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
