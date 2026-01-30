
import Dexie, { type Table } from 'dexie';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ServiceItem, Article, ClientData, User, Conversation, Message, AttendanceRecord, PayrollSlip } from '../types';
import { MOCK_CASES } from '../data/mock_cases';
import { MOCK_BOOKINGS, EVENTS } from '../data/mock_calendar';
import { DOCUMENTS, ARTICLES } from '../data/mock_content';
import { MOCK_INVOICES } from '../data/mock_finance';
import { SERVICES } from '../data/services';
import { CLIENTS, MOCK_USERS_DB } from '../data/mock_users';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from '../data/mock_omnichannel';
import { MOCK_PAYROLL } from '../data/mock_payroll';

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

  constructor() {
    super('CBPDatabase');
    
    // Previous versions
    (this as any).version(1).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName'
    });
    
    (this as any).version(9).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title', 
      articles: 'id, category, date',
      clients: 'id, name, industry',
      users: 'id, name, email, role, division',
      conversations: 'id, channel, lastMessage',
      messages: 'id, conversationId, timestamp',
      attendance: 'id, userId, date, status'
    });

    // Version 10: Payroll
    (this as any).version(10).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title', 
      articles: 'id, category, date',
      clients: 'id, name, industry',
      users: 'id, name, email, role, division',
      conversations: 'id, channel, lastMessage',
      messages: 'id, conversationId, timestamp',
      attendance: 'id, userId, date, status',
      payroll: 'id, employeeId, period, status'
    }).upgrade(async (trans: any) => {
       await trans.table('payroll').clear();
       await trans.table('payroll').bulkAdd(MOCK_PAYROLL);
    });

    // Version 11: Fix missing timestamp index on conversations
    (this as any).version(11).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title', 
      articles: 'id, category, date',
      clients: 'id, name, industry',
      users: 'id, name, email, role, division',
      conversations: 'id, channel, lastMessage, timestamp', // Added timestamp index here
      messages: 'id, conversationId, timestamp',
      attendance: 'id, userId, date, status',
      payroll: 'id, employeeId, period, status'
    });

    // Populate data
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
    });
  }
}

export const db = new CBPDatabase();
