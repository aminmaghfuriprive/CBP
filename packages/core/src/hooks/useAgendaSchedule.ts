
"use client";

import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export const useAgendaSchedule = () => {
  const { events } = useData();
  const [activeFilter, setFilter] = useState('All');

  // Logic 1: Filtering & Sorting
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Events') return e.type !== 'Konsultasi'; // Events = Sidang, Meeting, Deadline
      if (activeFilter === 'Bookings') return e.type === 'Konsultasi';
      return true;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, activeFilter]);

  // Logic 2: Live Statistics Calculation
  const stats = useMemo(() => {
    return {
      consultationCount: events.filter(e => e.type === 'Konsultasi').length,
      hearingCount: events.filter(e => e.type === 'Sidang').length
    };
  }, [events]);

  return {
    events: filteredEvents,
    activeFilter,
    setFilter,
    stats
  };
};
