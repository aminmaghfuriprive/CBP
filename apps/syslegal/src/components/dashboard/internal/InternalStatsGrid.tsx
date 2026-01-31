
import React from 'react';
import { StatCard } from '@cbp/ui';
import { Briefcase, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

interface InternalStatsGridProps {
  activeCases: number;
  overdueCount: number;
  completedCases: number;
  todaysEventsCount: number;
}

export const InternalStatsGrid: React.FC<InternalStatsGridProps> = ({
  activeCases,
  overdueCount,
  completedCases,
  todaysEventsCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        label="Kasus Aktif" 
        value={activeCases} 
        icon={Briefcase} 
        variant="primary" 
      />
      <StatCard 
        label="Tagihan Overdue" 
        value={overdueCount} 
        icon={AlertCircle} 
        variant="danger"
        subtext={overdueCount > 0 ? "Perlu tindak lanjut segera" : "Semua tagihan lancar"} 
      />
      <StatCard 
        label="Selesai Bulan Ini" 
        value={completedCases} 
        icon={CheckCircle} 
        variant="success" 
      />
      <StatCard 
        label="Agenda Hari Ini" 
        value={todaysEventsCount} 
        icon={Calendar} 
        variant="secondary" 
      />
    </div>
  );
};
