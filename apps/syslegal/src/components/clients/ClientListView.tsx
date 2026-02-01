
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData, ClientData, useClientLogic, DocumentFile } from '@cbp/core';
import { ClientDirectoryPanel } from './organisms/ClientDirectoryPanel';
import { ClientWorkspacePanel } from './organisms/ClientWorkspacePanel';
import { ClientDetailModal } from './organisms/ClientDetailModal';

export const ClientListView: React.FC = () => {
  const router = useRouter();
  const { clients, cases, invoices, documents, addClient } = useData();
  
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Derived State
  const selectedClient = clients.find(c => c.id === selectedClientId) || null;

  // Handlers
  const handleSelectClient = (client: ClientData) => {
    setSelectedClientId(client.id);
    // Scroll to top saat masuk detail
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDirectory = () => {
    setSelectedClientId(null);
  };

  const handleViewCase = (caseId: string) => {
    router.push(`/app/cases/${caseId}`);
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 relative min-h-[calc(100vh-140px)]">
      
      {/* KONDISI 1: DETAIL VIEW (WORKSPACE) */}
      {selectedClient ? (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <ClientWorkspacePanel 
            client={selectedClient}
            cases={cases}
            invoices={invoices}
            documents={documents}
            onBack={handleBackToDirectory}
            onViewCase={handleViewCase}
          />
        </div>
      ) : (
        /* KONDISI 2: LIST VIEW (DIRECTORY GRID) */
        <div className="animate-in fade-in slide-in-from-left-8 duration-300">
          <ClientDirectoryPanel 
            clients={clients}
            selectedClientId={null} // Tidak ada seleksi visual di mode grid
            onSelect={handleSelectClient}
            onAddNew={() => setIsAddModalOpen(true)}
          />
        </div>
      )}

      {/* Add Client Modal */}
      <ClientDetailModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        client={null} 
      />
    </div>
  );
};
