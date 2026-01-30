
export type UserRole = 'ADMIN' | 'PRODUCTION' | 'FINANCE' | 'IT' | 'FIELD_OPS' | 'CLIENT';
export type Division = 'Hukum Umum & Litigasi' | 'Perizinan & Bisnis' | 'Pertanahan & Agraria' | 'Legal Administratif & Korporasi' | 'FIELD' | 'FINANCE' | 'IT' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division?: Division | null;
  avatarUrl?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
}

export type ServiceDivision = 'Hukum Umum & Litigasi' | 'Perizinan & Bisnis' | 'Pertanahan & Agraria' | 'Legal Administratif & Korporasi';

export interface ServiceStep {
  id: string;
  phase: string;
  task: string;
  estimatedDays: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  division: ServiceDivision;
  basePrice: number;
  isActive: boolean;
  iconName: string;
  sop?: ServiceStep[];
}

export interface ClientData {
  id: string;
  name: string;
  contact: string;
  industry: string;
  email?: string;
  address?: string;
}

export interface CaseData {
  id: string;
  clientName: string;
  caseType: string;
  division: string;
  status: 'Aktif' | 'Menunggu' | 'Selesai';
  currentStage: string;
  lastUpdate: string;
  description: string;
}

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

export interface DocumentFile {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  size: string;
  category: string;
  lastModified: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
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

export type ChannelType = 'WHATSAPP' | 'EMAIL';

export interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  channel: ChannelType;
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'agent' | 'user';
  timestamp: string;
  isRead: boolean;
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

export interface PayrollSlip {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Draft' | 'Paid';
  paymentDate?: string;
}

export interface RoleConfig {
  id: string;
  roleCode: UserRole;
  label: string;
  description: string;
  permissions: string[];
  memberCount?: number;
}

export interface PermissionGroup {
  category: string;
  items: { key: string; label: string }[];
}

export type SocialPlatform = 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string;
  followers: number;
  isConnected: boolean;
  lastSync: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platforms: SocialPlatform[];
  date: string;
  likes: number;
  shares: number;
  status: 'Draft' | 'Published' | 'Scheduled';
}

// GBP Types
export interface GBPLocation {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewsCount: number;
  stats: {
    views: number;
    calls: number;
    directions: number;
    websiteClicks: number;
  };
  isConnected: boolean;
}

export interface GBPReview {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
  replyDate?: string;
}

export interface GBPUpdate {
  id: string;
  content: string;
  type: 'UPDATE' | 'EVENT' | 'OFFER';
  date: string;
  status: 'LIVE' | 'PENDING';
  views: number;
  clicks: number;
  imageUrl?: string;
}

// Ayrshare Types
export interface AyrshareConfig {
  id: string;
  apiKey: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface AyrshareProfile {
  title: string;
  refId: string;
  platform: string;
  username: string;
  avatarUrl?: string;
}

export type HeaderLayout = 'left' | 'center' | 'right' | 'split';

export interface DocumentTemplate {
  id: string;
  type: 'LETTERHEAD' | 'ENVELOPE';
  name: string;
  companyName: string;
  addressLine1: string;
  addressLine2?: string;
  contactInfo: string;
  website: string;
  layout: HeaderLayout;
  isActive: boolean;
  accentColor?: string;
  logoUrl?: string;
  fontFamily?: string;
}
