
import { ServiceItem } from '../../types';

export const AGRARIAN_SERVICES: ServiceItem[] = [
  {
    id: 'land_01',
    title: 'Pengurusan Akta Jual Beli (AJB) & Hibah',
    description: 'Pembuatan akta otentik PPAT untuk peralihan hak atas tanah karena jual beli atau hibah.',
    iconName: 'FileText',
    division: 'Pertanahan & Agraria',
    basePrice: 3500000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Validasi', task: 'Pengecekan sertifikat & pajak', estimatedDays: 5 }]
  },
  {
    id: 'land_02',
    title: 'Pecah Sertipikat Tanah',
    description: 'Pemisahan satu bidang tanah menjadi beberapa sertifikat hak milik baru.',
    iconName: 'Scissors',
    division: 'Pertanahan & Agraria',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 'land_03',
    title: 'Pengurusan Turun Waris Tanah',
    description: 'Balik nama sertifikat dari pemegang hak yang meninggal dunia kepada ahli waris.',
    iconName: 'Users',
    division: 'Pertanahan & Agraria',
    basePrice: 4000000,
    isActive: true
  },
  {
    id: 'land_04',
    title: 'Konversi Letter C ke Sertifikat',
    description: 'Pendaftaran tanah pertama kali (sporadik) dari alas hak girik/letter C menjadi SHM.',
    iconName: 'Map',
    division: 'Pertanahan & Agraria',
    basePrice: 6000000,
    isActive: true
  },
  {
    id: 'land_05',
    title: 'Pengurusan Roya (Hapus Hak Tanggungan)',
    description: 'Pencoretan catatan hutang/hak tanggungan pada sertifikat setelah kredit lunas.',
    iconName: 'Eraser',
    division: 'Pertanahan & Agraria',
    basePrice: 1500000,
    isActive: true
  },
  {
    id: 'land_06',
    title: 'Peningkatan Hak (HGB ke SHM)',
    description: 'Mengubah status Hak Guna Bangunan menjadi Hak Milik untuk kepastian hukum aset.',
    iconName: 'ArrowUpCircle',
    division: 'Pertanahan & Agraria',
    basePrice: 2500000,
    isActive: true
  },
  {
    id: 'land_07',
    title: 'Pengurusan PKKPR (Kesesuaian Ruang)',
    description: 'Dokumen Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang sebagai dasar izin lokasi.',
    iconName: 'MapPin',
    division: 'Pertanahan & Agraria',
    basePrice: 3000000,
    isActive: true
  },
  {
    id: 'land_08',
    title: 'Pengurusan PBG & SLF',
    description: 'Persetujuan Bangunan Gedung dan Sertifikat Laik Fungsi untuk legalitas konstruksi.',
    iconName: 'HardHat',
    division: 'Pertanahan & Agraria',
    basePrice: 7500000,
    isActive: true
  },
  {
    id: 'land_09',
    title: 'Pengurusan Dokumen Lingkungan (UKL/UPL)',
    description: 'Penyusunan dokumen upaya pengelolaan dan pemantauan lingkungan hidup.',
    iconName: 'Leaf',
    division: 'Pertanahan & Agraria',
    basePrice: 5000000,
    isActive: true
  }
];
