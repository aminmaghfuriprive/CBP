
import React from 'react';
import { CaseData } from '@cbp/core';
import { DivisionTag, Badge } from '@cbp/ui';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface KanbanCardProps {
  data: CaseData;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onClick: (id: string) => void;
  onMoveNext?: (id: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ data, onDragStart, onClick, onMoveNext }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, data.id)}
      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-cbp-gold transition-all group relative"
    >
      {/* Header Info */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 mr-2">
          <h4 
            onClick={() => onClick(data.id)}
            className="font-bold text-sm text-cbp-navy dark:text-white hover:text-cbp-gold dark:hover:text-cbp-gold truncate cursor-pointer transition-colors"
          >
            {data.clientName}
          </h4>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{data.id}</p>
        </div>
        <Badge variant={data.status === 'Aktif' ? 'success' : 'neutral'} className="text-[9px] px-1.5 py-0.5">
          {data.status}
        </Badge>
      </div>

      {/* Body Content */}
      <div className="space-y-2 mb-3">
        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2" title={data.caseType}>
          {data.caseType}
        </p>
        <DivisionTag division={data.division} className="text-[8px] px-1.5 py-0.5" />
      </div>

      {/* Footer Meta & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Calendar className="h-3 w-3" />
          <span>{data.lastUpdate}</span>
        </div>
        
        {/* Mobile/Quick Action: Move Next */}
        {onMoveNext && data.lifecycle !== 'ARCHIVED' && (
          <button 
            onClick={(e) => { e.stopPropagation(); onMoveNext(data.id); }}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-cbp-navy hover:bg-cbp-gold transition-colors opacity-0 group-hover:opacity-100"
            title="Lanjut ke tahap berikutnya"
          >
            <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};
