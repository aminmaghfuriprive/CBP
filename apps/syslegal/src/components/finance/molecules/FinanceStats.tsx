
import React from 'react';
import { StatCard } from '@cbp/ui';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrencyIDR } from '@cbp/core';

interface FinanceStatsProps {
  totalRevenue: number;
  outstanding: number;
  overdueCount: number;
}

export const FinanceStats: React.FC<FinanceStatsProps> = ({ totalRevenue, outstanding, overdueCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Total Pendapatan" 
        value={formatCurrencyIDR(totalRevenue)} 
        icon={TrendingUp} 
        variant="success" 
      />
      <StatCard 
        label="Tagihan Belum Lunas" 
        value={formatCurrencyIDR(outstanding)} 
        icon={DollarSign} 
        variant="warning" 
      />
      <StatCard 
        label="Jatuh Tempo" 
        value={`${overdueCount} Tagihan`} 
        icon={AlertCircle} 
        variant="danger" 
      />
    </div>
  );
};
