"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { CalendarEvent } from '../types';
import { db } from '../db';

export const useScheduleLogic = () => {
  const events = useLiveQuery(() => db.events.orderBy('date').toArray()) || [];

  const addEvent = async (event: CalendarEvent) => {
    try {
      await db.events.add(event);
    } catch (error) {
      console.error("Gagal menambah event:", error);
    }
  };

  return { events, addEvent };
};