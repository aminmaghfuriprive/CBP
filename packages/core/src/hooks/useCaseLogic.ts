"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { CaseData } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useCaseLogic = () => {
  // useLiveQuery otomatis update component saat data di DB berubah
  const cases = useLiveQuery(() => db.cases.toArray()) || [];
  const { addNotification } = useNotifications();

  const addCase = async (newCase: CaseData) => {
    try {
      await db.cases.add(newCase);
      addNotification('Kasus Baru Dibuat', `Kasus untuk ${newCase.clientName} tersimpan di database.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Error', 'Gagal menyimpan kasus.', 'warning');
    }
  };

  return { cases, addCase };
};