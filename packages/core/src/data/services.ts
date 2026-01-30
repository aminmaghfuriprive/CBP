
import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  // ----------------------------------------------------------------------
  // 1. DIVISI LEGAL ADMINISTRATIF & KORPORASI
  // Fokus: Dokumen internal, Struktur Bisnis, Kontrak
  // ----------------------------------------------------------------------
  {
    id: 's_corp_01',
    title: 'Pendirian Badan Usaha (PT/CV/Yayasan)',
    description: 'Paket lengkap pendirian PT Perorangan, PT Biasa, PMA, CV, Firma, hingga Yayasan beserta SK Kemenkumham.',
    iconName: 'Building2',
    division: 'Legal Administratif & Korporasi',
    basePrice: 4500000,
    isActive: true,
    sop: [
      { id: 'sop_pt1', phase: 'Persiapan', task: 'Pengecekan & Pemesanan Nama Perseroan', estimatedDays: 1 },
      { id: 'sop_pt2', phase: 'Drafting', task: 'Pembuatan Minuta Akta Pendirian', estimatedDays: 2 },
      { id: 'sop_pt3', phase: 'Finalisasi', task: 'Tanda Tangan Akta & Pengesahan SK Menkumham', estimatedDays: 3 }
    ]
  },
  {
    id: 's_corp_02',
    title: 'Perubahan Anggaran Dasar & Data Perseroan',
    description: 'Layanan perubahan akta, jual beli saham, perubahan susunan direksi/komisaris, dan peningkatan modal.',
    iconName: 'FileSignature',
    division: 'Legal Administratif & Korporasi',
    basePrice: 3000000,
    isActive: true
  },
  {
    id: 's_corp_03',
    title: 'Corporate Action (M&A, Spin-off)',
    description: 'Pendampingan hukum untuk Merger, Akuisisi, Konsolidasi, Spin-off, hingga Likuidasi/Pembubaran perusahaan.',
    iconName: 'GitMerge',
    division: 'Legal Administratif & Korporasi',
    basePrice: 25000000,
    isActive: true
  },
  {
    id: 's_corp_04',
    title: 'Drafting & Review Kontrak Bisnis',
    description: 'Penyusunan dan tinjauan perjanjian kerjasama, shareholder agreement, NDA, hingga perjanjian distribusi.',
    iconName: 'PenTool',
    division: 'Legal Administratif & Korporasi',
    basePrice: 2000000,
    isActive: true
  },
  {
    id: 's_corp_05',
    title: 'Ketenagakerjaan & Hubungan Industrial',
    description: 'Pembuatan Peraturan Perusahaan (PP), PKWT/PKWTT, dan buku panduan karyawan (Employee Handbook).',
    iconName: 'Briefcase',
    division: 'Legal Administratif & Korporasi',
    basePrice: 3500000,
    isActive: true
  },
  {
    id: 's_corp_06',
    title: 'Konsultasi Pajak & Keuangan',
    description: 'Tax planning, pelaporan pajak badan, Tax Amnesty, dan konsultasi kepatuhan finansial.',
    iconName: 'Calculator',
    division: 'Legal Administratif & Korporasi',
    basePrice: 1500000,
    isActive: true
  },

  // ----------------------------------------------------------------------
  // 2. DIVISI PERIZINAN & BISNIS
  // Fokus: Regulator, OSS, HAKI, Imigrasi
  // ----------------------------------------------------------------------
  {
    id: 's_biz_01',
    title: 'Perizinan Berusaha (OSS RBA)',
    description: 'Penerbitan NIB, Sertifikat Standar, dan migrasi data OSS 1.1 ke OSS RBA.',
    iconName: 'Globe',
    division: 'Perizinan & Bisnis',
    basePrice: 1500000,
    isActive: true,
    sop: [
      { id: 'oss_1', phase: 'Persiapan', task: 'Validasi KBLI & Peta Zonasi', estimatedDays: 1 },
      { id: 'oss_2', phase: 'Eksekusi', task: 'Input Data Sistem OSS', estimatedDays: 1 },
      { id: 'oss_3', phase: 'Finalisasi', task: 'Cetak NIB & Izin Lokasi', estimatedDays: 1 }
    ]
  },
  {
    id: 's_biz_02',
    title: 'Pendaftaran Kekayaan Intelektual (HAKI)',
    description: 'Pendaftaran Merek Dagang, Hak Cipta, Paten, dan Desain Industri ke DJKI.',
    iconName: 'Award',
    division: 'Perizinan & Bisnis',
    basePrice: 2500000,
    isActive: true
  },
  {
    id: 's_biz_03',
    title: 'Izin Sektor Khusus & Konstruksi',
    description: 'Pengurusan SBU, SIUJK, Izin Tambang, dan izin sektoral spesifik lainnya.',
    iconName: 'HardHat',
    division: 'Perizinan & Bisnis',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 's_biz_04',
    title: 'Kepatuhan Produk (Halal, BPOM, SNI)',
    description: 'Pengurusan sertifikasi Halal, izin edar BPOM, PIRT, dan SNI produk.',
    iconName: 'BadgeCheck',
    division: 'Perizinan & Bisnis',
    basePrice: 3000000,
    isActive: true
  },
  {
    id: 's_biz_05',
    title: 'Imigrasi & Tenaga Kerja Asing',
    description: 'Pengurusan Visa, KITAS/KITAP, dan RPTKA untuk ekspatriat.',
    iconName: 'Plane',
    division: 'Perizinan & Bisnis',
    basePrice: 6000000,
    isActive: true
  },

  // ----------------------------------------------------------------------
  // 3. DIVISI PERTANAHAN & AGRARIA
  // Fokus: Aset properti, BPN, Konstruksi
  // ----------------------------------------------------------------------
  {
    id: 's_land_01',
    title: 'Pengurusan Sertifikat Tanah',
    description: 'Pendaftaran pertama kali, turun waris, peningkatan HGB ke Hak Milik, dan pemecahan sertifikat.',
    iconName: 'Map',
    division: 'Pertanahan & Agraria',
    basePrice: 5000000,
    isActive: true,
    sop: [
      { id: 'land_1', phase: 'Persiapan', task: 'Pemberkasan & Validasi Warkah', estimatedDays: 3 },
      { id: 'land_2', phase: 'Lapangan', task: 'Pengukuran Tanah oleh Petugas Ukur', estimatedDays: 7 },
      { id: 'land_3', phase: 'Proses BPN', task: 'Sidang Panitia A / Pemeriksaan Tanah', estimatedDays: 14 }
    ]
  },
  {
    id: 's_land_02',
    title: 'Akta PPAT & Transaksi Properti',
    description: 'Pembuatan Akta Jual Beli (AJB), Hibah, Tukar Menukar, dan Pemasangan Hak Tanggungan.',
    iconName: 'Scroll',
    division: 'Pertanahan & Agraria',
    basePrice: 3500000,
    isActive: true
  },
  {
    id: 's_land_03',
    title: 'Perizinan Bangunan & Lingkungan',
    description: 'Pengurusan PBG (IMB), SLF (Sertifikat Laik Fungsi), dan dokumen lingkungan (AMDAL/UKL-UPL).',
    iconName: 'Home',
    division: 'Pertanahan & Agraria',
    basePrice: 7500000,
    isActive: true
  },
  {
    id: 's_land_04',
    title: 'Due Diligence Properti',
    description: 'Pengecekan bersih sertifikat, status sengketa, dan zona tata ruang sebelum transaksi.',
    iconName: 'SearchCheck',
    division: 'Pertanahan & Agraria',
    basePrice: 2000000,
    isActive: true
  },

  // ----------------------------------------------------------------------
  // 4. DIVISI HUKUM UMUM & LITIGASI
  // Fokus: Sengketa, Pidana, Keluarga
  // ----------------------------------------------------------------------
  {
    id: 's_lit_01',
    title: 'Litigasi Perdata & Bisnis',
    description: 'Gugatan wanprestasi, Perbuatan Melawan Hukum (PMH), Kepailitan & PKPU, serta Eksekusi Putusan.',
    iconName: 'Gavel',
    division: 'Hukum Umum & Litigasi',
    basePrice: 15000000,
    isActive: true,
    sop: [
      { id: 'lit_1', phase: 'Persiapan', task: 'Analisis Posita & Petitum Gugatan', estimatedDays: 5 },
      { id: 'lit_2', phase: 'Registrasi', task: 'Pendaftaran Perkara di E-Court', estimatedDays: 1 },
      { id: 'lit_3', phase: 'Persidangan', task: 'Sidang Pertama (Mediasi)', estimatedDays: 14 }
    ]
  },
  {
    id: 's_lit_02',
    title: 'Pembelaan Perkara Pidana',
    description: 'Pendampingan di tingkat Kepolisian, Kejaksaan, hingga Pengadilan untuk pidana umum maupun khusus.',
    iconName: 'ShieldAlert',
    division: 'Hukum Umum & Litigasi',
    basePrice: 20000000,
    isActive: true
  },
  {
    id: 's_lit_03',
    title: 'Hukum Keluarga & Waris',
    description: 'Pengurusan perceraian, harta gono-gini, hak asuh anak, penetapan ahli waris, dan wasiat.',
    iconName: 'Users',
    division: 'Hukum Umum & Litigasi',
    basePrice: 7500000,
    isActive: true
  },
  {
    id: 's_lit_04',
    title: 'Penyelesaian Sengketa Hubungan Industrial',
    description: 'Pendampingan Bipartit, Tripartit, hingga Pengadilan Hubungan Industrial (PHI) untuk kasus PHK.',
    iconName: 'UserX',
    division: 'Hukum Umum & Litigasi',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 's_lit_05',
    title: 'Arbitrase & Alternatif Penyelesaian Sengketa',
    description: 'Negosiasi, Mediasi, dan pendampingan Arbitrase (BANI/Internasional) di luar pengadilan.',
    iconName: 'Handshake',
    division: 'Hukum Umum & Litigasi',
    basePrice: 10000000,
    isActive: true
  }
];
