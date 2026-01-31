
"use client";

import { useMemo } from 'react';
import { useData } from '../context/DataContext';

export const useInternalStats = () => {
  const { cases, invoices, events } = useData();

  const stats = useMemo(() => {
    // 1. Basic Counters
    const activeCases = cases.filter(c => c.status === 'Aktif').length;
    const completedCases = cases.filter(c => c.status === 'Selesai').length;
    
    const overdueInvoices = invoices.filter(i => i.status === 'Overdue');
    const overdueCount = overdueInvoices.length;
    
    // Filter events for today
    const today = new Date().toDateString();
    const todaysEventsCount = events.filter(e => new Date(e.date).toDateString() === today).length;

    // 2. Chart Data (Division Workload)
    const chartData = [
      { name: 'Korporasi', kasus: cases.filter(c => c.division === 'Legal Administratif & Korporasi').length }, 
      { name: 'Litigasi', kasus: cases.filter(c => c.division === 'Hukum Umum & Litigasi').length }, 
      { name: 'Perizinan', kasus: cases.filter(c => c.division === 'Perizinan & Bisnis').length },
      { name: 'Agraria', kasus: cases.filter(c => c.division === 'Pertanahan & Agraria').length },
    ];

    // 3. Upcoming Deadlines (Next 3 urgent events)
    const upcomingDeadlines = events
      .filter(e => (e.type === 'Sidang' || e.type === 'Deadline') && new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);

    return {
      activeCases,
      completedCases,
      overdueCount,
      hasOverdue: overdueCount > 0,
      todaysEventsCount,
      chartData,
      upcomingDeadlines
    };
  }, [cases, invoices, events]);

  return stats;
};
