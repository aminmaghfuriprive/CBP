
import React from 'react';
import { StatCard } from '@cbp/ui';
import { formatCurrencyIDR } from '@cbp/core';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';

interface ClientStatsRowProps {
  activeCasesCount: number;
  unpaidAmount: number;
}

export const ClientStatsRow: React.FC<ClientStatsRowProps> = ({ activeCasesCount, unpaidAmount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Kasus Aktif" 
        value={activeCasesCount} 
        icon={Briefcase} 
        variant="primary" 
      />
      <StatCard 
        label="Tagihan Berjalan" 
        value={formatCurrencyIDR(unpaidAmount)} 
        icon={DollarSign} 
        variant="danger" 
      />
      <StatCard 
        label="Jadwal Berikutnya" 
        value="-" 
        icon={Calendar} 
        variant="secondary" 
      />
    </div>
  );
};
