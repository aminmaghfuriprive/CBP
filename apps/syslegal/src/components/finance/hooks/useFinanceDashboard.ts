
"use client";

import { useState, useMemo } from 'react';
import { useData, useFinanceLogic } from '@cbp/core';

export type FinanceTab = 'overview' | 'verification';
export type InvoiceFilterType = 'All' | 'Paid' | 'Unpaid' | 'Overdue';

export const useFinanceDashboard = () => {
  const { invoices, addInvoice } = useData();
  const { updateInvoiceStatus } = useFinanceLogic();
  
  const [activeTab, setActiveTab] = useState<FinanceTab>('overview');
  const [filter, setFilter] = useState<InvoiceFilterType>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Statistics Calculation
  const stats = useMemo(() => ({
    totalRevenue: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0),
    outstanding: invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0),
    overdueCount: invoices.filter(i => i.status === 'Overdue').length,
    pendingPayments: invoices.filter(i => i.status === 'Verifying').length
  }), [invoices]);

  // 2. Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter(i => filter === 'All' || i.status === filter);
  }, [invoices, filter]);

  // 3. Handlers
  const handleMarkPaid = (id: string) => {
    if(confirm('Tandai invoice ini sebagai lunas?')) {
        updateInvoiceStatus(id, 'Paid');
    }
  };

  return {
    // Data
    invoices, 
    filteredInvoices,
    stats,
    
    // State
    activeTab,
    filter,
    isModalOpen,
    
    // Setters
    setActiveTab,
    setFilter,
    setIsModalOpen,
    
    // Actions
    addInvoice,
    handleMarkPaid
  };
};
