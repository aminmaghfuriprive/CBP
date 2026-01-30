
"use client";

import React, { createContext, useContext } from 'react';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ClientData } from '../types';
import { SERVICES } from '../data/services';
import { useNotifications } from './NotificationContext';
import { useCaseLogic } from '../hooks/useCaseLogic';
import { useBookingLogic } from '../hooks/useBookingLogic';
import { useScheduleLogic } from '../hooks/useScheduleLogic';
import { useDocumentLogic } from '../hooks/useDocumentLogic';
import { useFinanceLogic } from '../hooks/useFinanceLogic';
import { useClientLogic } from '../hooks/useClientLogic';

interface DataContextType {
  cases: CaseData[];
  bookings: Booking[];
  events: CalendarEvent[];
  documents: DocumentFile[];
  invoices: Invoice[];
  clients: ClientData[];
  addCase: (newCase: CaseData) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addEvent: (event: CalendarEvent) => void;
  addDocument: (doc: DocumentFile) => void;
  deleteDocument: (id: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  addClient: (client: ClientData) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { cases, addCase } = useCaseLogic();
  const { bookings, addBooking, updateBookingStatus: _updateBooking } = useBookingLogic();
  const { events, addEvent } = useScheduleLogic();
  const { documents, addDocument, deleteDocument } = useDocumentLogic();
  const { invoices, addInvoice, updateInvoiceStatus } = useFinanceLogic();
  const { clients, addClient } = useClientLogic();
  const { addNotification } = useNotifications();

  const handleUpdateBooking = (id: string, status: Booking['status']) => {
    _updateBooking(id, status);

    if (status === 'Confirmed') {
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        const service = SERVICES.find(s => s.title === booking.serviceType);
        // Fallback ke divisi umum jika service tidak ditemukan
        const division = service?.division || 'Legal Administratif & Korporasi';

        const newCase: CaseData = {
          id: `c${Date.now()}`,
          clientName: booking.clientName,
          caseType: booking.serviceType,
          division: division,
          status: 'Aktif',
          currentStage: '1_permintaan_awal',
          lastUpdate: new Date().toISOString().split('T')[0],
          description: `Berasal dari booking: ${booking.notes}`
        };
        addCase(newCase);

        addEvent({
          id: `e${Date.now()}`,
          title: `Konsultasi: ${booking.clientName}`,
          date: booking.date,
          time: booking.time,
          type: 'Konsultasi',
          client: booking.clientName
        });
        
        addNotification('Booking Dikonfirmasi', `Jadwal konsultasi dengan ${booking.clientName} telah diatur.`, 'success');
      }
    }
  };

  return (
    <DataContext.Provider value={{ 
      cases, bookings, events, documents, invoices, clients,
      addCase, addBooking, updateBookingStatus: handleUpdateBooking, addEvent, 
      addDocument, deleteDocument, addInvoice, updateInvoiceStatus, addClient
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
