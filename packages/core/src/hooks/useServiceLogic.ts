
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { ServiceItem } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useServiceLogic = () => {
  const services = useLiveQuery(() => db.services.toArray()) || [];
  const { addNotification } = useNotifications();

  const addService = async (service: ServiceItem) => {
    try {
      await db.services.add(service);
      addNotification('Layanan Ditambahkan', `${service.title} siap digunakan.`, 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal menambah layanan baru.', 'warning');
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceItem>) => {
    try {
      await db.services.update(id, updates);
      addNotification('Berhasil', 'Informasi layanan diperbarui.', 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal memperbarui layanan.', 'warning');
    }
  };

  const deleteService = async (id: string) => {
    try {
      await db.services.delete(id);
      addNotification('Terhapus', 'Layanan dihapus dari database.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus layanan.', 'warning');
    }
  };

  return { services, addService, updateService, deleteService };
};
