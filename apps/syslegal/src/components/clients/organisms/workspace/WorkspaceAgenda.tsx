
import React from 'react';
import { CalendarEvent } from '@cbp/core';
import { AgendaTable } from '../../../agenda/molecules/AgendaTable';

interface WorkspaceAgendaProps {
  events: CalendarEvent[];
}

export const WorkspaceAgenda: React.FC<WorkspaceAgendaProps> = ({ events }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Jadwal & Agenda</h3>
      {events.length > 0 ? (
        <AgendaTable events={events} />
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500">
          Tidak ada agenda tercatat untuk klien ini.
        </div>
      )}
    </div>
  );
};
