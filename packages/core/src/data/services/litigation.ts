
import { ServiceItem } from '../../types';

export const LITIGATION_SERVICES: ServiceItem[] = [
  {
    id: 'lit_01',
    title: 'Pembuatan Surat Kuasa & Somasi',
    description: 'Penyusunan dokumen legalitas kuasa dan surat peringatan (somasi) yang tegas dan sesuai prosedur hukum.',
    iconName: 'FileSignature',
    division: 'Hukum Umum & Litigasi',
    basePrice: 1500000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Drafting', task: 'Analisis kasus & penyusunan somasi', estimatedDays: 3 }]
  },
  {
    id: 'lit_02',
    title: 'Pendampingan Perkara Pidana',
    description: 'Pembelaan hukum di tingkat Kepolisian, Kejaksaan, hingga Pengadilan untuk tersangka maupun korban.',
    iconName: 'ShieldAlert',
    division: 'Hukum Umum & Litigasi',
    basePrice: 20000000,
    isActive: true,
    sop: [{ id: 's1', phase: 'Litigasi', task: 'Pendampingan BAP di Kepolisian', estimatedDays: 1 }]
  },
  {
    id: 'lit_03',
    title: 'Gugatan Wanprestasi',
    description: 'Penyelesaian sengketa akibat kelalaian atau pelanggaran perjanjian bisnis/hutang piutang.',
    iconName: 'Scale',
    division: 'Hukum Umum & Litigasi',
    basePrice: 15000000,
    isActive: true
  },
  {
    id: 'lit_04',
    title: 'Pengurusan Gugatan Waris',
    description: 'Penyelesaian sengketa pembagian harta warisan secara litigasi maupun mediasi kekeluargaan.',
    iconName: 'Users',
    division: 'Hukum Umum & Litigasi',
    basePrice: 10000000,
    isActive: true
  },
  {
    id: 'lit_05',
    title: 'Pengajuan Perwalian Anak',
    description: 'Proses penetapan hak asuh atau perwalian anak di bawah umur melalui penetapan pengadilan.',
    iconName: 'Baby',
    division: 'Hukum Umum & Litigasi',
    basePrice: 7500000,
    isActive: true
  },
  {
    id: 'lit_06',
    title: 'Perceraian (Talak/Gugat)',
    description: 'Pengurusan proses cerai talak atau cerai gugat di Pengadilan Agama maupun Negeri.',
    iconName: 'UserX',
    division: 'Hukum Umum & Litigasi',
    basePrice: 8000000,
    isActive: true
  },
  {
    id: 'lit_07',
    title: 'Gugatan Harta Bersama (Gono-Gini)',
    description: 'Penyelesaian pembagian aset harta yang diperoleh selama perkawinan pasca perceraian.',
    iconName: 'Coins',
    division: 'Hukum Umum & Litigasi',
    basePrice: 12000000,
    isActive: true
  },
  {
    id: 'lit_08',
    title: 'Pengajuan Dispensasi Nikah',
    description: 'Permohonan izin pernikahan bagi calon mempelai yang belum mencapai batas usia minimal.',
    iconName: 'HeartHandshake',
    division: 'Hukum Umum & Litigasi',
    basePrice: 5000000,
    isActive: true
  },
  {
    id: 'lit_09',
    title: 'Penyelesaian Sengketa Tanah (Litigasi)',
    description: 'Penanganan kasus sengketa kepemilikan lahan, penyerobotan, atau tumpang tindih sertifikat di pengadilan.',
    iconName: 'Gavel',
    division: 'Hukum Umum & Litigasi',
    basePrice: 25000000,
    isActive: true
  }
];
