
"use client";

import { useState } from 'react';
import { MOCK_AYRSHARE_PROFILES } from '../data/mock_ayrshare';
import { useNotifications } from '../context/NotificationContext';

export const useAyrshareLogic = () => {
  const { addNotification } = useNotifications();
  
  // State lokal untuk prototipe visual (tidak masuk ke DB Dexie untuk simplifikasi saat ini)
  const [config, setConfig] = useState({
    apiKey: '',
    isConnected: false
  });

  const profiles = config.isConnected ? MOCK_AYRSHARE_PROFILES : [];

  const saveApiKey = async (apiKey: string) => {
    if (!apiKey) {
      addNotification('Gagal', 'API Key tidak boleh kosong.', 'warning');
      return;
    }

    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setConfig({
      apiKey,
      isConnected: true
    });
    addNotification('Terhubung', 'Ayrshare API Key valid (Simulasi).', 'success');
  };

  const disconnect = async () => {
    setConfig({
      apiKey: '',
      isConnected: false
    });
    addNotification('Terputus', 'Koneksi Ayrshare diputus.', 'info');
  };

  return { config, profiles, saveApiKey, disconnect };
};
