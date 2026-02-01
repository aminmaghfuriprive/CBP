
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  contact: string; // Phone/WA
  email?: string;
  interest: string; // Service type
  source: 'Website' | 'Social Media' | 'Referral';
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  address?: string; // Captured from form
}
