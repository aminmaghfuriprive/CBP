
export interface ServiceStep {
  id: string;
  phase: string; // e.g., "Persiapan", "Eksekusi", "Finalisasi"
  task: string;
  estimatedDays: number;
}

// 1. Definisi Strict untuk 4 Divisi Layanan Publik
export type ServiceDivision = 
  | 'Hukum Umum & Litigasi' 
  | 'Perizinan & Bisnis' 
  | 'Pertanahan & Agraria' 
  | 'Legal Administratif & Korporasi';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  division: ServiceDivision; // Menggunakan tipe strict
  basePrice?: number;
  isActive?: boolean;
  sop?: ServiceStep[];
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
  division: string;
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

export type UserRole = 
  | 'ADMIN'         
  | 'PRODUCTION'    
  | 'FIELD_OPS'     
  | 'FINANCE'       
  | 'IT'            
  | 'CLIENT';       

// Union type untuk semua divisi (Internal + Eksternal)
export type Division = 
  | ServiceDivision
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

export interface ClientData {
  id: string;
  name: string;
  industry: string;
  contact: string;
  email: string;
  address?: string;
}

// Omnichannel Types
export type ChannelType = 'WHATSAPP' | 'EMAIL';

export interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  channel: ChannelType;
  tags?: string[]; // e.g. 'Client', 'Prospect'
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'user' | 'agent'; // user = client, agent = kita
  timestamp: string;
  isRead: boolean;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:mm
  checkOut?: string; // HH:mm
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
  notes?: string;
}

// Payroll Types
export interface PayrollSlip {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string; // e.g., "Oktober 2023"
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Draft' | 'Paid';
  paymentDate?: string;
}

// Role & Permission Types
export interface RoleConfig {
  id: string;
  roleCode: UserRole;
  label: string;
  description: string;
  permissions: string[]; // e.g., 'case.view', 'finance.edit'
  memberCount?: number;
}

export interface PermissionNode {
  key: string;
  label: string;
}

export interface PermissionGroup {
  category: string;
  items: PermissionNode[];
}
