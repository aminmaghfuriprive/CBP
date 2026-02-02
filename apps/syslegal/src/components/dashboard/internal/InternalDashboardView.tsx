
"use client";

import React, { useState } from 'react';
import { useAuth, useInternalStats, CaseLifecycle } from '@cbp/core';
import { PageHeader, SearchInput } from '@cbp/ui';
import { InternalStatsGrid } from './InternalStatsGrid';
import { DivisionWorkloadChart } from './DivisionWorkloadChart';
import { KanbanBoard } from '../../cases/board/KanbanBoard';
import { LayoutDashboard, PieChart, Layers, CheckCircle2, Archive, Clock } from 'lucide-react';

export const InternalDashboardView: React.FC = () => {
  const { user } = useAuth();
  const stats = useInternalStats();
  
  // View State
  const [activeView, setActiveView] = useState<'workspace' | 'analytics'>('workspace');
  
  // Filter State (Replacing old Tabs)
  const [stageFilter, setStageFilter] = useState<'ALL' | CaseLifecycle>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const roleLabel = user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase().replace('_', ' ') : 'Staff';

  const stages = [
    { id: 'ALL', label: 'Semua Meja', icon: Layers },
    { id: 'PRE_PRODUCTION', label: 'Pra-Produksi', icon: Clock },
    { id: 'PRODUCTION', label: 'Produksi', icon: LayoutDashboard },
    { id: 'POST_PRODUCTION', label: 'Pasca-Produksi', icon: CheckCircle2 },
    { id: 'ARCHIVED', label: 'Arsip Digital', icon: Archive },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Area - Fixed Height */}
      <div className="flex-shrink-0 pb-4">
        <PageHeader 
          title={`Dashboard ${roleLabel}`}
          subtitle="Pusat kendali operasional dan wawasan performa firma."
          action={
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
               <button
                 onClick={() => setActiveView('workspace')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                   activeView === 'workspace' 
                     ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm' 
                     : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                 }`}
               >
                 <LayoutDashboard className="h-3.5 w-3.5" /> Workspace
               </button>
               <button
                 onClick={() => setActiveView('analytics')}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                   activeView === 'analytics' 
                     ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm' 
                     : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                 }`}
               >
                 <PieChart className="h-3.5 w-3.5" /> Analytics
               </button>
            </div>
          }
        />

        {/* Workspace Toolbar (Only visible in Workspace Mode) */}
        {activeView === 'workspace' && (
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-slate-200 dark:border-slate-800 mb-2 gap-4">
            
            {/* Stage Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setStageFilter(stage.id as any)}
                  className={`
                    pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap
                    ${stageFilter === stage.id 
                      ? 'text-cbp-navy dark:text-cbp-gold' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
                  `}
                >
                  <stage.icon className={`h-4 w-4 ${stageFilter === stage.id ? 'text-cbp-gold' : 'text-slate-400'}`} />
                  {stage.label}
                  {stageFilter === stage.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="pb-2 w-full md:w-64">
              <SearchInput 
                  placeholder="Cari nomor kasus / klien..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Content Area - Takes Remaining Height */}
      <div className="flex-1 min-h-0 relative">
        {activeView === 'workspace' ? (
          <div className="absolute inset-0 pb-2"> 
             {/* Using absolute inset-0 forces the child to fit exactly into the flex-1 area */}
             <KanbanBoard 
               searchTerm={searchQuery} 
               stageFilter={stageFilter} 
             />
          </div>
        ) : (
          <div className="h-full overflow-y-auto pb-10 space-y-8 pr-2 custom-scrollbar">
            <InternalStatsGrid 
              activeCases={stats.activeCases}
              overdueCount={stats.overdueCount}
              completedCases={stats.completedCases}
              todaysEventsCount={stats.todaysEventsCount}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DivisionWorkloadChart data={stats.chartData} />
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center text-slate-400 text-sm border-dashed">
                 Grafik Finansial & Performa Tim (Segera Hadir)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
