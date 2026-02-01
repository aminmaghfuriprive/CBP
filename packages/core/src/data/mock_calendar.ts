
import { CalendarEvent, Booking } from '../types';

export const EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Sidang Pertama (Perdata)', date: '2023-11-02', time: '09:00', type: 'Sidang', client: 'Bpk. Hartono' },
  { id: 'e2', title: 'Deadline Upload OSS RBA', date: '2023-11-03', time: '13:00', type: 'Deadline', client: 'PT. Maju Sejahtera' },
  { id: 'e3', title: 'Ambil SK BPN', date: '2023-11-05', time: '10:00', type: 'Deadline', client: 'Ibu Ratna Sari' },
  { id: 'e4', title: 'Konsultasi Waris', date: '2023-11-06', time: '10:00', type: 'Konsultasi', client: 'Calon Klien Baru' },
  // Event Demo
  { id: 'e_demo_1', title: 'Meeting Review Kontrak', date: '2023-11-08', time: '14:00', type: 'Meeting', client: 'Bpk. Budi Santoso' }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', clientName: 'Budi Santoso', serviceType: 'Legalitas Usaha (OSS RBA)', date: '2023-11-10', time: '10:00', status: 'Pending', notes: 'Konsultasi pendirian PT baru.', contact: '08123456789' },
  { id: 'b2', clientName: 'Siti Aminah', serviceType: 'Hukum Keluarga & Waris', date: '2023-11-11', time: '14:00', status: 'Confirmed', notes: 'Masalah hak asuh anak.', contact: '08198765432' },
  // Booking Demo yang sudah confirm
  { id: 'b_demo', clientName: 'Bpk. Budi Santoso', serviceType: 'Contract Drafting', date: '2023-10-25', time: '09:00', status: 'Confirmed', notes: 'Review perjanjian kerjasama vendor.', contact: '081234567890' }
];
