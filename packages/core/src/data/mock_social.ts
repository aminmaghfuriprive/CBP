
import { SocialAccount, SocialPost } from '../types';

export const MOCK_SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'soc_fb',
    platform: 'FACEBOOK',
    handle: 'CBP Law Firm',
    followers: 1250,
    isConnected: true,
    lastSync: '2023-10-28T08:00:00Z'
  },
  {
    id: 'soc_ig',
    platform: 'INSTAGRAM',
    handle: '@cbpcorp.id',
    followers: 3400,
    isConnected: true,
    lastSync: '2023-10-28T08:00:00Z'
  },
  {
    id: 'soc_li',
    platform: 'LINKEDIN',
    handle: 'CBP Corp Legal',
    followers: 890,
    isConnected: false,
    lastSync: '-'
  },
  {
    id: 'soc_x',
    platform: 'TWITTER',
    handle: '@cbp_law',
    followers: 450,
    isConnected: false,
    lastSync: '-'
  }
];

export const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post_1',
    content: 'Tips Hukum: Pentingnya mendaftarkan merek dagang Anda sebelum memulai ekspansi bisnis.',
    platforms: ['FACEBOOK', 'INSTAGRAM'],
    date: '2023-10-27T10:00:00Z',
    likes: 124,
    shares: 15,
    status: 'Published'
  },
  {
    id: 'post_2',
    content: 'Selamat memperingati Hari Sumpah Pemuda. Mari bangun hukum yang berkeadilan.',
    platforms: ['INSTAGRAM'],
    date: '2023-10-28T09:00:00Z',
    likes: 256,
    shares: 40,
    status: 'Published'
  }
];
