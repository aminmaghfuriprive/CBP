"use client";

import React from 'react';
import { Button, PageHeader } from '@cbp/ui';
import { Download, Plus } from 'lucide-react';

// Components
import { InvoiceModal } from '../../../src/components/InvoiceModal';
import { PaymentVerificationList } from '../../../src/components/verification/PaymentVerificationList';

// Modular Finance Components
import { useFinanceDashboard } from '../../../src/components/finance/hooks/useFinanceDashboard';
import { FinanceTabNavigation } from '../../../src/components/finance/molecules/FinanceTabNavigation';
import { FinanceOverviewView } from '../../../src/components/finance/organisms/FinanceOverviewView';

export default function FinancePage() {
  // 1. Logic Hook
  const {
    filteredInvoices, stats, activeTab, filter, isModalOpen,
    setActiveTab, setFilter, setIsModalOpen, addInvoice, handleMarkPaid
  } = useFinanceDashboard();

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      {/* 2. Header & Navigation Area */}
      <div className="flex-shrink-0">
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

        <FinanceTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingCount={stats.pendingPayments}
        />
      </div>

      {/* 3. Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'overview' ? (
          <FinanceOverviewView
            stats={stats}
            filter={filter}
            onFilterChange={setFilter}
            invoices={filteredInvoices}
            onMarkPaid={handleMarkPaid}
          />
        ) : (
          <PaymentVerificationList />
        )}
      </div>

      {/* 4. Modals */}
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addInvoice}
      />
    </div>
  );
}