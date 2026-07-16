
import React from 'react';
import { CaseData } from '@cbp/core';
import { StatusBadge } from '@cbp/ui';
import { Eye, Clock } from 'lucide-react';

interface CaseTableProps {
  cases: CaseData[];
  onView: (id: string) => void;
}

export const CaseTable: React.FC<CaseTableProps> = ({ cases, onView }) => {
  if (cases.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
        <p className="text-slate-500 text-sm">Tidak ada data perkara yang sesuai filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-2 font-bold">Klien & Kasus</th>
              <th className="px-4 py-2 font-bold">Divisi</th>
              <th className="px-4 py-2 font-bold">Tahapan</th>
              <th className="px-4 py-2 font-bold">Status</th>
              <th className="px-4 py-2 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {cases.map((c) => (
              <tr 
                key={c.id} 
                onClick={() => onView(c.id)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                <td className="px-4 py-2">
                  <div className="font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors text-sm">
                    {c.clientName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium truncate max-w-[150px]">
                    {c.caseType}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {c.division.split(' ')[0]}...
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="capitalize">{c.currentStage.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Upd: {c.lastUpdate}</div>
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-2 text-right">
                  <button className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
