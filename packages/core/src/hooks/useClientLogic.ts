
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { ClientData } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useClientLogic = () => {
  const clients = useLiveQuery(() => db.clients.toArray()) || [];
  const { addNotification } = useNotifications();

  const addClient = async (client: ClientData) => {
    try {
      // Cek duplikasi based on name/contact logic if needed
      await db.clients.put(client); // put updates if id exists or adds if not
      // addNotification('Klien Disimpan', `Data ${client.name} tersimpan.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menyimpan data klien.', 'warning');
    }
  };

  return { clients, addClient };
};
