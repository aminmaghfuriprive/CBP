
import { ServiceItem } from '../../types';

export const CORPORATE_SERVICES: ServiceItem[] = [
  {
    id: 'corp_01',
    title: 'Pendirian PT Perorangan',
    description: 'Solusi badan hukum untuk usaha mikro & kecil dengan pendiri tunggal, cepat dan hemat.',
    iconName: 'User',
    division: 'Legal Administratif & Korporasi',
    basePrice: 2500000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Registrasi', task: 'Pencetakan Sertifikat PT', estimatedDays: 1 }]
  },
  {
    id: 'corp_02',
    title: 'Pendirian PT Umum',
    description: 'Pembuatan Perseroan Terbatas biasa dengan Akta Notaris dan SK Kemenkumham.',
    iconName: 'Building2',
    division: 'Legal Administratif & Korporasi',
    basePrice: 6500000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Akta', task: 'Tanda tangan minuta akta', estimatedDays: 3 }]
  },
  {
    id: 'corp_03',
    title: 'Pendirian CV (Persekutuan Komanditer)',
    description: 'Badan usaha alternatif yang lebih sederhana untuk bisnis skala menengah.',
    iconName: 'Briefcase',
    division: 'Legal Administratif & Korporasi',
    basePrice: 4500000,
    isActive: true
  },
  {
    id: 'corp_04',
    title: 'Pendirian Yayasan',
    description: 'Badan hukum untuk kegiatan sosial, keagamaan, dan kemanusiaan.',
    iconName: 'Heart',
    division: 'Legal Administratif & Korporasi',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 'corp_05',
    title: 'Pendirian Perkumpulan/Komunitas',
    description: 'Legalisasi badan hukum untuk organisasi massa, komunitas hobi, atau perkumpulan profesi.',
    iconName: 'Users',
    division: 'Legal Administratif & Korporasi',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 'corp_06',
    title: 'Pendirian Koperasi',
    description: 'Badan usaha berbasis anggota dengan asas kekeluargaan.',
    iconName: 'Sprout',
    division: 'Legal Administratif & Korporasi',
    basePrice: 6000000,
    isActive: true
  },
  {
    id: 'corp_07',
    title: 'Pembuatan Draft Perjanjian (Contract Drafting)',
    description: 'Penyusunan kontrak bisnis yang aman dan melindungi kepentingan klien.',
    iconName: 'PenTool',
    division: 'Legal Administratif & Korporasi',
    basePrice: 2000000,
    isActive: true
  },
  {
    id: 'corp_08',
    title: 'Perjanjian Kerjasama & Investasi',
    description: 'Legal drafting untuk MoU, Shareholder Agreement, dan perjanjian penanaman modal.',
    iconName: 'Handshake',
    division: 'Legal Administratif & Korporasi',
    basePrice: 3500000,
    isActive: true
  },
  {
    id: 'corp_09',
    title: 'Pembuatan AD/ART Organisasi',
    description: 'Penyusunan Anggaran Dasar dan Anggaran Rumah Tangga yang baku untuk organisasi/perusahaan.',
    iconName: 'BookOpen',
    division: 'Legal Administratif & Korporasi',
    basePrice: 3000000,
    isActive: true
  }
];
