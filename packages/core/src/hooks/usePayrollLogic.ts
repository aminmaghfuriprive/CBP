
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { PayrollSlip } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const usePayrollLogic = () => {
  const { addNotification } = useNotifications();

  // Fail-safe query
  const payrolls = useLiveQuery(() => {
    if (!db.payroll) return [];
    return db.payroll.orderBy('period').reverse().toArray();
  }) || [];

  const createSlip = async (slip: PayrollSlip) => {
    try {
      await db.payroll.add(slip);
      addNotification('Sukses', `Slip gaji untuk ${slip.employeeName} dibuat.`, 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal membuat slip gaji.', 'warning');
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      await db.payroll.update(id, { 
        status: 'Paid',
        paymentDate: new Date().toISOString().split('T')[0]
      });
      addNotification('Terbayar', 'Status pembayaran diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal update status.', 'warning');
    }
  };

  return { payrolls, createSlip, markAsPaid };
};
