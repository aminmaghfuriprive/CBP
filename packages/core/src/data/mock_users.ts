
import { Lawyer, User } from '../types';

// Untuk Tampilan di Website (Public Team)
export const TEAM: Lawyer[] = [
  {
    id: 'team_founder',
    name: 'Dr. Christian Bagoes Prasetyo',
    role: 'Founder & Managing Partner',
    specialty: 'S.H., M.Kn., CLA, CCD',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600'
  },
  // --- STAF AHLI (KEPALA DIVISI) ---
  {
    id: 'prod_1',
    name: 'Saumita Ngesti Ramadanti, S.H.',
    role: 'Staff Produksi',
    specialty: 'Divisi Hukum Umum & Litigasi',
    imageUrl: 'https://images.unsplash.com/photo-1573496359-136d475583dc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod_2',
    name: 'Yevita Nur Sholihah, S.H.',
    role: 'Staff Perizinan',
    specialty: 'Divisi Perizinan & Bisnis',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod_4',
    name: 'Khrisna Wijayanti, S.H.',
    role: 'Staff Agraria',
    specialty: 'Divisi Pertanahan & Agraria',
    imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod_3',
    name: 'Izatil Khoiriyah, S.H.',
    role: 'Staff Korporasi',
    specialty: 'Divisi Legal Administratif & Korporasi',
    imageUrl: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f64?auto=format&fit=crop&q=80&w=400'
  },
  // --- TIM PENDUKUNG ---
  {
    id: 'supp_fin',
    name: 'Clara Septia Maharani',
    role: 'Staff Keuangan',
    specialty: 'Finance & Accounting',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'supp_it',
    name: 'Jamiun Mukromin, S.Kom',
    role: 'Staff IT & Developer',
    specialty: 'Technology & System',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'supp_mkt_1',
    name: 'Karina Putri',
    role: 'Staff Marketing',
    specialty: 'Digital Marketing & PR',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'supp_mkt_2',
    name: 'Dimas Anggara',
    role: 'Staff Marketing',
    specialty: 'Client Relations & Sales',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'supp_field',
    name: 'Imam Nurrohman',
    role: 'Staff Lapangan',
    specialty: 'General Affair & Operasional',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  }
];

// Untuk Login System (Auth Mock)
export const MOCK_USERS_DB: User[] = [
  {
    id: 'u_admin',
    name: 'Dr. Christian Bagoes P.',
    email: 'admin@cbp.id',
    role: 'ADMIN',
    division: null,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'u_prod',
    name: 'Saumita Ngesti R., S.H.',
    email: 'produksi@cbp.id',
    role: 'PRODUCTION',
    division: 'Hukum Umum & Litigasi',
  },
  {
    id: 'u_field',
    name: 'Imam Nurrohman',
    email: 'lapangan@cbp.id',
    role: 'FIELD_OPS',
    division: 'FIELD',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'u_finance',
    name: 'Clara Septia M.',
    email: 'finance@cbp.id',
    role: 'FINANCE',
    division: 'FINANCE',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'u_it',
    name: 'Jamiun Mukromin',
    email: 'it@cbp.id',
    role: 'IT',
    division: 'IT',
  },
  // Klien Demo
  {
    id: 'u_client',
    name: 'Bpk. Budi Santoso',
    email: 'budi@demo.com', // Updated for consistency
    role: 'CLIENT',
    division: null,
  }
];

export const CLIENTS = [
  { id: 'cl_01', name: 'PT. Maju Sejahtera', industry: 'Manufaktur', contact: 'Bpk. Budi', email: 'budi@maju.com' },
  { id: 'cl_02', name: 'Bpk. Hartono', industry: 'Individual', contact: 'Hartono', email: 'hartono@gmail.com' },
  { id: 'cl_03', name: 'CV. Kuliner Nusantara', industry: 'F&B', contact: 'Ibu Dian', email: 'dian@kuliner.id' },
  { id: 'cl_04', name: 'Ibu Ratna Sari', industry: 'Individual', contact: 'Ratna', email: 'ratna@yahoo.com' },
  // Data Baru untuk Budi Santoso agar muncul di database klien
  { id: 'cl_demo', name: 'Bpk. Budi Santoso', industry: 'Teknologi & Jasa', contact: '081234567890', email: 'budi@demo.com', address: 'Jl. Kemang Raya No. 12, Jakarta Selatan' }
];
