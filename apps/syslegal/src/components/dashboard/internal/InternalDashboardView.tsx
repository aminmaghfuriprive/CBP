
"use client";

import React, { useState } from 'react';
import { useAuth, useInternalStats } from '@cbp/core';
import { PageHeader, SearchInput } from '@cbp/ui';
import { InternalStatsGrid } from './InternalStatsGrid';
import { DivisionWorkloadChart } from './DivisionWorkloadChart';
import { KanbanBoard } from '../../cases/board/KanbanBoard';
import { LayoutDashboard, PieChart } from 'lucide-react';

export const InternalDashboardView: React.FC = () => {
  const { user } = useAuth();
  const stats = useInternalStats();
  const [activeTab, setActiveTab] = useState<'workspace' | 'analytics'>('workspace');
  const [searchQuery, setSearchQuery] = useState('');

  const roleLabel = user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase().replace('_', ' ') : 'Staff';

  return (
    <div className="space-y-6 pb-10 h-full flex flex-col">
      {/* Header & Tabs */}
      <div className="flex-shrink-0">
        <PageHeader 
          title={`Dashboard ${roleLabel}`}
          subtitle="Pusat kendali operasional dan wawasan performa firma." 
        />

        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`pb-3 px-1 text-sm font-bold flex items-center gap-2 transition-all relative ${
                activeTab === 'workspace' 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> Workspace (Kanban)
              {activeTab === 'workspace' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 px-1 text-sm font-bold flex items-center gap-2 transition-all relative ${
                activeTab === 'analytics' 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <PieChart className="h-4 w-4" /> Global Analytics
              {activeTab === 'analytics' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
            </button>
          </div>

          {activeTab === 'workspace' && (
             <div className="pb-2 w-64">
                <SearchInput 
                   placeholder="Filter kasus..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="shadow-sm"
                />
             </div>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'workspace' ? (
          <div className="h-full flex flex-col">
             <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
                <span className="font-bold">Info Sistem:</span> 
                Kasus dengan status "Urgent" atau "Menunggu" akan otomatis diprioritaskan di posisi paling atas. Perpindahan meja (Fase) memerlukan verifikasi manual sistem.
             </div>
             <div className="flex-1 overflow-hidden">
                <KanbanBoard searchTerm={searchQuery} />
             </div>
          </div>
        ) : (
          <div className="space-y-8 overflow-y-auto pb-10">
            <InternalStatsGrid 
              activeCases={stats.activeCases}
              overdueCount={stats.overdueCount}
              completedCases={stats.completedCases}
              todaysEventsCount={stats.todaysEventsCount}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DivisionWorkloadChart data={stats.chartData} />
              {/* Additional Analytics Placeholder */}
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
