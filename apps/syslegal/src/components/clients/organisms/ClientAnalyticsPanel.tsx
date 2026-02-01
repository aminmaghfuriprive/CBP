
"use client";

import React, { useMemo } from 'react';
import { useData, formatCurrencyIDR, ClientData, CaseData, Invoice } from '@cbp/core';
import { StatCard } from '@cbp/ui';
import { Users, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import { PendingValidationWidget } from '../molecules/PendingValidationWidget';
import { ClientCharts } from '../molecules/ClientCharts';

interface ClientAnalyticsPanelProps {
  clients: ClientData[];
  cases: CaseData[];
  invoices: Invoice[];
  onReviewDoc?: (doc: any) => void;
}

export const ClientAnalyticsPanel: React.FC<ClientAnalyticsPanelProps> = ({ 
  clients, cases, invoices, onReviewDoc 
}) => {
  
  // 1. Calculate Statistics
  const stats = useMemo(() => {
    const totalClients = clients.length;
    const activeCases = cases.filter(c => c.status === 'Aktif').length;
    const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const growth = 12; // Mock percentage for demo

    // Group Industry
    const industryMap: Record<string, number> = {};
    clients.forEach(c => {
      const ind = c.industry || 'Lainnya';
      industryMap[ind] = (industryMap[ind] || 0) + 1;
    });
    const industryData = Object.keys(industryMap).map(key => ({ name: key, value: industryMap[key] }));

    // Group Case Status
    const statusMap = {
      'Pra-Produksi': cases.filter(c => c.lifecycle === 'PRE_PRODUCTION').length,
      'Produksi': cases.filter(c => c.lifecycle === 'PRODUCTION').length,
      'Pasca-Produksi': cases.filter(c => c.lifecycle === 'POST_PRODUCTION').length,
    };
    const caseStatusData = Object.keys(statusMap).map(key => ({ name: key, value: statusMap[key as keyof typeof statusMap] }));

    return { totalClients, activeCases, totalRevenue, growth, industryData, caseStatusData };
  }, [clients, cases, invoices]);

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto custom-scrollbar p-6 space-y-6">
      
      {/* 1. Header Area */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Dashboard Klien</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Overview kinerja dan demografi klien firma.</p>
      </div>

      {/* 2. Macro Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Klien" 
          value={stats.totalClients} 
          icon={Users} 
          variant="primary" 
          subtext={`+${stats.growth}% bulan ini`}
        />
        <StatCard 
          label="Perkara Aktif" 
          value={stats.activeCases} 
          icon={Briefcase} 
          variant="secondary" 
        />
        <StatCard 
          label="Total Revenue" 
          value={formatCurrencyIDR(stats.totalRevenue)} 
          icon={TrendingUp} 
          variant="success" 
        />
      </div>

      {/* 3. Split Content: Charts & Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[400px]">
        {/* Left: Charts (2/3 width on large screens) */}
        <div className="xl:col-span-2 min-h-0">
           <ClientCharts 
             industryData={stats.industryData} 
             caseStatusData={stats.caseStatusData} 
           />
        </div>

        {/* Right: Validation Widget (1/3 width) */}
        <div className="xl:col-span-1 min-h-0">
           <PendingValidationWidget 
             onReviewClick={(doc) => onReviewDoc && onReviewDoc(doc)} 
           />
        </div>
      </div>

      {/* 4. Alert / Retention Insight (Optional filler) */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-xl p-4 flex items-start gap-3">
         <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
         <div>
            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300">Insight Retensi Klien</h4>
            <p className="text-xs text-blue-700/80 dark:text-blue-400 leading-relaxed mt-1">
              Sebanyak 40% klien dari sektor "Manufaktur" memiliki kasus berulang tahun ini. Pertimbangkan untuk menawarkan paket Retainer Korporat kepada segmen ini.
            </p>
         </div>
      </div>
    </div>
  );
};
