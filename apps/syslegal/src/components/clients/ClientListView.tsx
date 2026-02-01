
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData, ClientData, DocumentFile } from '@cbp/core';
import { ClientDirectoryPanel } from './organisms/ClientDirectoryPanel';
import { ClientWorkspacePanel } from './organisms/ClientWorkspacePanel';
import { ClientAnalyticsPanel } from './organisms/ClientAnalyticsPanel';
import { ClientDetailModal } from './organisms/ClientDetailModal';
import { ClientViewMode } from './molecules/ClientDirectoryCard';

export const ClientListView: React.FC = () => {
  const router = useRouter();
  const { clients, cases, invoices, documents, events, addClient } = useData();
  
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ClientViewMode>('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Derived State
  const selectedClient = clients.find(c => c.id === selectedClientId) || null;

  // Handlers
  const handleSelectClient = (client: ClientData) => {
    // TOGGLE LOGIC:
    // Jika klien yang sama diklik lagi -> Deselect (Tutup Accordion, Balik ke Analytics)
    if (selectedClientId === client.id) {
        setSelectedClientId(null);
    } else {
        // Jika klien baru -> Select & Reset default tab ke overview
        setSelectedClientId(client.id);
        setActiveView('overview');
    }
  };

  const handleViewChange = (view: ClientViewMode) => {
    setActiveView(view);
  };

  const handleViewCase = (caseId: string) => {
    router.push(`/app/cases/${caseId}`);
  };

  const handleReviewDoc = (doc: DocumentFile) => {
    alert(`Membuka review dokumen: ${doc.name}`);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
      
      {/* LEFT PANEL: Workspace (70%) */}
      <div className="flex-1 min-w-0 relative">
        {selectedClient ? (
          <ClientWorkspacePanel 
            client={selectedClient}
            activeView={activeView}
            cases={cases}
            invoices={invoices}
            documents={documents}
            events={events} // Pass events data
            onViewCase={handleViewCase}
          />
        ) : (
          /* Default Empty State / Global Analytics */
          <ClientAnalyticsPanel 
            clients={clients}
            cases={cases}
            invoices={invoices}
            onReviewDoc={handleReviewDoc}
          />
        )}
      </div>

      {/* RIGHT PANEL: Directory & Nav (30%) */}
      <div className="w-80 xl:w-96 flex-shrink-0 h-full">
        <ClientDirectoryPanel 
          clients={clients}
          selectedClientId={selectedClientId}
          activeView={activeView}
          onSelect={handleSelectClient}
          onViewChange={handleViewChange}
          onAddNew={() => setIsAddModalOpen(true)}
        />
      </div>

      {/* Add Client Modal */}
      <ClientDetailModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        client={null} 
      />
    </div>
  );
};
