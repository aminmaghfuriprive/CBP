
import Dexie, { type Table } from 'dexie';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ServiceItem } from '../types';
import { MOCK_CASES } from '../data/mock_cases';
import { MOCK_BOOKINGS, EVENTS } from '../data/mock_calendar';
import { DOCUMENTS } from '../data/mock_content';
import { MOCK_INVOICES } from '../data/mock_finance';
import { SERVICES } from '../data/services';

export class CBPDatabase extends Dexie {
  cases!: Table<CaseData, string>;
  bookings!: Table<Booking, string>;
  events!: Table<CalendarEvent, string>;
  documents!: Table<DocumentFile, string>;
  invoices!: Table<Invoice, string>;
  services!: Table<ServiceItem, string>;

  constructor() {
    super('CBPDatabase');
    
    // Schema definition
    (this as any).version(1).stores({
      cases: 'id, status, clientName, division',
      bookings: 'id, status, date',
      events: 'id, date, type, client',
      documents: 'id, category, type',
      invoices: 'id, status, clientName',
      services: 'id, division, title'
    });

    // Populate data awal
    (this as any).on('populate', () => {
      this.cases.bulkAdd(MOCK_CASES);
      this.bookings.bulkAdd(MOCK_BOOKINGS);
      this.events.bulkAdd(EVENTS);
      this.documents.bulkAdd(DOCUMENTS);
      this.invoices.bulkAdd(MOCK_INVOICES);
      
      // Populate services dengan default value untuk field baru
      const initialServices = SERVICES.map(s => ({
        ...s,
        basePrice: 5000000, // Default price mockup
        isActive: true
      }));
      this.services.bulkAdd(initialServices);
    });
  }
}

export const db = new CBPDatabase();
