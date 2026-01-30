
import React from 'react';
import { Booking, getDayFromDate, getMonthShortID } from '@cbp/core';
import { Card, Button, StatusBadge } from '@cbp/ui';
import { Check, X, CalendarDays, Phone, MessageSquare } from 'lucide-react';

interface BookingRequestCardProps {
  booking: Booking;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onDetail: (id: string) => void;
}

export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({ 
  booking, 
  onAccept, 
  onReject,
  onDetail
}) => {
  return (
    <Card className="flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      {/* Date Column */}
      <div className="flex-shrink-0 flex flex-row md:flex-col items-center justify-center md:w-28 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-800">
        <CalendarDays className="h-5 w-5 text-cbp-gold mb-1 hidden md:block" />
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
            {getMonthShortID(booking.date)}
          </div>
          <div className="text-2xl font-bold text-cbp-navy dark:text-white">
            {getDayFromDate(booking.date)}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1">
            {booking.time}
          </div>
        </div>
      </div>

      {/* Info Column */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-cbp-navy dark:text-white">{booking.clientName}</h3>
            <p className="text-sm text-cbp-gold font-medium">{booking.serviceType}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700">
            <Phone className="h-3 w-3" /> {booking.contact}
          </span>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md mt-3 border border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-2">
            <MessageSquare className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600 dark:text-slate-300 italic line-clamp-2">"{booking.notes}"</p>
          </div>
        </div>
      </div>

      {/* Actions Column */}
      <div className="flex md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
        {booking.status === 'Pending' && (
          <>
            <Button 
              onClick={() => onAccept(booking.id)}
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white w-full border-transparent justify-center"
            >
              <Check className="h-4 w-4 mr-1" /> Terima
            </Button>
            <Button 
              onClick={() => onReject(booking.id)}
              size="sm" 
              variant="outline" 
              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/10 w-full justify-center"
            >
              <X className="h-4 w-4 mr-1" /> Tolak
            </Button>
          </>
        )}
        {booking.status === 'Confirmed' && (
          <Button size="sm" variant="secondary" className="w-full justify-center text-xs">
            Reschedule
          </Button>
        )}
        <Button 
          onClick={() => onDetail(booking.id)} 
          size="sm" 
          variant="ghost" 
          className="text-xs w-full justify-center"
        >
          Detail
        </Button>
      </div>
    </Card>
  );
};
