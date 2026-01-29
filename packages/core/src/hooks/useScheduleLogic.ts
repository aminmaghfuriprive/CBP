"use client";

import { useState } from 'react';
import { CalendarEvent } from '../types';
import { EVENTS } from '../data/mock_calendar';

export const useScheduleLogic = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(EVENTS);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  };

  return { events, addEvent };
};