
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { CaseData } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useCaseLogic = () => {
  const cases = useLiveQuery(() => db.cases.toArray()) || [];
  const { addNotification } = useNotifications();

  const addCase = async (newCase: CaseData) => {
    try {
      await db.cases.add(newCase);
      // Notif ke Admin & Produksi
      await addNotification('Kasus Baru', `Kasus ${newCase.caseType} untuk ${newCase.clientName} telah didaftarkan.`, 'success', 'ADMIN');
    } catch (error) {
      console.error(error);
    }
  };

  const updateCaseStage = async (id: string, stage: string, clientName: string) => {
    try {
      await db.cases.update(id, { 
        currentStage: stage,
        lastUpdate: new Date().toISOString().split('T')[0]
      });
      // Notif ke Klien
      await addNotification(
        'Update Progres Kasus', 
        `Kasus Anda telah memasuki tahap: ${stage.replace(/_/g, ' ')}.`, 
        'info', 
        'CLIENT'
      );
    } catch (error) {
       console.error(error);
    }
  };

  return { cases, addCase, updateCaseStage };
};
