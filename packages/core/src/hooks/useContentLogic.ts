
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { Article } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useContentLogic = () => {
  const articles = useLiveQuery(() => db.articles.orderBy('date').reverse().toArray()) || [];
  const { addNotification } = useNotifications();

  const addArticle = async (article: Article) => {
    try {
      await db.articles.add(article);
      addNotification('Artikel Terbit', `"${article.title}" berhasil ditambahkan ke website.`, 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal menyimpan artikel.', 'warning');
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      await db.articles.update(id, updates);
      addNotification('Update Berhasil', 'Konten artikel diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memperbarui artikel.', 'warning');
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await db.articles.delete(id);
      addNotification('Terhapus', 'Artikel dihapus dari database.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus artikel.', 'warning');
    }
  };

  return { articles, addArticle, updateArticle, deleteArticle };
};
