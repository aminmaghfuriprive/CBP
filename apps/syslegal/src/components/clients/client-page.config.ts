
import { Users, FileText, FolderOpen, Calendar, ShieldCheck, LucideIcon } from 'lucide-react';

export type TabView = 'clients' | 'cases' | 'agenda' | 'documents' | 'verification';

export interface TabConfig {
  id: TabView;
  label: string;
  icon: LucideIcon;
  hasBadge?: boolean; // Menandakan tab ini butuh indikator angka (e.g. pending items)
}

export const CLIENT_PAGE_TABS: TabConfig[] = [
  { 
    id: 'clients', 
    label: 'Direktori Klien', 
    icon: Users 
  },
  { 
    id: 'cases', 
    label: 'Semua Kasus', 
    icon: FileText 
  },
  { 
    id: 'agenda', 
    label: 'Agenda & Sidang', 
    icon: Calendar 
  },
  { 
    id: 'verification', 
    label: 'Validasi Berkas', 
    icon: ShieldCheck,
    hasBadge: true 
  },
  { 
    id: 'documents', 
    label: 'Repository Dokumen', 
    icon: FolderOpen 
  },
];
