
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { GBPUpdate } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { MOCK_GBP_LOCATIONS, MOCK_GBP_REVIEWS, MOCK_GBP_UPDATES } from '../data/mock_gbp';

export const useGoogleBusinessLogic = () => {
  const { addNotification } = useNotifications();

  // Fallback to mocks if DB is empty or not yet populated to prevent crash
  const location = useLiveQuery(() => db.gbpLocations.toArray().then(rows => rows[0])) || MOCK_GBP_LOCATIONS[0];
  const reviews = useLiveQuery(() => db.gbpReviews.orderBy('date').reverse().toArray()) || MOCK_GBP_REVIEWS;
  const updates = useLiveQuery(() => db.gbpUpdates.orderBy('date').reverse().toArray()) || MOCK_GBP_UPDATES;

  const replyReview = async (reviewId: string, replyText: string) => {
    try {
      await db.gbpReviews.update(reviewId, {
        reply: replyText,
        replyDate: new Date().toISOString()
      });
      addNotification('Terkirim', 'Balasan ulasan berhasil dikirim ke Google.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal mengirim balasan (Prototype Mode).', 'warning');
    }
  };

  const createUpdate = async (content: string, type: 'UPDATE' | 'EVENT' | 'OFFER') => {
    const newUpdate: GBPUpdate = {
      id: `upd_${Date.now()}`,
      content,
      type,
      date: new Date().toISOString(),
      status: 'LIVE',
      views: 0,
      clicks: 0
    };

    try {
      await db.gbpUpdates.add(newUpdate);
      addNotification('Terbit', 'Update berhasil diposting ke Google Business.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal memposting update.', 'warning');
    }
  };

  return { location, reviews, updates, replyReview, createUpdate };
};
