
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { CaseData, CaseLifecycle } from '../types';
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

  const updateCaseStage = async (id: string, stage: string, clientName?: string) => {
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

  // Logic perpindahan 4 Fase Utama (State Machine sederhana)
  const advanceLifecycle = async (id: string, nextLifecycle: CaseLifecycle) => {
    try {
      const currentCase = await db.cases.get(id);
      if (!currentCase) return;

      // 1. Validasi Transisi (Business Rules)
      if (nextLifecycle === 'ARCHIVED' && currentCase.status !== 'Selesai') {
         await addNotification('Validasi Gagal', 'Kasus harus berstatus "Selesai" sebelum dapat diarsipkan.', 'warning');
         return;
      }

      // 2. Update Database
      await db.cases.update(id, {
        lifecycle: nextLifecycle,
        lastUpdate: new Date().toISOString().split('T')[0]
      });

      // 3. Notifikasi Feedback
      const labels: Record<CaseLifecycle, string> = {
        'PRE_PRODUCTION': 'Pra-Produksi',
        'PRODUCTION': 'Produksi (Pengerjaan)',
        'POST_PRODUCTION': 'Pasca-Produksi',
        'ARCHIVED': 'Arsip Digital'
      };

      await addNotification(
        'Fase Diperbarui', 
        `Kasus ${currentCase.clientName} dipindahkan ke ${labels[nextLifecycle]}.`, 
        'success'
      );

    } catch (error) {
      console.error("Gagal update lifecycle:", error);
      await addNotification('Error', 'Gagal memperbarui fase kasus.', 'danger');
    }
  };

  return { cases, addCase, updateCaseStage, advanceLifecycle };
};
