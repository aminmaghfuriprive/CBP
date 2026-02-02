
import React from 'react';
import { Invoice } from '@cbp/core';
import { FinanceStats } from '../molecules/FinanceStats';
import { InvoiceFilterToolbar } from '../molecules/InvoiceFilterToolbar';
import { InvoiceTable } from '../molecules/InvoiceTable';
import { InvoiceFilterType } from '../hooks/useFinanceDashboard';

interface FinanceOverviewViewProps {
  stats: {
    totalRevenue: number;
    outstanding: number;
    overdueCount: number;
  };
  filter: InvoiceFilterType;
  onFilterChange: (f: InvoiceFilterType) => void;
  invoices: Invoice[];
  onMarkPaid: (id: string) => void;
}

export const FinanceOverviewView: React.FC<FinanceOverviewViewProps> = ({
  stats, 
  filter, 
  onFilterChange, 
  invoices, 
  onMarkPaid
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <FinanceStats
        totalRevenue={stats.totalRevenue}
        outstanding={stats.outstanding}
        overdueCount={stats.overdueCount}
      />
      
      <div className="space-y-4">
        <InvoiceFilterToolbar
          activeFilter={filter}
          onFilterChange={onFilterChange}
        />
        
        <InvoiceTable
          invoices={invoices}
          onMarkPaid={onMarkPaid}
        />
      </div>
    </div>
  );
};
