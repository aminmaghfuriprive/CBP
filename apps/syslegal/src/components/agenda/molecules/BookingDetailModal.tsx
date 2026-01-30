
import React from 'react';
import { Booking, formatDateID } from '@cbp/core';
import { X, Calendar, Clock, User, Phone, MessageSquare, Briefcase } from 'lucide-react';
import { Button, StatusBadge } from '@cbp/ui';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ 
  isOpen, onClose, booking, onAccept, onReject 
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-xl text-cbp-navy dark:text-white">Detail Permintaan</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Status Booking</p>
              <StatusBadge status={booking.status} />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">ID Booking</p>
              <p className="font-mono text-sm text-slate-700 dark:text-slate-300">{booking.id}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <User className="h-3.5 w-3.5" /> Nama Klien
                </label>
                <p className="font-medium text-slate-900 dark:text-white">{booking.clientName}</p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <Phone className="h-3.5 w-3.5" /> Kontak
                </label>
                <p className="font-medium text-slate-900 dark:text-white font-mono">{booking.contact}</p>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                <Briefcase className="h-3.5 w-3.5" /> Layanan Diminta
              </label>
              <p className="font-medium text-slate-900 dark:text-white">{booking.serviceType}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <Calendar className="h-3.5 w-3.5" /> Tanggal Request
                </label>
                <p className="font-medium text-slate-900 dark:text-white">
                  {formatDateID(booking.date, { dateStyle: 'long' })}
                </p>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <Clock className="h-3.5 w-3.5" /> Jam
                </label>
                <p className="font-medium text-slate-900 dark:text-white font-mono">{booking.time} WIB</p>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                <MessageSquare className="h-3.5 w-3.5" /> Pesan / Catatan
              </label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 italic">
                "{booking.notes}"
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Tutup</Button>
          {booking.status === 'Pending' && (
            <>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                onClick={() => { onReject(booking.id); onClose(); }}
              >
                Tolak
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white border-transparent"
                onClick={() => { onAccept(booking.id); onClose(); }}
              >
                Terima Booking
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
