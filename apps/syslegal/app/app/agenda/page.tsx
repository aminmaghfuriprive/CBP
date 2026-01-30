
"use client";

import React, { useState } from 'react';
import { PageHeader } from '@cbp/ui';
import { CalendarDays, MapPin } from 'lucide-react';
import { ScheduleView } from '../../../src/components/agenda/ScheduleView';
import { BookingView } from '../../../src/components/agenda/BookingView';

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'booking'>('schedule');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader 
        title="Agenda Kerja" 
        subtitle="Pusat pengelolaan jadwal sidang, tugas lapangan, dan booking konsultasi." 
      />

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'schedule' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="h-4 w-4" /> Jadwal & Tugas
          {activeTab === 'schedule' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('booking')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'booking' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CalendarDays className="h-4 w-4" /> Permintaan Booking
          {activeTab === 'booking' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'schedule' && <ScheduleView />}
        {activeTab === 'booking' && <BookingView />}
      </div>
    </div>
  );
}
