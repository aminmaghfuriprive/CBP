import React from 'react';
import { Card } from '@cbp/ui';
import { AlertTriangle } from 'lucide-react';

interface RiskAssessmentCardProps {
  risks: string[];
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({ risks }) => {
  return (
    <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30 h-full">
      <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4 border-b border-red-100 dark:border-red-900/30 pb-2">
        <AlertTriangle className="h-5 w-5" /> Mitigasi Risiko
      </h4>
      <ul className="space-y-3">
        {risks.length > 0 ? (
          risks.map((risk, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
              <span>{risk}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-slate-500 italic">Tidak ada risiko signifikan terdeteksi.</li>
        )}
      </ul>
    </Card>
  );
};