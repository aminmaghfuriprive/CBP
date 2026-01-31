
"use client";

import React from 'react';
import { useClientData, useAuth } from '@cbp/core';
import { PageHeader } from '@cbp/ui';
import { ClientStatsRow } from './ClientStatsRow';
import { ClientActiveCases } from './ClientActiveCases';

export const ClientDashboardView: React.FC = () => {
  const { user } = useAuth();
  const { myCases, stats } = useClientData();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Portal Klien" 
        subtitle={`Selamat datang kembali, ${user?.name || 'Klien'}. Berikut ringkasan hukum Anda.`} 
      />

      <ClientStatsRow 
        activeCasesCount={stats.activeCases} 
        unpaidAmount={stats.totalDue} 
      />
      
      <ClientActiveCases cases={myCases} />
    </div>
  );
};
