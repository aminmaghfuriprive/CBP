"use client";

import React, { createContext, useContext, useState } from 'react';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice } from '../types';
import { MOCK_CASES, MOCK_BOOKINGS, EVENTS, DOCUMENTS, MOCK_INVOICES, SERVICES } from '../constants';
import { useNotifications } from './NotificationContext';

interface DataContextType {
  cases: CaseData[];
  bookings: Booking[];
  events: CalendarEvent[];
  documents: DocumentFile[];
  invoices: Invoice[];
  addCase: (newCase: CaseData) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addEvent: (event: CalendarEvent) => void;
  addDocument: (doc: DocumentFile) => void;
  deleteDocument: (id: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cases, setCases] = useState<CaseData[]>(MOCK_CASES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [events, setEvents] = useState<CalendarEvent[]>(EVENTS);
  const [documents, setDocuments] = useState<DocumentFile[]>(DOCUMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const { addNotification } = useNotifications();

  const addCase = (newCase: CaseData) => {
    setCases(prev => [newCase, ...prev]);
    addNotification('Kasus Baru Dibuat', `Kasus untuk ${newCase.clientName} telah ditambahkan ke sistem.`, 'success');
  };

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));

    if (status === 'Confirmed') {
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        // Find division based on serviceType
        const service = SERVICES.find(s => s.title === booking.serviceType);
        const division = service?.division || 'Christian Law Firm';

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
    } else if (status === 'Rejected') {
      addNotification('Booking Ditolak', 'Status booking telah diperbarui.', 'info');
    }
  };

  const addDocument = (doc: DocumentFile) => {
    setDocuments(prev => [doc, ...prev]);
    addNotification('Upload Berhasil', `Dokumen ${doc.name} berhasil disimpan ke database.`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    addNotification('Dokumen Dihapus', 'File telah dihapus dari sistem arsip.', 'warning');
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
    addNotification('Invoice Dibuat', `Tagihan untuk ${invoice.clientName} telah diterbitkan.`, 'success');
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    addNotification('Status Invoice Diperbarui', `Status tagihan telah diubah menjadi ${status}.`, 'info');
  };

  return (
    <DataContext.Provider value={{ 
      cases, bookings, events, documents, invoices, 
      addCase, updateBookingStatus, addEvent, addDocument, deleteDocument, 
      addInvoice, updateInvoiceStatus 
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