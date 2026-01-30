
import { GBPLocation, GBPReview, GBPUpdate } from '../types';

export const MOCK_GBP_LOCATIONS: GBPLocation[] = [
  {
    id: 'loc_hq',
    name: 'CBP Corp Law Firm - SCBD',
    address: 'Equity Tower Lt. 35, SCBD, Jakarta Selatan',
    rating: 4.9,
    reviewsCount: 128,
    stats: {
      views: 4520,
      calls: 86,
      directions: 142,
      websiteClicks: 310
    },
    isConnected: true
  }
];

export const MOCK_GBP_REVIEWS: GBPReview[] = [
  {
    id: 'rev_1',
    reviewer: 'Budi Santoso',
    rating: 5,
    comment: 'Pelayanan sangat profesional. Kasus sengketa tanah saya selesai dengan hasil memuaskan. Terima kasih Pak Christian.',
    date: '2023-10-25T10:00:00Z',
    reply: 'Terima kasih Pak Budi atas kepercayaannya. Sukses selalu untuk Anda.',
    replyDate: '2023-10-25T14:00:00Z'
  },
  {
    id: 'rev_2',
    reviewer: 'Siti Aminah',
    rating: 4,
    comment: 'Konsultasi hukum yang detail dan solutif. Hanya saja antrian booking agak panjang.',
    date: '2023-10-28T09:00:00Z'
  }
];

export const MOCK_GBP_UPDATES: GBPUpdate[] = [
  {
    id: 'upd_1',
    content: 'Kami membuka layanan konsultasi gratis setiap Jumat sore untuk UMKM. Segera daftar!',
    type: 'EVENT',
    date: '2023-10-20T08:00:00Z',
    status: 'LIVE',
    views: 850,
    clicks: 45
  }
];
