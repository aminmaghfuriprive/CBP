
import React from 'react';
import { KanbanBoard } from '../../../cases/board/KanbanBoard';
import { StageFilterType } from '../hooks/useInternalDashboard';

interface DashboardWorkspaceProps {
  searchTerm: string;
  stageFilter: StageFilterType;
}

export const DashboardWorkspace: React.FC<DashboardWorkspaceProps> = ({ searchTerm, stageFilter }) => {
  return (
    <div className="h-full flex flex-col">
       {/* Info Banner */}
       {stageFilter === 'ALL' && (
         <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="font-bold">Info:</span> 
            Menampilkan seluruh alur kerja. Geser ke kanan untuk melihat tahapan selanjutnya.
         </div>
       )}
       
       <div className="flex-1 min-h-0">
          <KanbanBoard 
            searchTerm={searchTerm} 
            stageFilter={stageFilter} 
          />
       </div>
    </div>
  );
};
