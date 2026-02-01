
import React from 'react';
import { CaseData } from '@cbp/core';
import { DivisionTag, Badge } from '@cbp/ui';
import { Calendar, CheckCheck, AlertCircle } from 'lucide-react';

interface KanbanCardProps {
  data: CaseData;
  isUrgent?: boolean;
  onClick: (id: string) => void;
  onMoveNext?: (id: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ data, isUrgent, onClick, onMoveNext }) => {
  return (
    <div
      className={`
        relative p-4 rounded-xl shadow-sm border cursor-pointer group transition-all duration-300
        ${isUrgent 
          ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50 ring-1 ring-red-200 dark:ring-red-900/30' 
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-cbp-gold'
        }
      `}
      onClick={() => onClick(data.id)}
    >
      {/* Urgent Label Overlay */}
      {isUrgent && (
        <div className="absolute -top-2 -right-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm border border-red-200 dark:border-red-800">
           <AlertCircle className="h-3 w-3" /> Prioritas
        </div>
      )}

      {/* Header Info */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0 mr-2">
          <h4 className="font-bold text-sm text-cbp-navy dark:text-white truncate">
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
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Calendar className="h-3 w-3" />
          <span>{data.lastUpdate}</span>
        </div>
        
        {/* Verification Action Button */}
        {onMoveNext && data.lifecycle !== 'ARCHIVED' && (
          <button 
            onClick={(e) => { e.stopPropagation(); onMoveNext(data.id); }}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-colors"
            title="Verifikasi & Pindah Meja"
          >
            <CheckCheck className="h-3 w-3" /> Proses
          </button>
        )}
      </div>
    </div>
  );
};
