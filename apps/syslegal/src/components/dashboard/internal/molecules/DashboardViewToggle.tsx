
import React from 'react';
import { LayoutDashboard, PieChart } from 'lucide-react';
import { DashboardViewType } from '../hooks/useInternalDashboard';

interface DashboardViewToggleProps {
  activeView: DashboardViewType;
  onToggle: (view: DashboardViewType) => void;
}

export const DashboardViewToggle: React.FC<DashboardViewToggleProps> = ({ activeView, onToggle }) => {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => onToggle('workspace')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
          activeView === 'workspace'
            ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <LayoutDashboard className="h-3.5 w-3.5" /> Workspace
      </button>
      <button
        onClick={() => onToggle('analytics')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
          activeView === 'analytics'
            ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
        }`}
      >
        <PieChart className="h-3.5 w-3.5" /> Analytics
      </button>
    </div>
  );
};
