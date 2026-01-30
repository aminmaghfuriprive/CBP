
import React from 'react';
import { Card } from '@cbp/ui';
import { Users, MapPin } from 'lucide-react';

interface AgendaDailyStatsProps {
  consultationCount: number;
  hearingCount: number;
}

export const AgendaDailyStats: React.FC<AgendaDailyStatsProps> = ({ consultationCount, hearingCount }) => {
  return (
    <Card className="border-l-4 border-l-cbp-gold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-cbp-navy dark:text-white mb-4 text-sm uppercase tracking-wide">Ringkasan Hari Ini</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Konsultasi</span>
          </div>
          <span className="font-bold text-lg text-cbp-navy dark:text-white">{consultationCount}</span>
        </div>
        
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Sidang</span>
          </div>
          <span className="font-bold text-lg text-cbp-navy dark:text-white">{hearingCount}</span>
        </div>
      </div>
    </Card>
  );
};
