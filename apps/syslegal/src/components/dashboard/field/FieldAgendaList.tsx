
import React from 'react';
import { CalendarEvent, getEventTypeVariant } from '@cbp/core';
import { Badge } from '@cbp/ui';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

interface FieldAgendaListProps {
  events: CalendarEvent[];
}

export const FieldAgendaList: React.FC<FieldAgendaListProps> = ({ events }) => {
  return (
    <div className="px-1 space-y-4">
      <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wide">
          <MapPin className="h-4 w-4 text-cbp-gold" />
          Agenda & Rute
      </h3>
      {events.length > 0 ? (
          <div className="space-y-3">
            {events.map(e => (
              <div key={e.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex gap-4">
                  <div className="flex flex-col items-center justify-center w-16 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                    <span className="font-bold text-cbp-navy dark:text-white text-lg">{e.time.split(':')[0]}</span>
                    <span className="text-xs text-slate-400">{e.time.split(':')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{e.title}</h4>
                      <Badge variant={getEventTypeVariant(e.type)} className="text-[10px] px-1.5 py-0.5">{e.type}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">{e.client}</p>
                    <div className="flex gap-2">
                        <button className="flex-1 text-[10px] bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy px-3 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                          <Navigation className="h-3 w-3" /> Buka Maps
                        </button>
                        <button className="flex-1 text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-3 py-2 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          Detail
                        </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
      ) : (
          <div className="text-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-dashed border border-slate-300 dark:border-slate-700">
              <CheckCircle className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-medium">Tidak ada agenda mendesak.</p>
          </div>
      )}
    </div>
  );
};
