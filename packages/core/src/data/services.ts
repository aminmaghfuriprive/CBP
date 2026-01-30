
import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 's_law_01',
    title: 'Penanganan Perkara Pidana & Perdata',
    description: 'Pendampingan hukum untuk kasus pidana, wanprestasi, dan gugatan perdata.',
    iconName: 'Scale',
    division: 'Christian Law Firm',
    sop: [
      { id: 'sop_1', phase: 'Persiapan', task: 'Wawancara Klien & Pengumpulan Bukti', estimatedDays: 3 },
      { id: 'sop_2', phase: 'Persiapan', task: 'Analisis Hukum & Strategi', estimatedDays: 5 },
      { id: 'sop_3', phase: 'Pelaksanaan', task: 'Pendaftaran Gugatan / Laporan', estimatedDays: 1 },
      { id: 'sop_4', phase: 'Pelaksanaan', task: 'Pendampingan Sidang (Per Agenda)', estimatedDays: 1 }
    ]
  },
  {
    id: 's_law_02',
    title: 'Hukum Keluarga & Waris',
    description: 'Pengurusan cerai talak/gugat, gugatan harta bersama, dispensasi nikah, dan gugatan waris.',
    iconName: 'Users',
    division: 'Christian Law Firm',
    sop: []
  },
  {
    id: 's_law_03',
    title: 'Somasi & Legal Drafting',
    description: 'Pembuatan surat kuasa, surat peringatan (somasi), dan dokumen hukum lainnya.',
    iconName: 'FileText',
    division: 'Christian Law Firm',
    sop: []
  },
  {
    id: 's_legal_01',
    title: 'Pengurusan Aset & Pertanahan',
    description: 'Penaikan HGB ke HM, Roya, Pengeringan Tanah, dan Pengurusan Tanah Eigendom.',
    iconName: 'Landmark',
    division: 'CBP Legal Service',
    sop: [
      { id: 'sop_t1', phase: 'Validasi', task: 'Pengecekan Sertifikat di BPN', estimatedDays: 2 },
      { id: 'sop_t2', phase: 'Pengukuran', task: 'Pengukuran Ulang Batas Tanah', estimatedDays: 7 },
      { id: 'sop_t3', phase: 'Administrasi', task: 'Pembayaran SPS & PNBP', estimatedDays: 1 }
    ]
  },
  {
    id: 's_legal_02',
    title: 'Perjanjian Bisnis & Investasi',
    description: 'Penyusunan draft perjanjian kerjasama investasi, sewa menyewa, dan jual beli.',
    iconName: 'Handshake',
    division: 'CBP Legal Service',
    sop: []
  },
  {
    id: 's_legal_03',
    title: 'Perizinan Bangunan & Lingkungan',
    description: 'Pengurusan PBG/SLE, dokumen UKL/UPL, dan kajian FPR.',
    iconName: 'Building',
    division: 'CBP Legal Service',
    sop: []
  },
  {
    id: 's_izin_01',
    title: 'Legalitas Usaha (OSS RBA)',
    description: 'Pengurusan NIB, migrasi data OSS 1.1 ke OSS RBA, dan pendirian PT/CV/Yayasan.',
    iconName: 'Briefcase',
    division: 'Sahabat Ijinku',
    sop: [
      { id: 'sop_os1', phase: 'Persiapan', task: 'Cek Ketersediaan Nama PT', estimatedDays: 1 },
      { id: 'sop_os2', phase: 'Akta', task: 'Tanda Tangan Minuta Akta', estimatedDays: 2 },
      { id: 'sop_os3', phase: 'SK', task: 'Pengesahan SK Kemenkumham', estimatedDays: 2 },
      { id: 'sop_os4', phase: 'OSS', task: 'Terbit NIB', estimatedDays: 1 }
    ]
  },
  {
    id: 's_izin_02',
    title: 'Kekayaan Intelektual (HAKI)',
    description: 'Pendaftaran merek, hak cipta, paten sederhana, dan desain industri.',
    iconName: 'Lightbulb',
    division: 'Sahabat Ijinku',
    sop: []
  },
  {
    id: 's_izin_03',
    title: 'Perizinan Produk',
    description: 'Pendaftaran PIRT, Sertifikat Halal, dan Sertifikat Standar.',
    iconName: 'Award',
    division: 'Sahabat Ijinku',
    sop: []
  }
];
