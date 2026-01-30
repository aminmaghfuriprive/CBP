
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { ScheduleView } from '../../../src/components/agenda/ScheduleView';

export default function AgendaPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader 
        title="Agenda Kerja" 
        subtitle="Pusat pengelolaan jadwal sidang, tugas lapangan, dan agenda konsultasi." 
      />

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ScheduleView />
      </div>
    </div>
  );
}
