
"use client";

import React, { useState } from 'react';
import { useClientData, Invoice, formatCurrencyIDR } from '@cbp/core';
import { StatCard, Button } from '@cbp/ui';
import { DollarSign, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { InvoiceCard } from '@/components/portal/InvoiceCard';
import { PaymentConfirmationModal } from '@/components/portal/PaymentConfirmationModal';

export default function MyBillingPage() {
  const { myInvoices } = useClientData();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Statistics
  const unpaidTotal = myInvoices
    .filter(i => i.status === 'Unpaid' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.amount, 0);
  
  const pendingTotal = myInvoices.filter(i => i.status === 'Unpaid').length;
  const overdueTotal = myInvoices.filter(i => i.status === 'Overdue').length;

  const handlePayClick = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Stats */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Tagihan & Pembayaran</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Kelola kewajiban pembayaran Anda dengan mudah dan aman.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-cbp-navy dark:bg-slate-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cbp-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <p className="text-sm font-bold text-cbp-gold uppercase tracking-wider mb-1">Total Outstanding</p>
              <h2 className="text-3xl font-bold">{formatCurrencyIDR(unpaidTotal)}</h2>
              <p className="text-xs text-slate-300 mt-2">Segera selesaikan pembayaran untuk kelancaran kasus.</p>
           </div>

           <StatCard 
             label="Tagihan Aktif" 
             value={`${pendingTotal} Invoice`} 
             icon={FileText} 
             variant="warning"
           />
           
           <StatCard 
             label="Jatuh Tempo" 
             value={`${overdueTotal} Invoice`} 
             icon={AlertCircle} 
             variant={overdueTotal > 0 ? 'danger' : 'success'}
           />
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Riwayat Tagihan</h3>
        {myInvoices.length > 0 ? (
          myInvoices.map((inv) => (
            <InvoiceCard 
              key={inv.id} 
              invoice={inv} 
              onPay={handlePayClick} 
            />
          ))
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Tidak Ada Tagihan</h4>
            <p className="text-slate-500 text-sm">Anda tidak memiliki tagihan yang perlu dibayar saat ini.</p>
          </div>
        )}
      </div>

      <PaymentConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
