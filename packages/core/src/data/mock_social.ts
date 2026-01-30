
import { SocialAccount, SocialPost } from '../types';

export const MOCK_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'soc_fb',
    platform: 'FACEBOOK',
    handle: 'CBP Law Firm Official',
    followers: 1250,
    isConnected: true,
    lastSync: '2023-10-28T08:00:00Z',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
  },
  {
    id: 'soc_ig',
    platform: 'INSTAGRAM',
    handle: '@cbpcorp.id',
    followers: 3400,
    isConnected: true,
    lastSync: '2023-10-28T08:00:00Z',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png'
  },
  {
    id: 'soc_li',
    platform: 'LINKEDIN',
    handle: 'CBP Corp Legal',
    followers: 890,
    isConnected: true, // Connected for demo
    lastSync: '2023-10-28T08:00:00Z',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
  },
  {
    id: 'soc_x',
    platform: 'TWITTER',
    handle: '@cbp_law',
    followers: 450,
    isConnected: false,
    lastSync: '-',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg'
  }
];

export const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post_1',
    content: 'Tips Hukum: Pentingnya mendaftarkan merek dagang Anda sebelum memulai ekspansi bisnis. Jangan sampai aset intangible Anda diklaim pihak lain. #HKI #Bisnis #LegalTips',
    platforms: ['FACEBOOK', 'INSTAGRAM', 'LINKEDIN'],
    date: '2023-10-27T10:00:00Z',
    likes: 124,
    shares: 15,
    status: 'Sent',
    mediaUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'post_2',
    content: 'Selamat memperingati Hari Sumpah Pemuda. Mari bangun hukum yang berkeadilan untuk Indonesia Maju. 🇮🇩',
    platforms: ['INSTAGRAM'],
    date: '2023-10-28T09:00:00Z',
    likes: 256,
    shares: 40,
    status: 'Sent',
    mediaUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'post_3',
    content: 'Update Regulasi: PP No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja dan PHK. Simak poin pentingnya.',
    platforms: ['LINKEDIN', 'TWITTER'],
    date: '2023-10-26T14:30:00Z',
    likes: 45,
    shares: 12,
    status: 'Partial' // Example of partial success
  }
];
