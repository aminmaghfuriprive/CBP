import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users } from 'lucide-react';

export const Schedule: React.FC = () => {
  const { events } = useData();
  const [view, setView] = useState<'All' | 'Events' | 'Bookings'>('All');

  const filteredEvents = events.filter(e => {
    if (view === 'All') return true;
    if (view === 'Events') return e.type !== 'Konsultasi';
    if (view === 'Bookings') return e.type === 'Konsultasi';
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'Sidang': return 'danger';
      case 'Meeting': return 'info';
      case 'Konsultasi': return 'success';
      case 'Deadline': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Jadwal & Agenda</h1>
          <p className="text-slate-500 dark:text-slate-400">Timeline gabungan sidang dan konsultasi klien.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-1">
          {['All', 'Events', 'Bookings'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                view === v 
                  ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {v === 'All' ? 'Semua' : v === 'Events' ? 'Internal' : 'Konsultasi'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-cbp-gold" /> 
            {view === 'All' ? 'Agenda Mendatang' : view === 'Events' ? 'Jadwal Sidang & Internal' : 'Jadwal Temu Klien'}
          </h2>
          
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow flex flex-col sm:flex-row bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" padding={false}>
                <div className="sm:w-32 bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 p-4">
                  <span className="text-3xl font-bold text-cbp-navy dark:text-white">{new Date(event.date).getDate()}</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">
                    {new Date(event.date).toLocaleString('id-ID', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">ID: {event.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{event.client}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      {event.type === 'Konsultasi' ? <Video className="h-4 w-4 text-slate-400" /> : <MapPin className="h-4 w-4 text-slate-400" />}
                      {event.type === 'Konsultasi' ? 'Online / Kantor' : 'Pengadilan / Luar Kantor'}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
              Tidak ada agenda untuk filter ini.
            </div>
          )}
        </div>

        {/* Mini Calendar & Quick Stats */}
        <div className="space-y-6">
          <Card padding={false} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="p-4 bg-cbp-navy dark:bg-slate-950 text-white text-center font-bold border-b border-white/10 dark:border-slate-800">
              November 2023
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 dark:text-slate-500 mb-3">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 text-center text-sm gap-y-4 text-slate-700 dark:text-slate-300">
                <div className="text-slate-300 dark:text-slate-700">29</div>
                <div className="text-slate-300 dark:text-slate-700">30</div>
                <div className="text-slate-300 dark:text-slate-700">31</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">1</div>
                <div className="font-bold text-cbp-navy bg-cbp-gold rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-md">2</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">3</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">4</div>
                <div className="text-red-500 font-bold">5</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">6</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">7</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">8</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">9</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">10</div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">11</div>
              </div>
            </div>
          </Card>
          
          <Card className="border-l-4 border-l-cbp-gold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
             <h3 className="font-bold text-cbp-navy dark:text-white mb-4">Ringkasan Hari Ini</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Users className="h-4 w-4" /> Konsultasi</span>
                 <span className="font-bold text-cbp-navy dark:text-white">{events.filter(e => e.type === 'Konsultasi').length}</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                 <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><MapPin className="h-4 w-4" /> Sidang</span>
                 <span className="font-bold text-cbp-navy dark:text-white">{events.filter(e => e.type === 'Sidang').length}</span>
               </div>
               <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
               <p className="text-xs text-slate-500 dark:text-slate-400">Jadwal kosong pukul 13:00 - 15:00.</p>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};