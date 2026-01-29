"use client";

import { useState } from 'react';
import { Invoice } from '../types';
import { MOCK_INVOICES } from '../data/mock_finance';
import { useNotifications } from '../context/NotificationContext';

export const useFinanceLogic = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const { addNotification } = useNotifications();

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    addNotification('Invoice Dibuat', `Tagihan untuk ${invoice.clientName} telah diterbitkan.`, 'success');
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    addNotification('Status Invoice Diperbarui', `Status tagihan telah diubah menjadi ${status}.`, 'info');
  };

  return { invoices, addInvoice, updateInvoiceStatus };
};