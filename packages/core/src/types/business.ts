
export type ServiceDivision = 
  | 'Hukum Umum & Litigasi' 
  | 'Perizinan & Bisnis' 
  | 'Pertanahan & Agraria' 
  | 'Legal Administratif & Korporasi';

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

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  content?: string; // Added field for full HTML content
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  clientIndustry: string;
  year: string;
  challenge: string;
  solution: string;
  result: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  imageUrl: string;
  displayOrder?: number;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
  bio?: string;
  education?: string[];
  expertise?: string[];
}

export interface ClientData {
  id: string;
  name: string;
  contact: string;
  industry: string;
  email?: string;
  address?: string;
}

export type CaseLifecycle = 
  | 'PRE_PRODUCTION'
  | 'PRODUCTION'
  | 'POST_PRODUCTION'
  | 'ARCHIVED';

export interface CaseData {
  id: string;
  clientName: string;
  caseType: string;
  division: string;
  status: 'Aktif' | 'Menunggu' | 'Selesai';
  lifecycle: CaseLifecycle;
  currentStage: string;
  lastUpdate: string;
  description: string;
}
