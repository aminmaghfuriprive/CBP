
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

  // --- MODE 1: ALL STAGES (Horizontal Scroll - Optimized) ---
  if (stageFilter === 'ALL') {
    return (
      // Outer container handles Horizontal Scroll
      <div className="h-full w-full overflow-x-auto overflow-y-hidden custom-scrollbar snap-x snap-mandatory md:snap-none">
        {/* Inner container creates the row */}
        <div className="flex h-full gap-4 px-1 min-w-fit pb-4">
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
          
          {/* Spacer for right padding in scroll view */}
          <div className="w-1 flex-shrink-0"></div>
        </div>
      </div>
    );
  }

  // --- MODE 2: SPECIFIC STAGE (Grid View - Optimized) ---
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
