
import React from 'react';
import { CaseData, CaseLifecycle } from '@cbp/core';
import { KanbanCard } from './KanbanCard';
import { MoreHorizontal } from 'lucide-react';

interface KanbanColumnProps {
  title: string;
  stage: CaseLifecycle;
  cases: CaseData[];
  onDrop: (e: React.DragEvent, stage: CaseLifecycle) => void;
  onCardClick: (id: string) => void;
  onCardMove: (id: string) => void;
  color: string; // 'yellow' | 'blue' | 'green' | 'slate'
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, stage, cases, onDrop, onCardClick, onCardMove, color 
}) => {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const getColorClass = () => {
    switch (color) {
      case 'yellow': return 'border-t-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'blue': return 'border-t-blue-500 bg-blue-50/50 dark:bg-blue-900/10';
      case 'green': return 'border-t-green-500 bg-green-50/50 dark:bg-green-900/10';
      default: return 'border-t-slate-500 bg-slate-50/50 dark:bg-slate-800/30';
    }
  };

  const getBadgeClass = () => {
    switch (color) {
      case 'yellow': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400';
      case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400';
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400';
      default: return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-400';
    }
  };

  return (
    <div 
      className={`flex-shrink-0 w-80 flex flex-col h-full rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border-t-4 ${getColorClass()}`}
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, stage)}
    >
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wide">
          {title}
        </h3>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getBadgeClass()}`}>
          {cases.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {cases.map(c => (
          <KanbanCard 
            key={c.id} 
            data={c} 
            onDragStart={(e, id) => e.dataTransfer.setData('text/plain', id)}
            onClick={onCardClick}
            onMoveNext={onCardMove}
          />
        ))}
        {cases.length === 0 && (
          <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
            Kosong
          </div>
        )}
      </div>
    </div>
  );
};
