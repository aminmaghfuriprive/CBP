
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { Button, PageHeader } from '@cbp/ui';
import { InvoiceModal } from '../../../src/components/InvoiceModal';
import { FinanceStats } from '../../../src/components/finance/molecules/FinanceStats';
import { InvoiceTable } from '../../../src/components/finance/molecules/InvoiceTable';
import { PaymentVerificationList } from '../../../src/components/verification/PaymentVerificationList';
import { Download, Plus, Filter, PieChart, CreditCard } from 'lucide-react';

export default function FinancePage() {
  const { invoices, addInvoice, updateInvoiceStatus } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'verification'>('overview');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic: Statistics Calculation
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;
  
  // Logic: Pending Verification Count
  const pendingPayments = invoices.filter(i => i.status === 'Verifying').length;

  // Logic: Filtering
  const filteredInvoices = invoices.filter(i => filter === 'All' || i.status === filter);

  const handleMarkPaid = (id: string) => {
    if(confirm('Tandai invoice ini sebagai lunas?')) {
        updateInvoiceStatus(id, 'Paid');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <PageHeader 
        title="Keuangan & Pembayaran" 
        subtitle="Kelola arus kas, tagihan klien, dan verifikasi bukti transfer."
        action={
          activeTab === 'overview' && (
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <Download className="h-4 w-4" /> Laporan
              </Button>
              <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Buat Tagihan
              </Button>
            </div>
          )
        }
      />

      {/* Tabs Navigation */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'overview' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <PieChart className="h-4 w-4" /> Ringkasan & Tagihan
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'verification' 
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
          {activeTab === 'verification' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'overview' ? (
          <div className="space-y-8">
            <FinanceStats 
              totalRevenue={totalRevenue} 
              outstanding={outstanding} 
              overdueCount={overdueCount} 
            />

            <div className="space-y-4">
               <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-cbp-navy dark:text-white px-3 flex items-center gap-2">
                     <Filter className="h-4 w-4 text-cbp-gold" /> Filter Status
                  </h3>
                  <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {['All', 'Paid', 'Unpaid', 'Overdue'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                          filter === s 
                            ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white'
                        }`}
                      >
                        {s === 'All' ? 'Semua' : s}
                      </button>
                    ))}
                  </div>
               </div>

               <InvoiceTable 
                 invoices={filteredInvoices} 
                 onMarkPaid={handleMarkPaid} 
               />
            </div>
          </div>
        ) : (
          <PaymentVerificationList />
        )}
      </div>

      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addInvoice} 
      />
    </div>
  );
}
