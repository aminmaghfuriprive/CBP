
"use client";

import React from 'react';
import { ClientData, CaseData, Invoice, DocumentFile, CalendarEvent } from '@cbp/core';
import { ClientViewMode } from '../molecules/ClientDirectoryCard';
import { Card } from '@cbp/ui';

// Logic Hook
import { useClientWorkspace } from '../hooks/useClientWorkspace';

// Molecules & Atoms
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';

// Workspace Sub-views (Step 2)
import { WorkspaceOverview } from './workspace/WorkspaceOverview';
import { WorkspaceCases } from './workspace/WorkspaceCases';
import { WorkspaceAgenda } from './workspace/WorkspaceAgenda';
import { WorkspaceDocuments } from './workspace/WorkspaceDocuments';
import { WorkspaceBilling } from './workspace/WorkspaceBilling';

interface ClientWorkspacePanelProps {
  client: ClientData;
  activeView: ClientViewMode;
  cases: CaseData[];
  invoices: Invoice[];
  documents: DocumentFile[];
  events: CalendarEvent[];
  onViewCase: (id: string) => void;
}

export const ClientWorkspacePanel: React.FC<ClientWorkspacePanelProps> = (props) => {
  // 1. Logic Layer via Custom Hook
  const {
    containerRef,
    clientCases,
    clientInvoices,
    clientEvents,
    stats
  } = useClientWorkspace(props);

  const { client, activeView, documents, onViewCase } = props;

  return (
    <div 
      ref={containerRef}
      className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-6"
    >
      {/* 2. Fixed Header */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
         <ClientProfileHeader client={client} />
      </Card>

      {/* 3. Dynamic Content Switcher */}
      <div className="min-h-0">
        {activeView === 'overview' && <WorkspaceOverview client={client} stats={stats} />}
        
        {activeView === 'cases' && <WorkspaceCases cases={clientCases} onView={onViewCase} />}
        
        {activeView === 'agenda' && <WorkspaceAgenda events={clientEvents} />}
        
        {activeView === 'documents' && (
          <WorkspaceDocuments 
            clientId={client.id} 
            clientName={client.name} 
            documents={documents} 
          />
        )}
        
        {activeView === 'billing' && <WorkspaceBilling invoices={clientInvoices} />}
      </div>
    </div>
  );
};
