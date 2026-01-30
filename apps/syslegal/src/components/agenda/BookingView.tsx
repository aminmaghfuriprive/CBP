
"use client";

import React from 'react';
import { useBookingManager } from '@cbp/core';
import { BookingTable } from './molecules/BookingTable';
import { FilterBar } from './atoms/FilterBar';
import { Filter } from 'lucide-react';

export const BookingView: React.FC = () => {
  const { bookings, activeFilter, setFilter, actions } = useBookingManager();

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex justify-end mb-4">
        <FilterBar 
          filters={['All', 'Pending', 'Confirmed', 'Rejected']} 
          activeFilter={activeFilter} 
          onFilterChange={setFilter}
        />
      </div>

      {/* Booking Table */}
      {bookings.length > 0 ? (
        <BookingTable 
          bookings={bookings}
          onAccept={actions.accept}
          onReject={actions.reject}
          onDetail={actions.viewDetail}
        />
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 mb-4">
            <Filter className="h-6 w-6 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">Tidak ada booking dengan status ini.</p>
        </div>
      )}
    </div>
  );
};
