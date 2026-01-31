
"use client";

import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { CaseData, Invoice, DocumentFile, CalendarEvent } from '../types';

export const useClientData = () => {
  const { user } = useAuth();
  const { cases, invoices, documents, events } = useData();

  const clientData = useMemo(() => {
    if (!user) {
      return {
        myCases: [],
        myInvoices: [],
        myDocuments: [],
        myEvents: [],
        stats: { activeCases: 0, totalDue: 0, pendingInvoices: 0 }
      };
    }

    // Filter Logic: Match by Name (Case Insensitive) or Email if available
    const nameKey = user.name.toLowerCase();
    
    // 1. Get Cases
    const myCases = cases.filter(c => c.clientName.toLowerCase().includes(nameKey));
    const myCaseIds = myCases.map(c => c.id);
    
    // 2. Get Invoices matched by client name
    const myInvoices = invoices.filter(i => i.clientName.toLowerCase().includes(nameKey));
    
    // 3. Get Documents
    // Logic: 
    // - Jika doc punya relatedCaseId, cek apakah ID-nya ada di myCases.
    // - Jika tidak (legacy data), cek apakah nama filenya mengandung nama client (opsional, better safe match).
    // - Untuk mock demo, kita tampilkan dokumen yang relatedCaseId-nya match ATAU dokumen umum yang tidak ada ownernya (demo).
    const myDocuments = documents.filter(d => {
      if (d.relatedCaseId) {
        return myCaseIds.includes(d.relatedCaseId);
      }
      return false; // Default: hide general docs from client portal unless linked
    });

    // 4. Get Events
    const myEvents = events.filter(e => e.client.toLowerCase().includes(nameKey));

    // Calculate Stats
    const activeCases = myCases.filter(c => c.status === 'Aktif').length;
    const pendingInvoices = myInvoices.filter(i => i.status !== 'Paid');
    const totalDue = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);

    return {
      myCases,
      myInvoices,
      myDocuments,
      myEvents,
      stats: { activeCases, totalDue, pendingInvoices: pendingInvoices.length }
    };
  }, [user, cases, invoices, documents, events]);

  return clientData;
};
