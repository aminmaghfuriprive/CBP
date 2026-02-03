
import { RegulationItem } from '../types';

export const MOCK_REGULATIONS: RegulationItem[] = [
  {
    id: 'reg_001',
    title: 'Undang-Undang Republik Indonesia Nomor 11 Tahun 2020 tentang Cipta Kerja',
    type: 'UU',
    number: '11',
    year: 2020,
    category: 'Bisnis & Investasi',
    status: 'Dicabut', // Diganti Perppu/UU baru
    fileUrl: 'https://example.com/uu-cipta-kerja.pdf',
    summary: 'Omnibus law yang mengubah berbagai undang-undang untuk meningkatkan ekosistem investasi dan kemudahan berusaha.',
    downloadCount: 1540,
    uploadedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'reg_002',
    title: 'Undang-Undang Republik Indonesia Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja Menjadi Undang-Undang',
    type: 'UU',
    number: '6',
    year: 2023,
    category: 'Bisnis & Investasi',
    status: 'Berlaku',
    fileUrl: 'https://example.com/uu-6-2023.pdf',
    summary: 'Penetapan Perppu Cipta Kerja menjadi Undang-Undang, menggantikan UU No. 11 Tahun 2020.',
    downloadCount: 890,
    uploadedAt: '2023-04-20T14:30:00Z'
  },
  {
    id: 'reg_003',
    title: 'Peraturan Pemerintah Nomor 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja',
    type: 'PP',
    number: '35',
    year: 2021,
    category: 'Ketenagakerjaan',
    status: 'Berlaku',
    fileUrl: 'https://example.com/pp-35-2021.pdf',
    summary: 'Mengatur detail teknis mengenai PKWT, outsourcing, jam kerja, lembur, dan pesangon PHK.',
    downloadCount: 2100,
    uploadedAt: '2023-02-10T09:15:00Z'
  },
  {
    id: 'reg_004',
    title: 'Undang-Undang Nomor 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan',
    type: 'UU',
    number: '7',
    year: 2021,
    category: 'Pajak',
    status: 'Berlaku',
    fileUrl: 'https://example.com/uu-hpp.pdf',
    summary: 'Reformasi sistem perpajakan termasuk perubahan tarif PPh, PPN, dan program pengungkapan sukarela.',
    downloadCount: 3200,
    uploadedAt: '2023-03-05T11:20:00Z'
  },
  {
    id: 'reg_005',
    title: 'Peraturan Menteri Keuangan Nomor 66 Tahun 2023 tentang Perlakuan Pajak Penghasilan atas Penggantian atau Imbalan Sehubungan dengan Pekerjaan atau Jasa yang Diterima atau Diperoleh dalam Bentuk Natura dan/atau Kenikmatan',
    type: 'Permen',
    number: '66',
    year: 2023,
    category: 'Pajak',
    status: 'Berlaku',
    fileUrl: 'https://example.com/pmk-66-2023.pdf',
    summary: 'Aturan teknis mengenai pajak natura (fasilitas kantor) yang kini menjadi objek pajak.',
    downloadCount: 1200,
    uploadedAt: '2023-07-15T13:45:00Z'
  }
];
