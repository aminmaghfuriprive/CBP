
import React from 'react';
import Link from 'next/link';
import { CalendarEvent, getEventTypeVariant } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DeadlineMonitorProps {
  deadlines: CalendarEvent[];
}

export const DeadlineMonitor: React.FC<DeadlineMonitorProps> = ({ deadlines }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Deadline Terdekat</h3>
        </div>
        <Link href="/app/agenda" className="text-xs font-bold text-cbp-navy dark:text-cbp-gold hover:underline">
          Lihat Semua
        </Link>
      </div>
      
      <div className="space-y-4 flex-1">
        {deadlines.length > 0 ? deadlines.map(e => (
          <div key={e.id} className="flex gap-4 items-start group p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex-shrink-0 border border-red-100 dark:border-red-900/30">
               <span className="text-sm font-bold">{new Date(e.date).getDate()}</span>
               <span className="text-[9px] uppercase font-bold">{new Date(e.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                 <Badge variant={getEventTypeVariant(e.type)} className="text-[10px] px-1.5 py-0.5">{e.type}</Badge>
                 <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-red-600 transition-colors">{e.title}</p>
              <p className="text-xs text-slate-500 truncate">{e.client}</p>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm h-full flex flex-col justify-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            Tidak ada deadline mendesak.
          </div>
        )}
      </div>
    </Card>
  );
};
