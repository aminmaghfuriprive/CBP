
import React from 'react';
import { CalendarEvent, getEventTypeVariant, formatDateID } from '@cbp/core';
import { X, Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import { Badge, Button } from '@cbp/ui';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <Badge variant={getEventTypeVariant(event.type)} className="mb-2">
              {event.type}
            </Badge>
            <h3 className="font-bold text-xl text-cbp-navy dark:text-white leading-tight">
              {event.title}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-xs font-bold uppercase">
                <Calendar className="h-3.5 w-3.5" /> Tanggal
              </div>
              <p className="font-medium text-slate-900 dark:text-white">
                {formatDateID(event.date, { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-xs font-bold uppercase">
                <Clock className="h-3.5 w-3.5" /> Waktu
              </div>
              <p className="font-medium text-slate-900 dark:text-white font-mono">
                {event.time} WIB
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Klien / Pihak Terkait</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{event.client}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Lokasi</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {event.type === 'Sidang' ? 'Pengadilan Negeri Jakarta Selatan' : 
                   event.type === 'Konsultasi' ? 'Ruang Meeting Lt. 35 / Zoom' : 'Kantor CBP Corp'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">ID Agenda</p>
                <p className="text-sm text-slate-500 font-mono">{event.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-end">
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </div>
      </div>
    </div>
  );
};
