import { ServiceItem, Lawyer, CaseData, Article, DocumentFile, CalendarEvent, Booking, Invoice } from './types';

export const COMPANY_NAME = "CBP Legal Service";
export const TAGLINE = "Solusi Hukum Terintegrasi: Legalitas, Litigasi, & Perizinan";

export const SERVICES: ServiceItem[] = [
  {
    id: 's_law_01',
    title: 'Penanganan Perkara Pidana & Perdata',
    description: 'Pendampingan hukum untuk kasus pidana, wanprestasi, dan gugatan perdata.',
    iconName: 'Scale',
    division: 'Christian Law Firm'
  },
  {
    id: 's_law_02',
    title: 'Hukum Keluarga & Waris',
    description: 'Pengurusan cerai talak/gugat, gugatan harta bersama, dispensasi nikah, dan gugatan waris.',
    iconName: 'Users',
    division: 'Christian Law Firm'
  },
  {
    id: 's_law_03',
    title: 'Somasi & Legal Drafting',
    description: 'Pembuatan surat kuasa, surat peringatan (somasi), dan dokumen hukum lainnya.',
    iconName: 'FileText',
    division: 'Christian Law Firm'
  },
  {
    id: 's_legal_01',
    title: 'Pengurusan Aset & Pertanahan',
    description: 'Penaikan HGB ke HM, Roya, Pengeringan Tanah, dan Pengurusan Tanah Eigendom.',
    iconName: 'Landmark',
    division: 'CBP Legal Service'
  },
  {
    id: 's_legal_02',
    title: 'Perjanjian Bisnis & Investasi',
    description: 'Penyusunan draft perjanjian kerjasama investasi, sewa menyewa, dan jual beli.',
    iconName: 'Handshake',
    division: 'CBP Legal Service'
  },
  {
    id: 's_legal_03',
    title: 'Perizinan Bangunan & Lingkungan',
    description: 'Pengurusan PBG/SLE, dokumen UKL/UPL, dan kajian FPR.',
    iconName: 'Building',
    division: 'CBP Legal Service'
  },
  {
    id: 's_izin_01',
    title: 'Legalitas Usaha (OSS RBA)',
    description: 'Pengurusan NIB, migrasi data OSS 1.1 ke OSS RBA, dan pendirian PT/CV/Yayasan.',
    iconName: 'Briefcase',
    division: 'Sahabat Ijinku'
  },
  {
    id: 's_izin_02',
    title: 'Kekayaan Intelektual (HAKI)',
    description: 'Pendaftaran merek, hak cipta, paten sederhana, dan desain industri.',
    iconName: 'Lightbulb',
    division: 'Sahabat Ijinku'
  },
  {
    id: 's_izin_03',
    title: 'Perizinan Produk',
    description: 'Pendaftaran PIRT, Sertifikat Halal, dan Sertifikat Standar.',
    iconName: 'Award',
    division: 'Sahabat Ijinku'
  }
];

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
  },
  {
    id: 'team_prod3',
    name: 'Izatil Khoiriyah, S.H.',
    role: 'Staff Produksi',
    specialty: 'Divisi Legal',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'team_prod4',
    name: 'Khrisna Wijayanti, S.H.',
    role: 'Staff Produksi',
    specialty: 'Divisi Law Firm Tanah',
    imageUrl: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_CASES: CaseData[] = [
  {
    id: 'case_001',
    clientName: 'PT. Maju Sejahtera',
    caseType: 'Pendirian PT Perorangan',
    division: 'Sahabat Ijinku',
    status: 'Aktif',
    currentStage: '8_produksi',
    lastUpdate: '2023-10-25',
    description: 'Proses input data ke sistem AHU dan persiapan draft Akta Pendirian.'
  },
  {
    id: 'case_002',
    clientName: 'Bpk. Hartono',
    caseType: 'Sengketa Tanah Waris',
    division: 'Christian Law Firm',
    status: 'Aktif',
    currentStage: '4_penawaran',
    lastUpdate: '2023-10-24',
    description: 'Menunggu konfirmasi pembayaran retainer fee dari klien setelah proposal dikirim.'
  },
  {
    id: 'case_003',
    clientName: 'CV. Kuliner Nusantara',
    caseType: 'Pendaftaran Merek',
    division: 'Sahabat Ijinku',
    status: 'Selesai',
    currentStage: '14_pengarsipan',
    lastUpdate: '2023-10-20',
    description: 'Sertifikat merek telah terbit dan diserahkan. Dokumen masuk arsip.'
  },
  {
    id: 'case_004',
    clientName: 'Ibu Ratna Sari',
    caseType: 'Penaikan HGB ke HM',
    division: 'CBP Legal Service',
    status: 'Aktif',
    currentStage: '10_monitoring',
    lastUpdate: '2023-10-26',
    description: 'Berkas sudah masuk BPN, menunggu jadwal pengukuran ulang.'
  }
];

export const CLIENTS = [
  { id: 'cl_01', name: 'PT. Maju Sejahtera', industry: 'Manufaktur', contact: 'Bpk. Budi', email: 'budi@maju.com' },
  { id: 'cl_02', name: 'Bpk. Hartono', industry: 'Individual', contact: 'Hartono', email: 'hartono@gmail.com' },
  { id: 'cl_03', name: 'CV. Kuliner Nusantara', industry: 'F&B', contact: 'Ibu Dian', email: 'dian@kuliner.id' },
  { id: 'cl_04', name: 'Ibu Ratna Sari', industry: 'Individual', contact: 'Ratna', email: 'ratna@yahoo.com' }
];

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

export const EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Sidang Pertama (Perdata)', date: '2023-11-02', time: '09:00', type: 'Sidang', client: 'Bpk. Hartono' },
  { id: 'e2', title: 'Deadline Upload OSS RBA', date: '2023-11-03', time: '13:00', type: 'Deadline', client: 'PT. Maju Sejahtera' },
  { id: 'e3', title: 'Ambil SK BPN', date: '2023-11-05', time: '10:00', type: 'Deadline', client: 'Ibu Ratna Sari' },
  { id: 'e4', title: 'Konsultasi Waris', date: '2023-11-06', time: '10:00', type: 'Konsultasi', client: 'Calon Klien Baru' }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', clientName: 'Budi Santoso', serviceType: 'Legalitas Usaha (OSS RBA)', date: '2023-11-10', time: '10:00', status: 'Pending', notes: 'Konsultasi pendirian PT baru.', contact: '08123456789' },
  { id: 'b2', clientName: 'Siti Aminah', serviceType: 'Hukum Keluarga & Waris', date: '2023-11-11', time: '14:00', status: 'Confirmed', notes: 'Masalah hak asuh anak.', contact: '08198765432' }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2023-001', clientName: 'PT. Maju Sejahtera', amount: 5000000, status: 'Paid', issueDate: '2023-10-01', dueDate: '2023-10-15', description: 'Jasa Pendirian PT' },
  { id: 'INV-2023-002', clientName: 'Bpk. Hartono', amount: 15000000, status: 'Overdue', issueDate: '2023-10-05', dueDate: '2023-10-19', description: 'Retainer Fee Litigasi' },
  { id: 'INV-2023-003', clientName: 'CV. Kuliner Nusantara', amount: 2500000, status: 'Unpaid', issueDate: '2023-10-25', dueDate: '2023-11-08', description: 'Pendaftaran Merek' }
];