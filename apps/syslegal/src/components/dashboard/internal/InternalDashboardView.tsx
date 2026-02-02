
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { useInternalDashboard } from './hooks/useInternalDashboard';
import { DashboardViewToggle } from './molecules/DashboardViewToggle';
import { DashboardToolbar } from './molecules/DashboardToolbar';
import { DashboardWorkspace } from './organisms/DashboardWorkspace';
import { DashboardAnalytics } from './organisms/DashboardAnalytics';

export const InternalDashboardView: React.FC = () => {
  // 1. Logic Layer (Abstracted via Hook)
  const { 
    activeView, 
    stageFilter, 
    searchQuery, 
    roleLabel, 
    stats,
    setActiveView,
    setStageFilter,
    setSearchQuery
  } = useInternalDashboard();

  return (
    <div className="space-y-6 pb-10 h-full flex flex-col">
      {/* 2. Header & Controls Layer */}
      <div className="flex-shrink-0">
        <PageHeader 
          title={`Dashboard ${roleLabel}`}
          subtitle="Pusat kendali operasional dan wawasan performa firma."
          action={
            <DashboardViewToggle 
              activeView={activeView} 
              onToggle={setActiveView} 
            />
          }
        />

        {/* Toolbar (Only visible in Workspace Mode) */}
        {activeView === 'workspace' && (
          <DashboardToolbar 
            activeFilter={stageFilter} 
            onFilterChange={setStageFilter} 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        )}
      </div>
      
      {/* 3. Content Layer (Organism Switcher) */}
      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeView === 'workspace' ? (
          <DashboardWorkspace 
            searchTerm={searchQuery} 
            stageFilter={stageFilter} 
          />
        ) : (
          <DashboardAnalytics stats={stats} />
        )}
      </div>
    </div>
  );
};
