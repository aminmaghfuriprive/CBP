
"use client";

import { useRef, useEffect, useMemo } from 'react';
import { ClientData, CaseData, Invoice, CalendarEvent } from '@cbp/core';
import { ClientViewMode } from '../molecules/ClientDirectoryCard';

interface UseClientWorkspaceProps {
  client: ClientData;
  activeView: ClientViewMode;
  cases: CaseData[];
  invoices: Invoice[];
  events: CalendarEvent[];
}

export const useClientWorkspace = ({
  client,
  activeView,
  cases,
  invoices,
  events,
}: UseClientWorkspaceProps) => {
  // Ref untuk container scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect: Scroll to top saat tab view berubah
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeView]);

  // Kalkulasi Data & Statistik
  const workspaceData = useMemo(() => {
    // 1. Filter Data Contextual berdasarkan Nama Klien
    const clientCases = cases.filter(c => c.clientName === client.name);
    const clientInvoices = invoices.filter(i => i.clientName === client.name);
    const clientEvents = events.filter(e => e.client === client.name);

    // 2. Hitung Statistik
    const totalCases = clientCases.length;
    const activeCasesCount = clientCases.filter(c => c.status === 'Aktif').length;
    const unpaidAmount = clientInvoices
      .filter(i => i.status !== 'Paid')
      .reduce((sum, i) => sum + i.amount, 0);

    return {
      clientCases,
      clientInvoices,
      clientEvents,
      stats: {
        totalCases,
        activeCasesCount,
        unpaidAmount
      }
    };
  }, [client, cases, invoices, events]);

  return {
    containerRef,
    ...workspaceData
  };
};
