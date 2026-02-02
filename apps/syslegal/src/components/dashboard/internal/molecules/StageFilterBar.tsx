
import React from 'react';
import { Layers, LayoutDashboard, CheckCircle2, Archive, Clock } from 'lucide-react';
import { StageFilterType } from '../hooks/useInternalDashboard';

interface StageFilterBarProps {
  activeFilter: StageFilterType;
  onFilterChange: (filter: StageFilterType) => void;
}

export const StageFilterBar: React.FC<StageFilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const stages = [
    { id: 'ALL', label: 'Semua Meja', icon: Layers },
    { id: 'PRE_PRODUCTION', label: 'Pra-Produksi', icon: Clock },
    { id: 'PRODUCTION', label: 'Produksi', icon: LayoutDashboard },
    { id: 'POST_PRODUCTION', label: 'Pasca-Produksi', icon: CheckCircle2 },
    { id: 'ARCHIVED', label: 'Arsip Digital', icon: Archive },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => onFilterChange(stage.id as StageFilterType)}
          className={`
            pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap
            ${activeFilter === stage.id
              ? 'text-cbp-navy dark:text-cbp-gold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
          `}
        >
          <stage.icon className={`h-4 w-4 ${activeFilter === stage.id ? 'text-cbp-gold' : 'text-slate-400'}`} />
          {stage.label}
          {activeFilter === stage.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};
