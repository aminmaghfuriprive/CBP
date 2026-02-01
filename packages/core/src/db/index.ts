
import Dexie, { type Table } from 'dexie';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ServiceItem, Article, ClientData, User, Conversation, Message, AttendanceRecord, PayrollSlip, RoleConfig, SocialAccount, SocialPost, DocumentTemplate, AyrshareConfig, PortfolioItem, Notification, Lead } from '../types';
import { MOCK_CASES } from '../data/mock_cases';
import { MOCK_BOOKINGS, EVENTS } from '../data/mock_calendar';
import { DOCUMENTS, ARTICLES } from '../data/mock_content';
import { MOCK_INVOICES } from '../data/mock_finance';
import { SERVICES } from '../data/services';
import { CLIENTS, MOCK_USERS_DB } from '../data/mock_users';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../data/mock_omnichannel';
import { MOCK_PAYROLL } from '../data/mock_payroll';
import { MOCK_ROLES } from '../data/mock_roles';
import { MOCK_SOCIAL_ACCOUNTS, MOCK_SOCIAL_POSTS } from '../data/mock_social';
import { MOCK_TEMPLATES } from '../data/mock_templates';
import { MOCK_PORTFOLIO } from '../data/mock_portfolio';

export class CBPDatabase extends Dexie {
  cases!: Table<CaseData, string>;
  bookings!: Table<Booking, string>;
  events!: Table<CalendarEvent, string>;
  documents!: Table<DocumentFile, string>;
  invoices!: Table<Invoice, string>;
  services!: Table<ServiceItem, string>;
  articles!: Table<Article, string>;
  clients!: Table<ClientData, string>;
  users!: Table<User, string>;
  conversations!: Table<Conversation, string>;
  messages!: Table<Message, string>;
  attendance!: Table<AttendanceRecord, string>;
  payroll!: Table<PayrollSlip, string>;
  roles!: Table<RoleConfig, string>;
  socialAccounts!: Table<SocialAccount, string>;
  socialPosts!: Table<SocialPost, string>;
  templates!: Table<DocumentTemplate, string>;
  ayrshareConfig!: Table<AyrshareConfig, string>;
  portfolios!: Table<PortfolioItem, string>;
  notifications!: Table<Notification, string>;
  leads!: Table<Lead, string>; // New Table

  constructor() {
    super('CBPDatabase');
    
    // Bump version to 22 to ensure leads table creation triggers for existing users
    (this as any).version(22).stores({
      cases: 'id, status, lifecycle, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title', 
      articles: 'id, category, date',
      clients: 'id, name, industry',
      users: 'id, name, email, role, division',
      conversations: 'id, channel, lastMessage, timestamp', 
      messages: 'id, conversationId, timestamp',
      attendance: 'id, userId, date, status',
      payroll: 'id, employeeId, period, status',
      roles: 'id, roleCode, label',
      socialAccounts: 'id, platform, isConnected',
      socialPosts: 'id, date, status',
      templates: 'id, type, isActive',
      ayrshareConfig: 'id',
      portfolios: 'id, category, clientIndustry',
      notifications: 'id, read, recipientRole, timestamp',
      leads: 'id, status, source, interest' // New Schema
    });

    (this as any).on('populate', () => {
      this.cases.bulkAdd(MOCK_CASES);
      this.bookings.bulkAdd(MOCK_BOOKINGS);
      this.events.bulkAdd(EVENTS);
      this.documents.bulkAdd(DOCUMENTS);
      this.invoices.bulkAdd(MOCK_INVOICES);
      this.articles.bulkAdd(ARTICLES);
      this.services.bulkAdd(SERVICES);
      this.clients.bulkAdd(CLIENTS);
      this.users.bulkAdd(MOCK_USERS_DB);
      this.conversations.bulkAdd(MOCK_CONVERSATIONS);
      this.messages.bulkAdd(MOCK_MESSAGES);
      this.payroll.bulkAdd(MOCK_PAYROLL);
      this.roles.bulkAdd(MOCK_ROLES);
      this.socialAccounts.bulkAdd(MOCK_SOCIAL_ACCOUNTS);
      this.socialPosts.bulkAdd(MOCK_SOCIAL_POSTS);
      this.templates.bulkAdd(MOCK_TEMPLATES);
      this.portfolios.bulkAdd(MOCK_PORTFOLIO);
      
      // Mock Leads (Only populated on fresh DB creation)
      this.leads.bulkAdd([
        { id: 'lead_1', name: 'Sari Roti (Cabang)', contact: '0812345678', interest: 'Perizinan PIRT', source: 'Website', status: 'New', createdAt: new Date().toISOString() },
        { id: 'lead_2', name: 'Pak Bambang', contact: '0819876543', interest: 'Sengketa Lahan', source: 'Referral', status: 'Contacted', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: 'lead_3', name: 'CV Tech Maju', contact: '0856789012', interest: 'Kontrak Kerjasama', source: 'Social Media', status: 'Qualified', createdAt: new Date(Date.now() - 172800000).toISOString() }
      ]);

      this.notifications.add({
        id: 'n_initial',
        title: 'Sistem Aktif',
        message: 'Selamat datang di CBP Integrated Legal System.',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString()
      });
    });
  }

  async resetDatabase() {
    await (this as any).delete();
    window.location.reload();
  }
}

export const db = new CBPDatabase();
