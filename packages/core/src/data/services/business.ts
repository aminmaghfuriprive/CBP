
import { ServiceItem } from '../../types';

export const BUSINESS_SERVICES: ServiceItem[] = [
  {
    id: 'biz_01',
    title: 'Pengurusan NIB & Akun OSS',
    description: 'Penerbitan Nomor Induk Berusaha (NIB) melalui sistem OSS RBA untuk legalitas dasar usaha.',
    iconName: 'Globe',
    division: 'Perizinan & Bisnis',
    basePrice: 1000000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Registrasi', task: 'Input data sistem OSS', estimatedDays: 1 }]
  },
  {
    id: 'biz_02',
    title: 'Migrasi OSS 1.1 ke OSS RBA',
    description: 'Layanan pembaruan data perizinan lama ke sistem terbaru berbasis risiko (Risk Based Approach).',
    iconName: 'RefreshCw',
    division: 'Perizinan & Bisnis',
    basePrice: 1500000,
    isActive: true
  },
  {
    id: 'biz_03',
    title: 'Pendaftaran Merek (HAKI)',
    description: 'Perlindungan hukum nama brand dan logo bisnis Anda dengan pendaftaran resmi ke DJKI.',
    iconName: 'Award',
    division: 'Perizinan & Bisnis',
    basePrice: 2500000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Pendaftaran', task: 'Submit permohonan ke DJKI', estimatedDays: 3 }]
  },
  {
    id: 'biz_04',
    title: 'Pendaftaran Hak Cipta & Paten',
    description: 'Pencatatan ciptaan seni, buku, program komputer, atau invensi teknologi sederhana/umum.',
    iconName: 'Lightbulb',
    division: 'Perizinan & Bisnis',
    basePrice: 3500000,
    isActive: true
  },
  {
    id: 'biz_05',
    title: 'Izin PIRT (Pangan Industri Rumah Tangga)',
    description: 'Pengurusan izin edar untuk produk makanan/minuman skala industri rumahan.',
    iconName: 'Utensils',
    division: 'Perizinan & Bisnis',
    basePrice: 2000000,
    isActive: true
  },
  {
    id: 'biz_06',
    title: 'Sertifikasi Halal',
    description: 'Pendampingan proses jaminan produk halal (JPH) hingga terbit sertifikat dari BPJPH.',
    iconName: 'BadgeCheck',
    division: 'Perizinan & Bisnis',
    basePrice: 3000000,
    isActive: true
  },
  {
    id: 'biz_07',
    title: 'Pendaftaran NPWP (Pribadi & Badan)',
    description: 'Registrasi Nomor Pokok Wajib Pajak untuk kelengkapan administrasi perpajakan.',
    iconName: 'CreditCard',
    division: 'Perizinan & Bisnis',
    basePrice: 500000,
    isActive: true
  },
  {
    id: 'biz_08',
    title: 'Pembuatan Desain Industri',
    description: 'Perlindungan hukum atas kreasi bentuk, konfigurasi, atau komposisi garis/warna produk.',
    iconName: 'PenTool',
    division: 'Perizinan & Bisnis',
    basePrice: 4000000,
    isActive: true
  },
  {
    id: 'biz_09',
    title: 'Izin Biro Umroh (PPIU)',
    description: 'Pengurusan legalitas khusus untuk penyelenggara perjalanan ibadah umroh.',
    iconName: 'Plane',
    division: 'Perizinan & Bisnis',
    basePrice: 15000000,
    isActive: true
  }
];
