
import React from 'react';
import { SearchInput } from '@cbp/ui';
import { TabView } from './client-page.config';

// View Components (Organisms)
import { ClientListView } from './ClientListView';
import { CaseListView } from '../cases/CaseListView';
import { DocumentRepositoryView } from '../documents/DocumentRepositoryView';
import { KanbanBoard } from '../cases/board/KanbanBoard';
import { ScheduleView } from '../agenda/ScheduleView';
import { DocumentVerificationList } from '../verification/DocumentVerificationList';

// Molecules
import { ViewModeToggle } from './molecules/ViewModeToggle';

interface ClientPageContentProps {
  activeTab: TabView;
  caseViewMode: 'list' | 'board';
  setCaseViewMode: (mode: 'list' | 'board') => void;
  boardSearch: string;
  setBoardSearch: (term: string) => void;
}

export const ClientPageContent: React.FC<ClientPageContentProps> = ({
  activeTab,
  caseViewMode,
  setCaseViewMode,
  boardSearch,
  setBoardSearch
}) => {
  // 1. Tab: Direktori Klien
  if (activeTab === 'clients') {
    return <ClientListView />;
  }
  
  // 2. Tab: Manajemen Kasus (List / Kanban)
  if (activeTab === 'cases') {
    return (
      <div className="flex flex-col h-full space-y-4 max-w-7xl mx-auto">
         {/* Local Toolbar for Cases Tab */}
         <div className="flex justify-between items-center">
            {caseViewMode === 'board' ? (
              <div className="w-full max-w-md">
                <SearchInput 
                  placeholder="Cari kartu kasus..." 
                  value={boardSearch}
                  onChange={(e) => setBoardSearch(e.target.value)}
                  className="bg-white dark:bg-slate-900 shadow-sm"
                />
              </div>
            ) : <div />}

            <ViewModeToggle 
              mode={caseViewMode} 
              onChange={setCaseViewMode} 
            />
         </div>

         {/* Content Switcher */}
         {caseViewMode === 'list' ? (
            <CaseListView />
         ) : (
            <div className="flex-1 min-h-0 overflow-hidden">
               <KanbanBoard searchTerm={boardSearch} />
            </div>
         )}
      </div>
    );
  }

  // 3. Tab: Agenda & Jadwal
  if (activeTab === 'agenda') {
    return (
      <div className="max-w-7xl mx-auto">
        <ScheduleView />
      </div>
    );
  }

  // 4. Tab: Validasi Dokumen
  if (activeTab === 'verification') {
    return (
      <div className="max-w-7xl mx-auto">
        <DocumentVerificationList />
      </div>
    );
  }

  // 5. Tab: Repository Dokumen
  if (activeTab === 'documents') {
    return (
      <div className="max-w-7xl mx-auto">
        <DocumentRepositoryView />
      </div>
    );
  }

  return null;
};
