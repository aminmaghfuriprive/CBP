
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData, ClientData, useClientLogic, DocumentFile } from '@cbp/core';
import { ClientDirectoryPanel } from './organisms/ClientDirectoryPanel';
import { ClientAnalyticsPanel } from './organisms/ClientAnalyticsPanel';
import { ClientWorkspacePanel } from './organisms/ClientWorkspacePanel';
import { ClientDetailModal } from './organisms/ClientDetailModal';

export const ClientListView: React.FC = () => {
  const router = useRouter();
  const { clients, cases, invoices, documents, addClient } = useData();
  const { deleteClient } = useClientLogic();
  
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Derived State
  const selectedClient = clients.find(c => c.id === selectedClientId) || null;

  // Handlers
  const handleSelectClient = (client: ClientData) => {
    setSelectedClientId(client.id);
  };

  const handleBackToDashboard = () => {
    setSelectedClientId(null);
  };

  const handleViewCase = (caseId: string) => {
    router.push(`/app/cases/${caseId}`);
  };

  const handleReviewDoc = (doc: DocumentFile) => {
    // Logic untuk navigasi ke tab validasi berkas global jika diperlukan
    // Atau membuka modal review (bisa dikembangkan nanti)
    alert(`Membuka review dokumen: ${doc.name}`);
  };

  const handleSaveNewClient = (newClient: ClientData) => {
    addClient(newClient);
    setIsAddModalOpen(false);
    // Opsional: Auto select client baru
    setSelectedClientId(newClient.id);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
      
      {/* LEFT PANEL: Main Stage (70%) */}
      <div className="flex-1 min-w-0 bg-slate-50/50 dark:bg-slate-950/50 relative">
        {selectedClient ? (
          <ClientWorkspacePanel 
            client={selectedClient}
            cases={cases}
            invoices={invoices}
            documents={documents}
            onBack={handleBackToDashboard}
            onViewCase={handleViewCase}
          />
        ) : (
          <ClientAnalyticsPanel 
            clients={clients}
            cases={cases}
            invoices={invoices}
            onReviewDoc={handleReviewDoc}
          />
        )}
      </div>

      {/* RIGHT PANEL: Directory (30%) */}
      <div className="w-80 xl:w-96 flex-shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full">
        <ClientDirectoryPanel 
          clients={clients}
          selectedClientId={selectedClientId}
          onSelect={handleSelectClient}
          onAddNew={() => setIsAddModalOpen(true)}
        />
      </div>

      {/* Add Client Modal */}
      <ClientDetailModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        client={null} // null triggers "Add New" mode
      />
    </div>
  );
};
