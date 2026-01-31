
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { PortfolioItem } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const usePortfolioLogic = () => {
  const { addNotification } = useNotifications();

  // Query live data dari DB
  const portfolios = useLiveQuery(() => db.portfolios.toArray()) || [];

  const addPortfolio = async (item: PortfolioItem) => {
    try {
      await db.portfolios.add(item);
      addNotification('Studi Kasus Ditambahkan', `"${item.title}" berhasil disimpan.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menyimpan portofolio.', 'warning');
    }
  };

  const updatePortfolio = async (id: string, updates: Partial<PortfolioItem>) => {
    try {
      await db.portfolios.update(id, updates);
      addNotification('Update Berhasil', 'Data studi kasus diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memperbarui data.', 'warning');
    }
  };

  const deletePortfolio = async (id: string) => {
    try {
      await db.portfolios.delete(id);
      addNotification('Terhapus', 'Studi kasus dihapus dari database.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus data.', 'warning');
    }
  };

  return { portfolios, addPortfolio, updatePortfolio, deletePortfolio };
};
