
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

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceDivision;
  clientIndustry: string;
  year: string;
  challenge: string;
  solution: string;
  result: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
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
