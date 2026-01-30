
"use client";

import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export const useBookingManager = () => {
  const { bookings, updateBookingStatus } = useData();
  const [activeFilter, setFilter] = useState('All');

  // Logic 1: Filtering by Status
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => 
      activeFilter === 'All' || b.status === activeFilter
    );
  }, [bookings, activeFilter]);

  // Logic 2: Encapsulated Actions
  const actions = {
    accept: (id: string) => {
      // Wrapper jika ada logic tambahan sebelum update context
      updateBookingStatus(id, 'Confirmed');
    },
    reject: (id: string) => {
      if (confirm('Apakah Anda yakin ingin menolak booking ini?')) {
        updateBookingStatus(id, 'Rejected');
      }
    },
    viewDetail: (id: string) => {
      console.log('Navigasi ke detail booking:', id);
      // Di implementasi real, ini akan trigger router.push atau buka modal
    }
  };

  return {
    bookings: filteredBookings,
    activeFilter,
    setFilter,
    actions
  };
};
