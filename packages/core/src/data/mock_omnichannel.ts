
import { Conversation, Message } from '../types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    contactName: 'Bpk. Hartono',
    lastMessage: 'Baik pak, saya tunggu draft somasinya.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
    unreadCount: 2,
    channel: 'WHATSAPP',
    tags: ['Klien', 'Urgent']
  },
  {
    id: 'conv_2',
    contactName: 'PT. Maju Sejahtera (Ibu Ani)',
    lastMessage: 'Terlampir dokumen NIB perusahaan kami.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    unreadCount: 0,
    channel: 'EMAIL',
    tags: ['Klien', 'Legalitas']
  },
  {
    id: 'conv_3',
    contactName: '0812-3344-5566',
    lastMessage: 'Selamat siang, apakah bisa konsultasi tanah?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    unreadCount: 1,
    channel: 'WHATSAPP',
    tags: ['Prospek']
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg_1_1',
    conversationId: 'conv_1',
    text: 'Selamat siang Pak Hartono, terkait kasus sengketa lahan, tim kami sudah menyusun draft somasi.',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: true
  },
  {
    id: 'msg_1_2',
    conversationId: 'conv_1',
    text: 'Kira-kira kapan bisa dikirim ya?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    isRead: true
  },
  {
    id: 'msg_1_3',
    conversationId: 'conv_1',
    text: 'Sore ini akan kami kirimkan via email untuk direview terlebih dahulu.',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    isRead: true
  },
  {
    id: 'msg_1_4',
    conversationId: 'conv_1',
    text: 'Baik pak, saya tunggu draft somasinya.',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isRead: false
  },
  // Conversation 2
  {
    id: 'msg_2_1',
    conversationId: 'conv_2',
    text: 'Mohon info kelengkapan berkas untuk OSS RBA.',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isRead: true
  },
  {
    id: 'msg_2_2',
    conversationId: 'conv_2',
    text: 'Terlampir dokumen NIB perusahaan kami.',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: true
  }
];
