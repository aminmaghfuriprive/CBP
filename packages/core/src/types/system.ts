
export interface DocumentFile {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'JPG' | 'PNG';
  size: string;
  category: string;
  lastModified: string;
  uploadedBy?: 'Client' | 'Internal'; 
  relatedCaseId?: string;
  status?: 'Pending' | 'Approved' | 'Rejected'; 
  rejectionReason?: string; 
}

export type HeaderLayout = 'left' | 'center' | 'right' | 'split';
export type DesignStyle = 'SIMPLE' | 'GEOMETRIC';

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
  designStyle?: DesignStyle;
  isActive: boolean;
  accentColor?: string;
  logoUrl?: string;
  fontFamily?: string;
}
