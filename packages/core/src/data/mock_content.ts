import { Article, DocumentFile } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Migrasi OSS 1.1 ke OSS RBA: Apa yang Perlu Diketahui?',
    category: 'Perizinan',
    date: '28 Okt 2023',
    excerpt: 'Panduan lengkap bagi pelaku usaha untuk menyesuaikan data perizinan di sistem terbaru.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a2',
    title: 'Prosedur Penaikan Status HGB Menjadi Hak Milik',
    category: 'Pertanahan',
    date: '15 Okt 2023',
    excerpt: 'Keuntungan memiliki Sertifikat Hak Milik dan langkah hukum pengurusannya di BPN.',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'a3',
    title: 'Pentingnya Pendaftaran Merek bagi UMKM',
    category: 'HAKI',
    date: '10 Okt 2023',
    excerpt: 'Lindungi brand bisnis Anda dari pembajakan dengan legalitas kekayaan intelektual.',
    imageUrl: 'https://images.unsplash.com/photo-1621623722709-a47734138b09?auto=format&fit=crop&q=80&w=600'
  }
];

export const DOCUMENTS: DocumentFile[] = [
  { id: 'd1', name: 'Draft Akta Pendirian PT.pdf', type: 'PDF', size: '2.4 MB', category: 'Kontrak', lastModified: '2023-10-27' },
  { id: 'd2', name: 'Somasi Pertama - Kasus 002.docx', type: 'DOCX', size: '156 KB', category: 'Litigasi', lastModified: '2023-10-25' },
  { id: 'd3', name: 'Bukti Bayar PNBP.pdf', type: 'PDF', size: '1.1 MB', category: 'Bukti', lastModified: '2023-10-24' },
  { id: 'd4', name: 'Rekap Arus Kas Oktober.xlsx', type: 'XLSX', size: '4.5 MB', category: 'Audit', lastModified: '2023-10-20' }
];