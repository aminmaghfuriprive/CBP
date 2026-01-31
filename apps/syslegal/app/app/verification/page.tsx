
"use client";

import React, { useState } from 'react';
import { PageHeader, StatCard } from '@cbp/ui';
import { useFinanceLogic, useDocumentLogic } from '@cbp/core';
import { CreditCard, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PaymentVerificationList } from '../../../src/components/verification/PaymentVerificationList';
import { DocumentVerificationList } from '../../../src/components/verification/DocumentVerificationList';

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<'payments' | 'documents'>('payments');
  const { invoices } = useFinanceLogic();
  const { documents } = useDocumentLogic();

  const pendingPayments = invoices.filter(i => i.status === 'Verifying').length;
  const pendingDocs = documents.filter(d => d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status)).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <PageHeader 
        title="Verification Center" 
        subtitle="Kelola dan validasi input dari klien sebelum masuk ke database utama." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <StatCard 
            label="Pending Pembayaran" 
            value={pendingPayments} 
            icon={CreditCard} 
            variant="warning" 
            subtext="Periksa bukti transfer klien"
         />
         <StatCard 
            label="Pending Dokumen" 
            value={pendingDocs} 
            icon={FileText} 
            variant="info" 
            subtext="Validasi kelengkapan berkas"
         />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-3 transition-all relative whitespace-nowrap ${
            activeTab === 'payments' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CreditCard className="h-4 w-4" /> Verifikasi Pembayaran
          {pendingPayments > 0 && (
            <span className="h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] animate-pulse">
              {pendingPayments}
            </span>
          )}
          {activeTab === 'payments' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-4 px-2 text-sm font-bold flex items-center gap-3 transition-all relative whitespace-nowrap ${
            activeTab === 'documents' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> Verifikasi Berkas Klien
          {pendingDocs > 0 && (
            <span className="h-5 w-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px]">
              {pendingDocs}
            </span>
          )}
          {activeTab === 'documents' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         {activeTab === 'payments' ? (
           <PaymentVerificationList />
         ) : (
           <DocumentVerificationList />
         )}
      </div>
    </div>
  );
}
