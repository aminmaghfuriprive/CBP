
import React from 'react';
import { AttendanceRecord, formatDateID } from '@cbp/core';
import { Card } from '@cbp/ui';
import { AttendanceBadge } from '../atoms/AttendanceBadge';

interface AttendanceLogTableProps {
  logs: AttendanceRecord[];
}

export const AttendanceLogTable: React.FC<AttendanceLogTableProps> = ({ logs }) => {
  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Pegawai</th>
              <th className="px-6 py-4 font-bold">Tanggal</th>
              <th className="px-6 py-4 font-bold">Masuk</th>
              <th className="px-6 py-4 font-bold">Pulang</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {logs.length > 0 ? logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-cbp-navy dark:text-white">{log.userName}</div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {formatDateID(log.date, { weekday: 'long', day: 'numeric', month: 'short' })}
                </td>
                <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">
                  {log.checkIn}
                </td>
                <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">
                  {log.checkOut || '-'}
                </td>
                <td className="px-6 py-4">
                  <AttendanceBadge status={log.status} />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Belum ada data absensi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
