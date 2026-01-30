
import React from 'react';
import { CalendarEvent, getEventTypeVariant, formatDateID } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { MapPin, Video } from 'lucide-react';

interface AgendaTableProps {
  events: CalendarEvent[];
}

export const AgendaTable: React.FC<AgendaTableProps> = ({ events }) => {
  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Tanggal</th>
              <th className="px-6 py-4 font-bold">Jam</th>
              <th className="px-6 py-4 font-bold">Kegiatan</th>
              <th className="px-6 py-4 font-bold">Klien</th>
              <th className="px-6 py-4 font-bold text-right">Tipe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {formatDateID(event.date, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">
                  {event.time}
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-cbp-navy dark:text-white mb-0.5">{event.title}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    {event.type === 'Konsultasi' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                    {event.type === 'Konsultasi' ? 'Online / Kantor' : 'Lokasi Eksternal'}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {event.client}
                </td>
                <td className="px-6 py-4 text-right">
                  <Badge variant={getEventTypeVariant(event.type)}>{event.type}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
