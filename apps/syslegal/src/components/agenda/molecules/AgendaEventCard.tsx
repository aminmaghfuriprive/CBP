
import React from 'react';
import { CalendarEvent, getEventTypeVariant, getDayFromDate, getMonthYearID } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { Clock, MapPin, Video } from 'lucide-react';

interface AgendaEventCardProps {
  event: CalendarEvent;
}

export const AgendaEventCard: React.FC<AgendaEventCardProps> = ({ event }) => {
  return (
    <Card className="hover:shadow-md transition-shadow flex flex-col sm:flex-row bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 group" padding={false}>
      <div className="sm:w-32 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 p-4 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
        <span className="text-3xl font-bold text-cbp-navy dark:text-white">
          {getDayFromDate(event.date)}
        </span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">
          {getMonthYearID(event.date)}
        </span>
      </div>
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={getEventTypeVariant(event.type)}>{event.type}</Badge>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">ID: {event.id}</span>
        </div>
        
        <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1 group-hover:text-cbp-gold transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{event.client}</p>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-400" /> {event.time}
          </div>
          <div className="flex items-center gap-1.5">
            {event.type === 'Konsultasi' ? <Video className="h-4 w-4 text-slate-400" /> : <MapPin className="h-4 w-4 text-slate-400" />}
            <span>{event.type === 'Konsultasi' ? 'Online / Kantor' : 'Pengadilan / Luar Kantor'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
