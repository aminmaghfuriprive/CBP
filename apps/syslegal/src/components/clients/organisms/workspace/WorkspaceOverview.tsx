
import React from 'react';
import { ClientData } from '@cbp/core';
import { Card } from '@cbp/ui';
import { ClientStatsOverview } from '../../molecules/ClientStatsOverview';
import { ClientContactInfo } from '../../molecules/ClientContactInfo';

interface WorkspaceOverviewProps {
  client: ClientData;
  stats: {
    totalCases: number;
    activeCasesCount: number;
    unpaidAmount: number;
  };
}

export const WorkspaceOverview: React.FC<WorkspaceOverviewProps> = ({ client, stats }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <ClientStatsOverview 
        totalCases={stats.totalCases} 
        activeCases={stats.activeCasesCount} 
        unpaidAmount={stats.unpaidAmount} 
      />
      
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-4">Informasi Kontak</h3>
        <ClientContactInfo client={client} />
      </Card>
    </div>
  );
};
