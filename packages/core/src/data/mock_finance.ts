
import { Invoice } from '../types';

export const MOCK_INVOICES: Invoice[] = [
  { 
    id: 'INV-2023-001', 
    clientName: 'PT. Maju Sejahtera', 
    amount: 5000000, 
    status: 'Paid', 
    issueDate: '2023-10-01', 
    dueDate: '2023-10-15', 
    description: 'Jasa Pendirian PT' 
  },
  { 
    id: 'INV-2023-002', 
    clientName: 'Bpk. Hartono', 
    amount: 15000000, 
    status: 'Overdue', 
    issueDate: '2023-10-05', 
    dueDate: '2023-10-19', 
    description: 'Retainer Fee Litigasi' 
  },
  { 
    id: 'INV-2023-003', 
    clientName: 'CV. Kuliner Nusantara', 
    amount: 2500000, 
    status: 'Unpaid', 
    issueDate: '2023-10-25', 
    dueDate: '2023-11-08', 
    description: 'Pendaftaran Merek' 
  },
  // Data Baru untuk Demo User (Budi Santoso)
  { 
    id: 'INV-DEMO-001', 
    clientName: 'Bpk. Budi Santoso', 
    amount: 7500000, 
    status: 'Unpaid', 
    issueDate: '2023-10-28', 
    dueDate: '2023-11-05', 
    description: 'Biaya Jasa Konsultasi & Drafting Kontrak Kerjasama' 
  },
  { 
    id: 'INV-DEMO-002', 
    clientName: 'Bpk. Budi Santoso', 
    amount: 1500000, 
    status: 'Paid', 
    issueDate: '2023-10-01', 
    dueDate: '2023-10-10', 
    description: 'Retainer Fee Bulan Oktober' 
  }
];
