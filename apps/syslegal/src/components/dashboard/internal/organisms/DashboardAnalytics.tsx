
import React from 'react';
import { InternalStatsGrid } from '../InternalStatsGrid';
import { DivisionWorkloadChart } from '../DivisionWorkloadChart';

interface DashboardAnalyticsProps {
  stats: {
    activeCases: number;
    overdueCount: number;
    completedCases: number;
    todaysEventsCount: number;
    chartData: { name: string; kasus: number }[];
  };
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ stats }) => {
  return (
    <div className="space-y-8 overflow-y-auto pb-10 custom-scrollbar h-full pr-2">
      <InternalStatsGrid 
        activeCases={stats.activeCases}
        overdueCount={stats.overdueCount}
        completedCases={stats.completedCases}
        todaysEventsCount={stats.todaysEventsCount}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DivisionWorkloadChart data={stats.chartData} />
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center text-slate-400 text-sm border-dashed min-h-[250px]">
           Grafik Finansial & Performa Tim (Segera Hadir)
        </div>
      </div>
    </div>
  );
};
