
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
      await addNotification('Tagihan Baru', `Invoice ${invoice.id} telah diterbitkan.`, 'info', 'CLIENT');
    } catch (error) {
      console.error(error);
    }
  };

  const updateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    try {
      const inv = await db.invoices.get(id);
      await db.invoices.update(id, { status });
      
      if (status === 'Paid') {
        await addNotification('Pembayaran Lunas', `Terima kasih! Pembayaran untuk invoice ${id} telah kami terima.`, 'success', 'CLIENT');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmPayment = async (id: string, proofUrl: string) => {
    try {
      const inv = await db.invoices.get(id);
      await db.invoices.update(id, { 
        status: 'Verifying',
        paymentProofUrl: proofUrl
      });
      // Notif ke tim FINANCE
      await addNotification(
        'Konfirmasi Pembayaran', 
        `Klien ${inv?.clientName} telah mengunggah bukti transfer untuk invoice ${id}.`, 
        'warning', 
        'FINANCE'
      );
    } catch (error) {
      console.error(error);
    }
  };

  const rejectPayment = async (id: string, reason: string) => {
    try {
      await db.invoices.update(id, { 
        status: 'Rejected',
        rejectionReason: reason
      });
      // Notif ke Klien
      await addNotification(
        'Pembayaran Gagal Diverifikasi', 
        `Alasan: ${reason}. Mohon periksa kembali bukti transfer Anda.`, 
        'warning', 
        'CLIENT'
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { invoices, addInvoice, updateInvoiceStatus, confirmPayment, rejectPayment };
};
