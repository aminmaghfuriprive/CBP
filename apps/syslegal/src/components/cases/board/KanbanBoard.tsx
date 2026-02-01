
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useKanbanLogic } from './useKanbanLogic';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  searchTerm: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ searchTerm }) => {
  const router = useRouter();
  const { columns, handleDrop, handleMoveNext } = useKanbanLogic(searchTerm);

  const handleCardClick = (id: string) => {
    router.push(`/app/cases/${id}`);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-280px)] overflow-x-auto pb-4 items-start min-w-full">
      <KanbanColumn 
        title="Pra-Produksi" 
        stage="PRE_PRODUCTION"
        cases={columns.PRE_PRODUCTION}
        color="yellow"
        onDrop={handleDrop}
        onCardClick={handleCardClick}
        onCardMove={handleMoveNext}
      />
      
      <KanbanColumn 
        title="Produksi (Pengerjaan)" 
        stage="PRODUCTION"
        cases={columns.PRODUCTION}
        color="blue"
        onDrop={handleDrop}
        onCardClick={handleCardClick}
        onCardMove={handleMoveNext}
      />
      
      <KanbanColumn 
        title="Pasca-Produksi" 
        stage="POST_PRODUCTION"
        cases={columns.POST_PRODUCTION}
        color="green"
        onDrop={handleDrop}
        onCardClick={handleCardClick}
        onCardMove={handleMoveNext}
      />
      
      <KanbanColumn 
        title="Arsip Digital" 
        stage="ARCHIVED"
        cases={columns.ARCHIVED}
        color="slate"
        onDrop={handleDrop}
        onCardClick={handleCardClick}
        onCardMove={handleMoveNext}
      />
    </div>
  );
};
