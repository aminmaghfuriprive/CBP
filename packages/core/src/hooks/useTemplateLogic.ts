
"use client";

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { DocumentTemplate } from '../types';
import { useNotifications } from '../context/NotificationContext';
import { MOCK_TEMPLATES } from '../data/mock_templates';

export const useTemplateLogic = () => {
  const { addNotification } = useNotifications();

  // Fail-safe query
  const templates = useLiveQuery(() => {
    if (!db.templates) return [];
    return db.templates.toArray();
  }) || [];

  // Auto-seed if empty (handling DB upgrade scenario)
  useEffect(() => {
    const seedTemplates = async () => {
      try {
        if (!db.templates) return;
        const count = await db.templates.count();
        if (count === 0) {
          await db.templates.bulkAdd(MOCK_TEMPLATES);
          console.log('Templates seeded successfully');
        }
      } catch (error) {
        console.error('Failed to seed templates:', error);
      }
    };
    seedTemplates();
  }, []);

  const updateTemplate = async (id: string, updates: Partial<DocumentTemplate>) => {
    try {
      await db.templates.update(id, updates);
      addNotification('Tersimpan', 'Perubahan template berhasil disimpan.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal update template.', 'warning');
    }
  };

  const setTemplateActive = async (id: string, type: 'LETTERHEAD' | 'ENVELOPE') => {
    try {
      // 1. Set all others of same type to inactive
      const others = templates.filter(t => t.type === type && t.id !== id);
      await Promise.all(others.map(t => db.templates.update(t.id, { isActive: false })));
      
      // 2. Set target to active
      await db.templates.update(id, { isActive: true });
      addNotification('Aktif', 'Template utama telah diganti.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal mengganti template aktif.', 'warning');
    }
  };

  return { templates, updateTemplate, setTemplateActive };
};
