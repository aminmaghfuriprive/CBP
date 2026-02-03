
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { RegulationItem } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useRegulationLogic = () => {
  const { addNotification } = useNotifications();

  // Fetch all regulations (sorted by year desc by default for display)
  const regulations = useLiveQuery(() => {
    if (!db.regulations) return [];
    return db.regulations.orderBy('year').reverse().toArray();
  }) || [];

  const addRegulation = async (item: RegulationItem) => {
    try {
      await db.regulations.add(item);
      addNotification('Berhasil', 'Dokumen regulasi berhasil ditambahkan.', 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menyimpan regulasi.', 'warning');
    }
  };

  const updateRegulation = async (id: string, updates: Partial<RegulationItem>) => {
    try {
      await db.regulations.update(id, updates);
      addNotification('Update Berhasil', 'Data regulasi diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memperbarui data.', 'warning');
    }
  };

  const deleteRegulation = async (id: string) => {
    if(confirm("Hapus dokumen regulasi ini?")) {
      try {
        await db.regulations.delete(id);
        addNotification('Terhapus', 'Dokumen dihapus dari library.', 'info');
      } catch (error) {
        addNotification('Gagal', 'Gagal menghapus data.', 'warning');
      }
    }
  };

  const trackDownload = async (id: string) => {
    try {
        const reg = await db.regulations.get(id);
        if (reg) {
            await db.regulations.update(id, { downloadCount: (reg.downloadCount || 0) + 1 });
        }
    } catch (e) {
        console.error("Failed to track download", e);
    }
  };

  return { regulations, addRegulation, updateRegulation, deleteRegulation, trackDownload };
};
