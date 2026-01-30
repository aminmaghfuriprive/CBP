
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { ClientData } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useClientLogic = () => {
  const { addNotification } = useNotifications();

  const clients = useLiveQuery(() => db.clients.toArray()) || [];

  const addClient = async (client: ClientData) => {
    try {
      await db.clients.put(client); 
      addNotification('Klien Disimpan', `Data ${client.name} tersimpan.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menyimpan data klien.', 'warning');
    }
  };

  const updateClient = async (id: string, updates: Partial<ClientData>) => {
    try {
      await db.clients.update(id, updates);
      addNotification('Update Berhasil', 'Data klien diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memperbarui data klien.', 'warning');
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await db.clients.delete(id);
      addNotification('Terhapus', 'Data klien dihapus dari database.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus data klien.', 'warning');
    }
  };

  return { clients, addClient, updateClient, deleteClient };
};
