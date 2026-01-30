
"use client";

import React from 'react';
import { useAgendaSchedule } from '../../hooks/useAgendaSchedule';
import { AgendaTable } from './molecules/AgendaTable';
import { MiniCalendarWidget } from './molecules/MiniCalendarWidget';
import { AgendaDailyStats } from './molecules/AgendaDailyStats';
import { FilterBar } from './atoms/FilterBar';
import { Calendar as CalendarIcon } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { events, activeFilter, setFilter, stats } = useAgendaSchedule();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Daftar Agenda */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 text-lg">
            <CalendarIcon className="h-5 w-5 text-cbp-gold" /> 
            {activeFilter === 'All' ? 'Agenda Mendatang' : activeFilter === 'Events' ? 'Jadwal Sidang & Internal' : 'Jadwal Temu Klien'}
          </h2>
          <FilterBar 
            filters={['All', 'Events', 'Bookings']} 
            activeFilter={activeFilter} 
            onFilterChange={setFilter} 
          />
        </div>
        
        {/* Table View */}
        {events.length > 0 ? (
          <AgendaTable events={events} />
        ) : (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            <p>Tidak ada agenda untuk filter ini.</p>
          </div>
        )}
      </div>

      {/* Kolom Kanan: Sidebar Widget */}
      <div className="space-y-6">
        <MiniCalendarWidget />
        <AgendaDailyStats 
          consultationCount={stats.consultationCount} 
          hearingCount={stats.hearingCount} 
        />
      </div>
    </div>
  );
};
