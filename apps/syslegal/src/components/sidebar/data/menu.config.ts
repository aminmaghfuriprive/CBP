
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings, 
  Sliders, 
  Briefcase, 
  UserCog, 
  Target, 
  FileText, 
  CreditCard,
  Library
} from 'lucide-react';
import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- COMMON ---
  { 
    label: 'Dashboard', 
    path: '/app', 
    icon: LayoutDashboard, 
    roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'IT', 'FIELD_OPS', 'CLIENT', 'MARKETING'] 
  },
  // --- INTERNAL STAFF ---
  { 
    label: 'Marketing',
    path: '/app/social',
    icon: Target, 
    roles: ['ADMIN', 'PRODUCTION', 'IT', 'FINANCE', 'FIELD_OPS', 'MARKETING'] 
  },
  { 
    label: 'Database Klien', 
    path: '/app/clients',
    matchPaths: ['/app/cases', '/app/documents', '/app/agenda'],
    icon: Users, 
    roles: ['ADMIN', 'PRODUCTION', 'FINANCE', 'FIELD_OPS', 'MARKETING'] 
  },
  { 
    label: 'Layanan', 
    path: '/app/services',
    icon: Briefcase, 
    roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'MARKETING'] 
  },
  {
    label: 'Pustaka Regulasi',
    path: '/app/regulations',
    icon: Library,
    roles: ['ADMIN', 'PRODUCTION', 'MARKETING']
  },
  { 
    label: 'Keuangan', 
    path: '/app/finance', 
    icon: DollarSign, 
    roles: ['ADMIN', 'FINANCE'] 
  },
  { 
    label: 'Pegawai', 
    path: '/app/employees', 
    icon: UserCog, 
    roles: ['ADMIN', 'IT'] 
  },
  { 
    label: 'Konten Website', 
    path: '/app/cms', 
    icon: Settings, 
    roles: ['ADMIN', 'IT', 'MARKETING'] 
  },
  // --- CLIENT PORTAL (In SysLegal) ---
  {
    label: 'Kasus Saya',
    path: '/app/my-cases',
    icon: FileText,
    roles: ['CLIENT']
  },
  {
    label: 'Tagihan Saya',
    path: '/app/my-invoices',
    icon: CreditCard,
    roles: ['CLIENT']
  },
  // --- SETTINGS ---
  { 
    label: 'Pengaturan', 
    path: '/app/settings', 
    icon: Sliders, 
    roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'IT', 'FIELD_OPS', 'CLIENT', 'MARKETING'] 
  },
];
