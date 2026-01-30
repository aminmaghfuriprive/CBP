
import Dexie, { type Table } from 'dexie';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ServiceItem, Article, ClientData, User, Conversation, Message, AttendanceRecord, PayrollSlip, RoleConfig, SocialAccount, SocialPost, DocumentTemplate, GBPLocation, GBPReview, GBPUpdate, AyrshareConfig } from '../types';
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
import { MOCK_GBP_LOCATIONS, MOCK_GBP_REVIEWS, MOCK_GBP_UPDATES } from '../data/mock_gbp';

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
  gbpLocations!: Table<GBPLocation, string>;
  gbpReviews!: Table<GBPReview, string>;
  gbpUpdates!: Table<GBPUpdate, string>;
  ayrshareConfig!: Table<AyrshareConfig, string>;

  constructor() {
    super('CBPDatabase');
    
    // Previous versions omitted...
    
    // Version 16: Ayrshare Module
    (this as any).version(16).stores({
      cases: 'id, status, clientName, division',
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
      gbpLocations: 'id, name',
      gbpReviews: 'id, rating, date',
      gbpUpdates: 'id, type, date',
      ayrshareConfig: 'id'
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
      this.gbpLocations.bulkAdd(MOCK_GBP_LOCATIONS);
      this.gbpReviews.bulkAdd(MOCK_GBP_REVIEWS);
      this.gbpUpdates.bulkAdd(MOCK_GBP_UPDATES);
    });
  }
}

export const db = new CBPDatabase();
