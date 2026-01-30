
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { SocialPost, SocialPlatform } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useSocialMediaLogic = () => {
  const { addNotification } = useNotifications();

  const accounts = useLiveQuery(() => 
    db.socialAccounts.toArray()
  ) || [];

  const posts = useLiveQuery(() => 
    db.socialPosts.orderBy('date').reverse().toArray()
  ) || [];

  const toggleConnection = async (id: string, isConnected: boolean) => {
    try {
      await db.socialAccounts.update(id, { 
        isConnected: !isConnected,
        lastSync: !isConnected ? new Date().toISOString() : '-'
      });
      addNotification(
        !isConnected ? 'Terhubung' : 'Terputus', 
        `Koneksi akun berhasil ${!isConnected ? 'disambungkan' : 'diputuskan'}.`, 
        'info'
      );
    } catch (error) {
      addNotification('Gagal', 'Gagal update status koneksi.', 'warning');
    }
  };

  const createPost = async (content: string, platforms: SocialPlatform[]) => {
    if (!content || platforms.length === 0) return;

    const newPost: SocialPost = {
      id: `post_${Date.now()}`,
      content,
      platforms,
      date: new Date().toISOString(),
      likes: 0,
      shares: 0,
      status: 'Published'
    };

    try {
      await db.socialPosts.add(newPost);
      addNotification('Terposting', 'Konten berhasil diunggah ke media sosial.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memposting konten.', 'warning');
    }
  };

  return { accounts, posts, toggleConnection, createPost };
};
