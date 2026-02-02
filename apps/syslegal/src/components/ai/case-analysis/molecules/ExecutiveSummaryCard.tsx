import React from 'react';
import { Card } from '@cbp/ui';
import { FileText } from 'lucide-react';

interface ExecutiveSummaryCardProps {
  summary: string;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({ summary }) => {
  return (
    <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <h4 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
        <FileText className="h-5 w-5 text-blue-500" /> Executive Summary
      </h4>
      <div className="flex-1">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic text-lg font-serif">
          "{summary}"
        </p>
      </div>
    </Card>
  );
};