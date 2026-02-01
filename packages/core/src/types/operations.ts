
export interface Booking {
  id: string;
  clientName: string;
  contact: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  notes: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Sidang' | 'Meeting' | 'Konsultasi' | 'Deadline';
  client: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
}
