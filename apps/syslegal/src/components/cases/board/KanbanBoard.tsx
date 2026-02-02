
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useKanbanLogic } from './useKanbanLogic';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { CaseLifecycle } from '@cbp/core';

interface KanbanBoardProps {
  searchTerm: string;
  stageFilter?: 'ALL' | CaseLifecycle;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ searchTerm, stageFilter = 'ALL' }) => {
  const router = useRouter();
  const { columns, handleMoveNext, getPriorityScore } = useKanbanLogic(searchTerm);

  const handleCardClick = (id: string) => {
    router.push(`/app/cases/${id}`);
  };

  // --- MODE 1: ALL STAGES (Responsive: Scroll on Mobile, Grid on Desktop) ---
  if (stageFilter === 'ALL') {
    return (
      <div className="h-full w-full overflow-hidden">
        <div className="h-full flex flex-row lg:grid lg:grid-cols-4 gap-4 px-1 pb-4 overflow-x-auto lg:overflow-visible custom-scrollbar snap-x snap-mandatory lg:snap-none">
          
          <KanbanColumn 
            title="Pra-Produksi" 
            stage="PRE_PRODUCTION"
            cases={columns.PRE_PRODUCTION}
            color="yellow"
            onCardClick={handleCardClick}
            onCardMove={handleMoveNext}
            priorityFn={getPriorityScore}
          />
          
          <KanbanColumn 
            title="Produksi (Pengerjaan)" 
            stage="PRODUCTION"
            cases={columns.PRODUCTION}
            color="blue"
            onCardClick={handleCardClick}
            onCardMove={handleMoveNext}
            priorityFn={getPriorityScore}
          />
          
          <KanbanColumn 
            title="Pasca-Produksi" 
            stage="POST_PRODUCTION"
            cases={columns.POST_PRODUCTION}
            color="green"
            onCardClick={handleCardClick}
            onCardMove={handleMoveNext}
            priorityFn={getPriorityScore}
          />
          
          <KanbanColumn 
            title="Arsip Digital" 
            stage="ARCHIVED"
            cases={columns.ARCHIVED}
            color="slate"
            onCardClick={handleCardClick}
            onCardMove={handleMoveNext}
            priorityFn={getPriorityScore}
          />
          
          {/* Spacer for right padding in mobile scroll view only */}
          <div className="w-1 flex-shrink-0 lg:hidden"></div>
        </div>
      </div>
    );
  }

  // --- MODE 2: SPECIFIC STAGE (Grid View) ---
  const activeData = columns[stageFilter];
  
  if (!activeData || activeData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
        <p className="text-slate-400 font-medium">Tidak ada kasus di tahap ini.</p>
        <p className="text-xs text-slate-400 mt-1">Coba ubah filter atau pencarian.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeData.map((c) => (
          <KanbanCard 
            key={c.id}
            data={c}
            isUrgent={getPriorityScore(c) > 50}
            onClick={handleCardClick}
            onMoveNext={handleMoveNext}
          />
        ))}
      </div>
    </div>
  );
};
