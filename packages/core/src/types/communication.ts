
import { UserRole } from './auth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
  timestamp: string;
  recipientRole?: UserRole; // Target spesifik role (e.g. FINANCE)
  recipientId?: string; // Target user ID spesifik
  actionUrl?: string; // Klik notif ke mana
}

export type ChannelType = 'WHATSAPP' | 'EMAIL' | 'INSTAGRAM' | 'LINKEDIN';

export interface Conversation {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  channel: ChannelType;
  tags: string[];
  relatedClientId?: string; 
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'agent' | 'user';
  timestamp: string;
  isRead: boolean;
  isInternal?: boolean; 
  attachments?: { name: string; url: string; type: 'image' | 'file' }[];
}

export type SocialPlatform = 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER' | 'GMB';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  handle: string;
  followers: number;
  isConnected: boolean;
  lastSync: string;
  avatarUrl?: string; 
}

export type BlastStatus = 'Draft' | 'Sending' | 'Sent' | 'Partial' | 'Failed';

export interface SocialPost {
  id: string;
  content: string;
  platforms: SocialPlatform[];
  mediaUrl?: string; 
  shortenLinks?: boolean;
  date: string;
  likes: number; 
  comments?: number;
  shares: number;
  status: BlastStatus;
}

export interface AyrshareConfig {
  id: string;
  apiKey: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface AyrshareProfile {
  title: string;
  refId: string;
  platform: string;
  username: string;
  avatarUrl?: string;
}
