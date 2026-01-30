
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
    
    // Version 1-4 History
    (this as any).version(1).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName'
    });
    // ... history versions 2, 3, 4 omitted for brevity but logic remains ...
    (this as any).version(4).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title',
      articles: 'id, category, date'
    });

    // Version 5: Re-seed Services with New Division Structure
    (this as any).version(5).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title', 
      articles: 'id, category, date'
    }).upgrade(async (trans: any) => {
       // Clear old services and add new ones from the updated source
       await trans.table('services').clear();
       await trans.table('services').bulkAdd(SERVICES);
    });

    // Populate data awal untuk instalasi baru
    (this as any).on('populate', () => {
      this.cases.bulkAdd(MOCK_CASES);
      this.bookings.bulkAdd(MOCK_BOOKINGS);
      this.events.bulkAdd(EVENTS);
      this.documents.bulkAdd(DOCUMENTS);
      this.invoices.bulkAdd(MOCK_INVOICES);
      this.articles.bulkAdd(ARTICLES);
      this.services.bulkAdd(SERVICES);
    });
  }
}

export const db = new CBPDatabase();
