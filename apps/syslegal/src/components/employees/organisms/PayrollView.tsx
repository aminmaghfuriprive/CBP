
"use client";

import React from 'react';
import { useData } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Plus } from 'lucide-react';
import { PayrollStats } from '../molecules/PayrollStats';
import { PayrollTable } from './PayrollTable';

export const PayrollView: React.FC = () => {
  const { payrolls, markAsPaid } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Manajemen Gaji</h3>
         <Button className="gap-2">
            <Plus className="h-4 w-4" /> Buat Slip Baru
         </Button>
      </div>

      <PayrollStats payrolls={payrolls} />
      
      <PayrollTable payrolls={payrolls} onMarkPaid={markAsPaid} />
    </div>
  );
};
