import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { Card, Badge, Button } from '@cbp/ui';
import { Check, X, CalendarDays, Filter, MessageSquare, Phone } from 'lucide-react';

export const BookingManagement: React.FC = () => {
  const { bookings, updateBookingStatus } = useData();
  const [filter, setFilter] = useState('All');

  const filteredBookings = bookings.filter(b => 
    filter === 'All' || b.status === filter
  );

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      case 'Done': return 'neutral';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Manajemen Booking</h1>
          <p className="text-slate-500 dark:text-slate-400">Kelola permintaan konsultasi dan janji temu klien.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-1">
           {['All', 'Pending', 'Confirmed', 'Done'].map((status) => (
             <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm rounded-md transition-all font-medium ${
                  filter === status 
                    ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
             >
               {status === 'All' ? 'Semua' : status}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              {/* Date Column */}
              <div className="flex-shrink-0 flex flex-row md:flex-col items-center justify-center md:w-28 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-800">
                <CalendarDays className="h-5 w-5 text-cbp-gold mb-1 hidden md:block" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{new Date(booking.date).toLocaleString('id-ID', { month: 'short' })}</div>
                  <div className="text-2xl font-bold text-cbp-navy dark:text-white">{new Date(booking.date).getDate()}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">{booking.time}</div>
                </div>
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-cbp-navy dark:text-white">{booking.clientName}</h3>
                    <p className="text-sm text-cbp-gold font-medium">{booking.serviceType}</p>
                  </div>
                  <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {booking.contact}</span>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md mt-3 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{booking.notes}"</p>
                  </div>
                </div>
              </div>

              {/* Actions Column */}
              <div className="flex md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                {booking.status === 'Pending' && (
                  <>
                    <Button 
                      onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white w-full border-transparent"
                    >
                      <Check className="h-4 w-4 mr-1" /> Terima
                    </Button>
                    <Button 
                      onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/10 w-full"
                    >
                      <X className="h-4 w-4 mr-1" /> Tolak
                    </Button>
                  </>
                )}
                {booking.status === 'Confirmed' && (
                  <Button size="sm" variant="secondary" className="w-full">
                    Reschedule
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-xs w-full">Detail</Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 border-dashed">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 mb-4">
              <Filter className="h-6 w-6 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400">Tidak ada booking dengan status ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};