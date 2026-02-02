
import React from 'react';
import { SearchInput } from '@cbp/ui';
import { StageFilterBar } from './StageFilterBar';
import { StageFilterType } from '../hooks/useInternalDashboard';

interface DashboardToolbarProps {
  activeFilter: StageFilterType;
  onFilterChange: (filter: StageFilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-slate-200 dark:border-slate-800 mb-6 gap-4">
      <StageFilterBar 
        activeFilter={activeFilter} 
        onFilterChange={onFilterChange} 
      />
      
      <div className="pb-2 w-full md:w-64">
        <SearchInput
          placeholder="Cari nomor kasus / klien..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="shadow-sm"
        />
      </div>
    </div>
  );
};
