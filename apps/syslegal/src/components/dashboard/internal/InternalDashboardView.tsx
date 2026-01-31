
"use client";

import React from 'react';
import { useAuth, useInternalStats } from '@cbp/core';
import { PageHeader } from '@cbp/ui';
import { InternalStatsGrid } from './InternalStatsGrid';
import { DivisionWorkloadChart } from './DivisionWorkloadChart';
import { DeadlineMonitor } from './DeadlineMonitor';

export const InternalDashboardView: React.FC = () => {
  const { user } = useAuth();
  const stats = useInternalStats();

  const roleLabel = user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase().replace('_', ' ') : 'Staff';

  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title={`Dashboard ${roleLabel}`}
        subtitle="Ringkasan aktivitas dan performa firma hukum." 
      />
      
      <InternalStatsGrid 
        activeCases={stats.activeCases}
        overdueCount={stats.overdueCount}
        completedCases={stats.completedCases}
        todaysEventsCount={stats.todaysEventsCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <DivisionWorkloadChart data={stats.chartData} />
        <DeadlineMonitor deadlines={stats.upcomingDeadlines} />
      </div>
    </div>
  );
};
