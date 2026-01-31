
"use client";

import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const useFieldLogic = () => {
  const { user } = useAuth();
  const { events } = useData();

  const fieldData = useMemo(() => {
    const today = new Date();
    
    // Filter events for today only
    const todayEvents = events.filter(e => {
        const d = new Date(e.date);
        return d.getDate() === today.getDate() && 
               d.getMonth() === today.getMonth() && 
               d.getFullYear() === today.getFullYear();
    });

    // Sort by time
    todayEvents.sort((a, b) => a.time.localeCompare(b.time));

    return {
      userName: user?.name.split(' ')[0] || 'Petugas',
      todayEvents,
      taskCount: todayEvents.length,
      completedCount: 0 // Placeholder logic for future features
    };
  }, [user, events]);

  return fieldData;
};
