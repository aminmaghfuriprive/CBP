
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewModeToggleProps {
  mode: 'list' | 'board';
  onChange: (mode: 'list' | 'board') => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ mode, onChange }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex gap-1 border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => onChange('list')}
        title="List View"
        className={`p-2 rounded-md transition-all ${
          mode === 'list' 
            ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' 
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange('board')}
        title="Kanban Board"
        className={`p-2 rounded-md transition-all ${
          mode === 'board' 
            ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' 
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
};
