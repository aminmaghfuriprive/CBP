
import { RegulationItem } from '../types';

export const MOCK_REGULATIONS: RegulationItem[] = [
  // --- BISNIS & INVESTASI (OMNIBUS) ---
  {
    id: 'reg_001',
    title: 'Undang-Undang Republik Indonesia Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja Menjadi Undang-Undang',
    type: 'UU',
    number: '6',
    year: 2023,
    category: 'Bisnis & Investasi',
    status: 'Berlaku',
    fileUrl: 'https://peraturan.go.id/id/uu-no-6-tahun-2023',
    summary: 'Landasan hukum utama omnibus law yang mengatur kemudahan berusaha, ketenagakerjaan, perpajakan, dan dukungan UMKM. Menggantikan UU No. 11 Tahun 2020.',
    downloadCount: 15420,
    uploadedAt: '2023-04-01T10:00:00Z'
  },
  {
    id: 'reg_002',
    title: 'Peraturan Pemerintah Nomor 5 Tahun 2021 tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko (OSS RBA)',
    type: 'PP',
    number: '5',
    year: 2021,
    category: 'Bisnis & Investasi',
    status: 'Berlaku',
    fileUrl: 'https://peraturan.go.id/id/pp-no-5-tahun-2021',
    summary: 'Pedoman teknis klasifikasi risiko usaha (Rendah, Menengah, Tinggi) yang menentukan jenis perizinan (NIB, Sertifikat Standar, Izin) dalam sistem OSS.',
    downloadCount: 8900,
    uploadedAt: '2023-02-15T14:30:00Z'
  },

  // --- TEKNOLOGI & DATA ---
  {
    id: 'reg_003',
    title: 'Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (PDP)',
    type: 'UU',
    number: '27',
    year: 2022,
    category: 'Teknologi & Informasi',
    status: 'Berlaku',
    fileUrl: 'https://peraturan.go.id/id/uu-no-27-tahun-2022',
    summary: 'Payung hukum pengelolaan data pribadi yang mewajibkan Pengendali Data (termasuk korporasi) untuk menjamin keamanan data dan hak subjek data.',
    downloadCount: 12500,
    uploadedAt: '2023-01-20T09:00:00Z'
  },
  {
    id: 'reg_004',
    title: 'Undang-Undang Nomor 1 Tahun 2024 tentang Perubahan Kedua atas Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik',
    type: 'UU',
    number: '1',
    year: 2024,
    category: 'Teknologi & Informasi',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Revisi UU ITE yang mempertegas pasal karet pencemaran nama baik, mengatur identitas digital, dan perlindungan anak di ruang digital.',
    downloadCount: 5400,
    uploadedAt: '2024-01-10T08:00:00Z'
  },

  // --- PIDANA & PERDATA ---
  {
    id: 'reg_005',
    title: 'Undang-Undang Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana (KUHP Baru)',
    type: 'UU',
    number: '1',
    year: 2023,
    category: 'Pidana',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Kodifikasi hukum pidana nasional baru yang menggantikan WvS (KUHP kolonial). Berlaku efektif 3 tahun sejak diundangkan (2026).',
    downloadCount: 22100,
    uploadedAt: '2023-01-05T11:00:00Z'
  },
  {
    id: 'reg_006',
    title: 'Putusan Mahkamah Konstitusi Nomor 91/PUU-XVIII/2020 (Uji Formil UU Cipta Kerja)',
    type: 'Putusan MK',
    number: '91',
    year: 2020,
    category: 'Tata Negara',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Putusan fenomenal yang menyatakan UU Cipta Kerja "Inkonstitusional Bersyarat" dan memerintahkan perbaikan prosedur pembentukan undang-undang.',
    downloadCount: 4500,
    uploadedAt: '2021-11-25T13:00:00Z'
  },

  // --- KETENAGAKERJAAN ---
  {
    id: 'reg_007',
    title: 'Peraturan Pemerintah Nomor 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan PHK',
    type: 'PP',
    number: '35',
    year: 2021,
    category: 'Ketenagakerjaan',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Aturan pelaksana turunan Cipta Kerja yang merinci kompensasi PKWT, pesangon PHK, dan fleksibilitas outsourcing.',
    downloadCount: 18900,
    uploadedAt: '2022-03-10T10:00:00Z'
  },
  {
    id: 'reg_008',
    title: 'Peraturan Menteri Ketenagakerjaan Nomor 5 Tahun 2023 tentang Penyesuaian Waktu Kerja dan Pengupahan pada Industri Padat Karya Tertentu',
    type: 'Permen',
    number: '5',
    year: 2023,
    category: 'Ketenagakerjaan',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Kebijakan khusus pemotongan upah maksimal 25% bagi industri padat karya berorientasi ekspor yang terdampak ekonomi global.',
    downloadCount: 3200,
    uploadedAt: '2023-03-15T09:00:00Z'
  },

  // --- PERPAJAKAN ---
  {
    id: 'reg_009',
    title: 'Undang-Undang Nomor 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (HPP)',
    type: 'UU',
    number: '7',
    year: 2021,
    category: 'Pajak',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Reformasi pajak komprehensif: kenaikan PPN 11%, Program Pengungkapan Sukarela (Tax Amnesty Jilid II), dan Pajak Karbon.',
    downloadCount: 14500,
    uploadedAt: '2022-01-01T00:00:00Z'
  },
  {
    id: 'reg_010',
    title: 'Peraturan Menteri Keuangan Nomor 66 Tahun 2023 tentang Pajak Natura',
    type: 'Permen',
    number: '66',
    year: 2023,
    category: 'Pajak',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Petunjuk teknis pemotongan PPh atas fasilitas/kenikmatan (natura) yang diterima pegawai dari perusahaan.',
    downloadCount: 6700,
    uploadedAt: '2023-07-01T10:00:00Z'
  },

  // --- KORPORASI & HAKI ---
  {
    id: 'reg_011',
    title: 'Peraturan Presiden Nomor 10 Tahun 2021 tentang Bidang Usaha Penanaman Modal (Daftar Positif Investasi)',
    type: 'Perpres',
    number: '10',
    year: 2021,
    category: 'Bisnis & Investasi',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Membuka sektor investasi lebih luas, menggantikan Daftar Negatif Investasi (DNI). Mengatur bidang usaha prioritas fiskal.',
    downloadCount: 5600,
    uploadedAt: '2022-02-20T11:00:00Z'
  },
  {
    id: 'reg_012',
    title: 'Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis',
    type: 'UU',
    number: '20',
    year: 2016,
    category: 'HAKI',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Dasar hukum perlindungan merek dagang, prosedur pendaftaran, dan sengketa pelanggaran merek di Pengadilan Niaga.',
    downloadCount: 8100,
    uploadedAt: '2016-12-01T10:00:00Z'
  },

  // --- AGRARIA & PERTANAHAN ---
  {
    id: 'reg_013',
    title: 'Peraturan Pemerintah Nomor 18 Tahun 2021 tentang Hak Pengelolaan, Hak Atas Tanah, Satuan Rumah Susun, dan Pendaftaran Tanah',
    type: 'PP',
    number: '18',
    year: 2021,
    category: 'Agraria',
    status: 'Berlaku',
    fileUrl: '#',
    summary: 'Mengatur penguatan Hak Pengelolaan (HPL), kepemilikan hunian bagi orang asing, dan digitalisasi sertifikat tanah.',
    downloadCount: 4200,
    uploadedAt: '2021-03-05T14:00:00Z'
  }
];
