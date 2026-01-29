
import { Lawyer, User } from '../types';

// Untuk Tampilan di Website (Public Team)
export const TEAM: Lawyer[] = [
  {
    id: 'team_founder',
    name: 'Dr. Christian Bagoes Prasetyo, S.H., M.Kn, CLA, CCD',
    role: 'Founder / Pimpinan',
    specialty: 'Master of Notary & Corporate Law',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'team_fin',
    name: 'Clara Septia Maharani',
    role: 'Staff Keuangan',
    specialty: 'Finance & Tax',
    imageUrl: 'https://images.unsplash.com/photo-1573496359-136d475583dc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'team_prod1',
    name: 'Saumita Ngesti Ramadanti, S.H.',
    role: 'Staff Produksi',
    specialty: 'Divisi Law Firm',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'team_prod2',
    name: 'Yevita Nur Sholihah, S.H.',
    role: 'Staff Produksi',
    specialty: 'Divisi Sahabat Ijinku',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400'
  }
];

// Untuk Login System (Auth Mock)
export const MOCK_USERS_DB: User[] = [
  {
    id: 'u_admin',
    name: 'Dr. Christian Bagoes P.',
    email: 'admin@cbp.id',
    role: 'SUPER_ADMIN',
    division: null,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'u_finance',
    name: 'Clara Septia M.',
    email: 'finance@cbp.id',
    role: 'FINANCE',
    division: 'FINANCE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359-136d475583dc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'u_legal_1',
    name: 'Saumita Ngesti R., S.H.',
    email: 'legal@cbp.id',
    role: 'LEGAL_STAFF',
    division: 'CHRISTIAN_LAW_FIRM',
  },
  {
    id: 'u_it',
    name: 'Jamiun Mukromin',
    email: 'it@cbp.id',
    role: 'IT_ADMIN',
    division: 'IT',
  },
  {
    id: 'u_client',
    name: 'Bpk. Budi Santoso',
    email: 'client@gmail.com',
    role: 'CLIENT',
    division: null,
  }
];

export const CLIENTS = [
  { id: 'cl_01', name: 'PT. Maju Sejahtera', industry: 'Manufaktur', contact: 'Bpk. Budi', email: 'budi@maju.com' },
  { id: 'cl_02', name: 'Bpk. Hartono', industry: 'Individual', contact: 'Hartono', email: 'hartono@gmail.com' },
  { id: 'cl_03', name: 'CV. Kuliner Nusantara', industry: 'F&B', contact: 'Ibu Dian', email: 'dian@kuliner.id' },
  { id: 'cl_04', name: 'Ibu Ratna Sari', industry: 'Individual', contact: 'Ratna', email: 'ratna@yahoo.com' }
];
