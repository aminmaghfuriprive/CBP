
"use client";

import React, { createContext, useContext } from 'react';
import { CaseData, Booking, CalendarEvent, DocumentFile, Invoice, ClientData, User, Conversation, Message, AttendanceRecord, PayrollSlip } from '../types';
import { SERVICES } from '../data/services';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';
import { useCaseLogic } from '../hooks/useCaseLogic';
import { useBookingLogic } from '../hooks/useBookingLogic';
import { useScheduleLogic } from '../hooks/useScheduleLogic';
import { useDocumentLogic } from '../hooks/useDocumentLogic';
import { useFinanceLogic } from '../hooks/useFinanceLogic';
import { useClientLogic } from '../hooks/useClientLogic';
import { useEmployeeLogic } from '../hooks/useEmployeeLogic';
import { useOmnichannelLogic } from '../hooks/useOmnichannelLogic';
import { useAttendanceLogic } from '../hooks/useAttendanceLogic';
import { usePayrollLogic } from '../hooks/usePayrollLogic';

interface DataContextType {
  cases: CaseData[];
  bookings: Booking[];
  events: CalendarEvent[];
  documents: DocumentFile[];
  invoices: Invoice[];
  clients: ClientData[];
  employees: User[];
  
  // Omnichannel
  conversations: Conversation[];
  activeMessages: Message[];
  selectedConversationId: string | null;
  selectConversation: (id: string) => void;
  sendMessage: (text: string) => void;

  // Attendance
  attendanceHistory: AttendanceRecord[];
  todayRecord: AttendanceRecord | undefined;
  clockIn: () => Promise<void>;
  clockOut: () => Promise<void>;

  // Payroll
  payrolls: PayrollSlip[];
  createSlip: (slip: PayrollSlip) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;

  addCase: (newCase: CaseData) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addEvent: (event: CalendarEvent) => void;
  addDocument: (doc: DocumentFile) => void;
  deleteDocument: (id: string) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  addClient: (client: ClientData) => void;
  addEmployee: (employee: User) => void;
  updateEmployee: (id: string, updates: Partial<User>) => void;
  deleteEmployee: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth(); // Need current user for attendance
  const { cases, addCase } = useCaseLogic();
  const { bookings, addBooking, updateBookingStatus: _updateBooking } = useBookingLogic();
  const { events, addEvent } = useScheduleLogic();
  const { documents, addDocument, deleteDocument } = useDocumentLogic();
  const { invoices, addInvoice, updateInvoiceStatus } = useFinanceLogic();
  const { clients, addClient } = useClientLogic();
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployeeLogic();
  const { conversations, activeMessages, selectedConversationId, selectConversation, sendMessage } = useOmnichannelLogic();
  const { attendanceHistory, todayRecord, clockIn, clockOut } = useAttendanceLogic(user);
  const { payrolls, createSlip, markAsPaid } = usePayrollLogic();
  const { addNotification } = useNotifications();

  const handleUpdateBooking = (id: string, status: Booking['status']) => {
    _updateBooking(id, status);

    if (status === 'Confirmed') {
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        const service = SERVICES.find(s => s.title === booking.serviceType);
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
      cases, bookings, events, documents, invoices, clients, employees,
      conversations, activeMessages, selectedConversationId, selectConversation, sendMessage,
      attendanceHistory, todayRecord, clockIn, clockOut,
      payrolls, createSlip, markAsPaid,
      addCase, addBooking, updateBookingStatus: handleUpdateBooking, addEvent, 
      addDocument, deleteDocument, addInvoice, updateInvoiceStatus, addClient,
      addEmployee, updateEmployee, deleteEmployee
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
