"use client";

import { useState } from 'react';
import { Booking } from '../types';
import { MOCK_BOOKINGS } from '../data/mock_calendar';
import { useNotifications } from '../context/NotificationContext';

export const useBookingLogic = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const { addNotification } = useNotifications();

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    if (status === 'Rejected') {
      addNotification('Booking Ditolak', 'Status booking telah diperbarui.', 'info');
    }
  };

  return { bookings, updateBookingStatus };
};