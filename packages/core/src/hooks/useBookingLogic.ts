
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { Booking } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useBookingLogic = () => {
  const bookings = useLiveQuery(() => db.bookings.orderBy('date').reverse().toArray()) || [];
  const { addNotification } = useNotifications();

  const addBooking = async (booking: Booking) => {
    try {
      await db.bookings.add(booking);
      addNotification('Booking Diterima', 'Permintaan jadwal berhasil dikirim.', 'success');
    } catch (error) {
      console.error(error);
      addNotification('Error', 'Gagal mengirim booking.', 'warning');
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await db.bookings.update(id, { status });
      if (status === 'Rejected') {
        addNotification('Booking Ditolak', 'Status booking telah diperbarui.', 'info');
      }
    } catch (error) {
      console.error("Gagal update booking:", error);
    }
  };

  return { bookings, addBooking, updateBookingStatus };
};
