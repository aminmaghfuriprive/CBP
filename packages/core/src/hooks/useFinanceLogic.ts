
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { Invoice } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useFinanceLogic = () => {
  const invoices = useLiveQuery(() => db.invoices.toArray()) || [];
  const { addNotification } = useNotifications();

  const addInvoice = async (invoice: Invoice) => {
    try {
      await db.invoices.add(invoice);
      addNotification('Invoice Dibuat', `Tagihan untuk ${invoice.clientName} diterbitkan.`, 'success');
    } catch (error) {
      addNotification('Error', 'Gagal membuat invoice.', 'warning');
    }
  };

  const updateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    try {
      await db.invoices.update(id, { status });
      addNotification('Status Diperbarui', `Tagihan diubah menjadi ${status}.`, 'info');
    } catch (error) {
      console.error(error);
    }
  };

  const confirmPayment = async (id: string, proofUrl: string) => {
    try {
      await db.invoices.update(id, { 
        status: 'Verifying', // Set to verifying state
        paymentProofUrl: proofUrl
      });
      addNotification('Konfirmasi Terkirim', 'Bukti pembayaran telah dikirim untuk verifikasi.', 'success');
    } catch (error) {
      addNotification('Error', 'Gagal mengirim konfirmasi.', 'warning');
    }
  };

  return { invoices, addInvoice, updateInvoiceStatus, confirmPayment };
};
