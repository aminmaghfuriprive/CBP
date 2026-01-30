
import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  // ----------------------------------------------------------------------
  // 1. DIVISI HUKUM UMUM & LITIGASI (Sumber: Divisi Christian Law Firm)
  // ----------------------------------------------------------------------
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
  },

  // ----------------------------------------------------------------------
  // 2. DIVISI PERIZINAN & BISNIS (Sumber: Divisi Sahabat Ijinku - Licensing)
  // ----------------------------------------------------------------------
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
  },

  // ----------------------------------------------------------------------
  // 3. DIVISI PERTANAHAN & AGRARIA (Sumber: Law Firm Tanah & Legal Service)
  // ----------------------------------------------------------------------
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
  },

  // ----------------------------------------------------------------------
  // 4. DIVISI LEGAL ADMINISTRATIF & KORPORASI (Sumber: Entity Setup & Contracts)
  // ----------------------------------------------------------------------
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
