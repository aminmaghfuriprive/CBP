
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  division: 'Christian Law Firm' | 'Sahabat Ijinku' | 'CBP Legal Service';
  basePrice?: number; // Tambahan untuk manajemen harga
  isActive?: boolean; // Tambahan untuk enable/disable layanan
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
}

export type CaseStage = 
  | '1_permintaan_awal'
  | '2_konflik_check'
  | '3_konsultasi'
  | '4_penawaran'
  | '5_verifikasi_dok'
  | '6_klasifikasi'
  | '7_buka_file'
  | '8_produksi'
  | '9_review_internal'
  | '10_monitoring'
  | '11_notifikasi_akhir'
  | '12_penagihan_akhir'
  | '13_pengembalian_dok'
  | '14_pengarsipan';

export interface CaseData {
  id: string;
  clientName: string;
  caseType: string;
  division: 'Christian Law Firm' | 'Sahabat Ijinku' | 'CBP Legal Service';
  status: 'Aktif' | 'Selesai' | 'Menunggu';
  currentStage: CaseStage;
  lastUpdate: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  size: string;
  category: string;
  lastModified: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Sidang' | 'Meeting' | 'Deadline' | 'Konsultasi';
  client: string;
  isBooking?: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Done';
  notes: string;
  contact: string;
}

export enum AppView {
  WEBSITE = 'WEBSITE',
  DASHBOARD = 'DASHBOARD'
}

// UPDATE: Granular Roles sesuai Request
export type UserRole = 
  | 'ADMIN'         // Super Admin / Owner
  | 'PRODUCTION'    // Staff Legal / Produksi Dokumen (Kantor)
  | 'FIELD_OPS'     // Tim Lapangan (Mobile First)
  | 'FINANCE'       // Keuangan
  | 'IT'            // Teknologi
  | 'CLIENT';       // Klien

export type Division = 
  | 'CHRISTIAN_LAW_FIRM' 
  | 'SAHABAT_IJINKU' 
  | 'CBP_LEGAL_SERVICE' 
  | 'TANAH' 
  | 'FINANCE'
  | 'IT'
  | 'FIELD'
  | null; 

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division: Division;
  avatarUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}
