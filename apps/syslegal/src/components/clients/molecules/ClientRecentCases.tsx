
import React from 'react';
import { CaseData } from '@cbp/core';

interface ClientRecentCasesProps {
  cases: CaseData[];
}

export const ClientRecentCases: React.FC<ClientRecentCasesProps> = ({ cases }) => {
  if (cases.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Riwayat Kasus Terbaru</h4>
      <div className="space-y-2">
        {cases.slice(0, 3).map(c => (
          <div key={c.id} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.caseType}</p>
              <p className="text-xs text-slate-500 capitalize">{c.currentStage.replace(/_/g, ' ')}</p>
            </div>
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${c.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
