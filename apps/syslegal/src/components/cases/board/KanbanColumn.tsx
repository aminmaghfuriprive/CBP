
import React from 'react';
import { CaseData, CaseLifecycle } from '@cbp/core';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  stage: CaseLifecycle;
  cases: CaseData[];
  onCardClick: (id: string) => void;
  onCardMove: (id: string) => void;
  color: string;
  priorityFn: (c: CaseData) => number;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, cases, onCardClick, onCardMove, color, priorityFn 
}) => {
  
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
      className={`
        flex-shrink-0 flex flex-col h-full rounded-xl border-t-4 shadow-sm snap-center
        w-[85vw] sm:w-72 2xl:w-80 
        bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm
        ${getColorClass()}
      `}
    >
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between flex-shrink-0 border-b border-white/50 dark:border-slate-800/50">
        <h3 className="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wide truncate pr-2">
          {title}
        </h3>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getBadgeClass()}`}>
          {cases.length}
        </span>
      </div>

      {/* Cards Container - Internal Scroll */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar min-h-0">
        {cases.map(c => (
          <KanbanCard 
            key={c.id} 
            data={c} 
            isUrgent={priorityFn(c) > 50}
            onClick={onCardClick}
            onMoveNext={onCardMove}
          />
        ))}
        {cases.length === 0 && (
          <div className="h-full min-h-[120px] border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-xl flex flex-col items-center justify-center text-slate-400 text-xs italic bg-white/30 dark:bg-slate-800/30">
            <span>Kosong</span>
          </div>
        )}
      </div>
    </div>
  );
};
