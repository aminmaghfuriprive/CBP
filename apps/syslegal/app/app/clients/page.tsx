
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { useClientPageLogic } from '../../../src/components/clients/hooks/useClientPageLogic';
import { ClientPageTabs } from '../../../src/components/clients/molecules/ClientPageTabs';
import { ClientPageContent } from '../../../src/components/clients/ClientPageContent';

export default function ClientDatabasePage() {
  const {
    activeTab,
    caseViewMode,
    boardSearch,
    pendingDocsCount,
    setCaseViewMode,
    setBoardSearch,
    handleTabChange
  } = useClientPageLogic();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0 px-1">
        <PageHeader 
          title="Database & Perkara" 
          subtitle="Pusat data klien, manajemen kasus, agenda sidang, dan repository dokumen." 
        />

        <ClientPageTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          pendingDocsCount={pendingDocsCount} 
        />
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ClientPageContent 
          activeTab={activeTab}
          caseViewMode={caseViewMode}
          setCaseViewMode={setCaseViewMode}
          boardSearch={boardSearch}
          setBoardSearch={setBoardSearch}
        />
      </div>
    </div>
  );
}
