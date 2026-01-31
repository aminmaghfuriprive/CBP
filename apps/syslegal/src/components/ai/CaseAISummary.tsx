
"use client";

import React, { useState } from 'react';
import { CaseData, summarizeCase } from '@cbp/core';
import { Button, Card } from '@cbp/ui';
import { Sparkles, Loader2, AlertTriangle, ListChecks, FileText } from 'lucide-react';

interface CaseAISummaryProps {
  caseData: CaseData;
}

export const CaseAISummary: React.FC<CaseAISummaryProps> = ({ caseData }) => {
  const [data, setData] = useState<{ summary: string; risks: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await summarizeCase(caseData);
    setData(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {!data ? (
        <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
          <div className="h-16 w-16 bg-cbp-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-8 w-8 text-cbp-gold animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-2">Gunakan AI Insight</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">Dapatkan rangkuman briefing pimpinan dan analisis risiko hukum otomatis berdasarkan riwayat kasus ini.</p>
          <Button onClick={handleAnalyze} disabled={isAnalyzing} className="gap-2 px-8">
            {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Mulai Analisis Kasus
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
           <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 mb-4">
                 <FileText className="h-4 w-4 text-blue-500" /> Executive Summary
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{data.summary}"
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">AI Generated Insight</span>
                 <Button variant="ghost" size="sm" onClick={() => setData(null)} className="text-xs">Ulangi</Button>
              </div>
           </Card>

           <Card className="bg-red-50/30 dark:bg-red-950/10 border-red-100 dark:border-red-900/30">
              <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-4">
                 <AlertTriangle className="h-4 w-4" /> Daftar Risiko Hukum
              </h4>
              <ul className="space-y-3">
                 {data.risks.map((risk, i) => (
                   <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <ListChecks className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{risk}</span>
                   </li>
                 ))}
              </ul>
           </Card>
        </div>
      )}
    </div>
  );
};
