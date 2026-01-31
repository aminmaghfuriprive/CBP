
import React from 'react';
import { CaseData, formatDateID } from '@cbp/core';
import { Card, CardHeader, Badge } from '@cbp/ui';
import { Calendar, Briefcase } from 'lucide-react';

interface ClientActiveCasesProps {
  cases: CaseData[];
}

export const ClientActiveCases: React.FC<ClientActiveCasesProps> = ({ cases }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader title="Status Kasus Saya" />
        {cases.length > 0 ? (
          <div className="space-y-4">
            {cases.map(c => (
              <div key={c.id} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-cbp-navy dark:text-white text-lg">{c.caseType}</h4>
                    <Badge variant={c.status === 'Aktif' ? 'success' : 'neutral'}>{c.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Calendar className="h-3.5 w-3.5" /> Updated: {formatDateID(c.lastUpdate, { dateStyle: 'long' })}
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
              <Briefcase className="h-10 w-10 mx-auto mb-2 text-slate-300" />
              <p>Tidak ada kasus aktif.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
