
import Dexie, { type Table } from 'dexie';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ServiceItem, Article } from '../types';
import { MOCK_CASES } from '../data/mock_cases';
import { MOCK_BOOKINGS, EVENTS } from '../data/mock_calendar';
import { DOCUMENTS, ARTICLES } from '../data/mock_content';
import { MOCK_INVOICES } from '../data/mock_finance';
import { SERVICES } from '../data/services';

export class CBPDatabase extends Dexie {
  cases!: Table<CaseData, string>;
  bookings!: Table<Booking, string>;
  events!: Table<CalendarEvent, string>;
  documents!: Table<DocumentFile, string>;
  invoices!: Table<Invoice, string>;
  services!: Table<ServiceItem, string>;
  articles!: Table<Article, string>;

  constructor() {
    super('CBPDatabase');
    
    // Version 1 (Legacy)
    (this as any).version(1).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName'
    });

    // Version 2 (Add Services Table)
    (this as any).version(2).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title'
    });

    // Version 3 (Add Articles Table for CMS)
    (this as any).version(3).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title',
      articles: 'id, category, date'
    }).upgrade(async (trans: any) => {
      // Populate default articles saat upgrade
      await trans.table('articles').bulkAdd(ARTICLES);
    });

    // Populate data awal (hanya jalan jika database baru dibuat pertama kali)
    (this as any).on('populate', () => {
      this.cases.bulkAdd(MOCK_CASES);
      this.bookings.bulkAdd(MOCK_BOOKINGS);
      this.events.bulkAdd(EVENTS);
      this.documents.bulkAdd(DOCUMENTS);
      this.invoices.bulkAdd(MOCK_INVOICES);
      
      const initialServices = SERVICES.map(s => ({
        ...s,
        basePrice: 5000000, 
        isActive: true
      }));
      this.services.bulkAdd(initialServices);

      this.articles.bulkAdd(ARTICLES);
    });
  }
}

export const db = new CBPDatabase();
