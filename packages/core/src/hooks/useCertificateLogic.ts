
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { CertificateItem } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useCertificateLogic = () => {
  const { addNotification } = useNotifications();

  // Query live data from DB, sorted by order or year
  const certificates = useLiveQuery(() => db.certificates.orderBy('year').reverse().toArray()) || [];

  const addCertificate = async (item: CertificateItem) => {
    try {
      await db.certificates.add(item);
      addNotification('Sertifikat Ditambahkan', `"${item.title}" berhasil disimpan.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menyimpan sertifikat.', 'warning');
    }
  };

  const updateCertificate = async (id: string, updates: Partial<CertificateItem>) => {
    try {
      await db.certificates.update(id, updates);
      addNotification('Update Berhasil', 'Data sertifikat diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memperbarui data.', 'warning');
    }
  };

  const deleteCertificate = async (id: string) => {
    try {
      await db.certificates.delete(id);
      addNotification('Terhapus', 'Sertifikat dihapus dari database.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus data.', 'warning');
    }
  };

  return { certificates, addCertificate, updateCertificate, deleteCertificate };
};
