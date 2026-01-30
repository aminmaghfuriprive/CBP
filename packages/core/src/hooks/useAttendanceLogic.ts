
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { AttendanceRecord, User } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useAttendanceLogic = (user: User | null) => {
  const { addNotification } = useNotifications();
  const today = new Date().toISOString().split('T')[0];

  // Get all attendance records sorted by date descending
  // Fail-safe: jika db.attendance belum ada (race condition), return empty array
  const attendanceHistory = useLiveQuery(() => {
    if (!db.attendance) return [];
    return db.attendance.orderBy('date').reverse().toArray();
  }) || [];

  // Get today's record for current user
  const todayRecord = useLiveQuery(async () => {
    if (!user || !db.attendance) return undefined;
    
    try {
      return await db.attendance
        .where('userId')
        .equals(user.id)
        .filter(r => r.date === today)
        .first();
    } catch (e) {
      console.warn("Attendance DB query failed:", e);
      return undefined;
    }
  }, [user, today]);

  const clockIn = async () => {
    if (!user) {
      addNotification('Gagal', 'User tidak teridentifikasi.', 'warning');
      return;
    }
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const hour = now.getHours();
    
    // Logic sederhana: Telat jika > jam 9 pagi
    const status = hour >= 9 ? 'Late' : 'Present';

    const record: AttendanceRecord = {
      id: `att_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      date: today,
      checkIn: timeString,
      status: status
    };

    try {
      await db.attendance.add(record);
      addNotification('Absen Masuk', `Anda berhasil absen masuk pukul ${timeString}.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Terjadi kesalahan saat absen.', 'warning');
    }
  };

  const clockOut = async () => {
    if (!todayRecord) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    try {
      await db.attendance.update(todayRecord.id, { checkOut: timeString });
      addNotification('Absen Pulang', `Sampai jumpa! Anda absen pulang pukul ${timeString}.`, 'info');
    } catch (error) {
      addNotification('Gagal', 'Terjadi kesalahan saat absen pulang.', 'warning');
    }
  };

  return { attendanceHistory, todayRecord, clockIn, clockOut };
};
