
import React from 'react';
import { Booking, formatDateID } from '@cbp/core';
import { Card, Button, StatusBadge } from '@cbp/ui';
import { Check, X, Phone, MessageSquare, Eye } from 'lucide-react';

interface BookingTableProps {
  bookings: Booking[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onDetail: (id: string) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, onAccept, onReject, onDetail 
}) => {
  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Waktu Request</th>
              <th className="px-6 py-4 font-bold">Klien</th>
              <th className="px-6 py-4 font-bold">Layanan</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-700 dark:text-slate-300">
                    {formatDateID(booking.date, { day: 'numeric', month: 'short' })}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">{booking.time} WIB</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-cbp-navy dark:text-white">{booking.clientName}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <Phone className="h-3 w-3" /> {booking.contact}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-700 dark:text-slate-300 truncate max-w-[200px]" title={booking.serviceType}>
                    {booking.serviceType}
                  </div>
                  {booking.notes && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 italic truncate max-w-[200px]">
                      <MessageSquare className="h-3 w-3" /> {booking.notes}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {booking.status === 'Pending' ? (
                      <>
                        <button 
                          onClick={() => onAccept(booking.id)}
                          className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                          title="Terima"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => onReject(booking.id)}
                          className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                          title="Tolak"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => onDetail(booking.id)} className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
