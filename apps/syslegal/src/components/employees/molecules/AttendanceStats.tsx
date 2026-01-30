
import React from 'react';
import { Card } from '@cbp/ui';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { AttendanceRecord } from '@cbp/core';

interface AttendanceStatsProps {
  history: AttendanceRecord[];
}

export const AttendanceStats: React.FC<AttendanceStatsProps> = ({ history }) => {
  const presentCount = history.filter(h => h.status === 'Present').length;
  const lateCount = history.filter(h => h.status === 'Late').length;
  const leaveCount = history.filter(h => h.status === 'Leave').length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900" padding={false}>
        <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
        <span className="text-2xl font-bold text-green-700 dark:text-green-400">{presentCount}</span>
        <span className="text-xs text-green-600 dark:text-green-500 font-medium uppercase">Tepat Waktu</span>
      </Card>
      
      <Card className="flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900" padding={false}>
        <Clock className="h-6 w-6 text-amber-600 mb-2" />
        <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">{lateCount}</span>
        <span className="text-xs text-amber-600 dark:text-amber-500 font-medium uppercase">Terlambat</span>
      </Card>

      <Card className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900" padding={false}>
        <AlertCircle className="h-6 w-6 text-blue-600 mb-2" />
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{leaveCount}</span>
        <span className="text-xs text-blue-600 dark:text-blue-500 font-medium uppercase">Cuti / Izin</span>
      </Card>
    </div>
  );
};
