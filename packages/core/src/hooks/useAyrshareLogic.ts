
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';
import { MOCK_AYRSHARE_PROFILES } from '../data/mock_ayrshare';

export const useAyrshareLogic = () => {
  const { addNotification } = useNotifications();

  // Query config (Single row)
  const config = useLiveQuery(() => db.ayrshareConfig.get('default')) || {
    id: 'default',
    apiKey: '',
    isConnected: false,
    lastSync: ''
  };

  // Mock Profiles (Only show if connected)
  const profiles = config.isConnected ? MOCK_AYRSHARE_PROFILES : [];

  const saveApiKey = async (apiKey: string) => {
    if (!apiKey) {
      addNotification('Gagal', 'API Key tidak boleh kosong.', 'warning');
      return;
    }

    try {
      // Simulate API Validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await db.ayrshareConfig.put({
        id: 'default',
        apiKey: apiKey,
        isConnected: true,
        lastSync: new Date().toISOString()
      });
      addNotification('Terhubung', 'Ayrshare API Key valid dan tersimpan.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal menyimpan konfigurasi.', 'warning');
    }
  };

  const disconnect = async () => {
    try {
      await db.ayrshareConfig.put({
        id: 'default',
        apiKey: '',
        isConnected: false,
        lastSync: ''
      });
      addNotification('Terputus', 'Koneksi Ayrshare telah dihapus.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal memutus koneksi.', 'warning');
    }
  };

  return { config, profiles, saveApiKey, disconnect };
};
