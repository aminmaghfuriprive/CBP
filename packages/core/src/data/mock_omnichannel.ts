
import { Conversation, Message } from '../types';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    contactName: 'Bpk. Hartono',
    lastMessage: 'Baik pak, saya tunggu draft somasinya.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), 
    unreadCount: 0,
    channel: 'WHATSAPP',
    tags: ['Klien', 'Urgent', 'Litigasi'],
    relatedClientId: 'cl_02' // Links to Bpk Hartono in Client DB
  },
  {
    id: 'conv_2',
    contactName: 'PT. Maju Sejahtera (Ibu Ani)',
    lastMessage: 'Terlampir dokumen NIB perusahaan kami.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unreadCount: 1,
    channel: 'EMAIL',
    tags: ['Klien', 'Legalitas'],
    relatedClientId: 'cl_01'
  },
  {
    id: 'conv_3',
    contactName: 'dian_kuliner',
    lastMessage: 'Min, biaya daftar merek berapa ya?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), 
    unreadCount: 3,
    channel: 'INSTAGRAM',
    tags: ['Lead', 'HAKI'],
    relatedClientId: 'cl_03'
  }
];

export const MOCK_MESSAGES: Message[] = [
  // Conversation 1
  {
    id: 'msg_1_1',
    conversationId: 'conv_1',
    text: 'Selamat siang Pak Hartono, terkait kasus sengketa lahan, tim kami sudah menyusun draft somasi.',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: true
  },
  {
    id: 'msg_1_note',
    conversationId: 'conv_1',
    text: 'Note: Pak Hartono agak sensitif soal waktu, pastikan draft dikirim sebelum jam 5 sore. @Christian tolong review final.',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    isRead: true,
    isInternal: true // INTERNAL NOTE
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
    isRead: true
  },
  // Conversation 3 (IG)
  {
    id: 'msg_3_1',
    conversationId: 'conv_3',
    text: 'Min, biaya daftar merek berapa ya?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isRead: false
  }
];
