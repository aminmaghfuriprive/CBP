
"use client";

import React, { useState } from 'react';
import { CaseData, summarizeCase, generateCaseStrategy } from '@cbp/core';
import { Button, Card, Badge } from '@cbp/ui';
import { Sparkles, Loader2, AlertTriangle, ListChecks, FileText, Lightbulb, Gavel, ArrowRight } from 'lucide-react';

interface CaseAISummaryProps {
  caseData: CaseData;
}

export const CaseAISummary: React.FC<CaseAISummaryProps> = ({ caseData }) => {
  const [summaryData, setSummaryData] = useState<{ summary: string; risks: string[] } | null>(null);
  const [strategyData, setStrategyData] = useState<{ steps: string[]; legalBasis: string[] } | null>(null);
  
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isStrategizing, setIsStrategizing] = useState(false);

  const handleFullAnalysis = async () => {
    setIsSummarizing(true);
    setIsStrategizing(true);
    
    // Parallel execution
    const summaryPromise = summarizeCase(caseData);
    const strategyPromise = generateCaseStrategy(caseData);

    const [summaryResult, strategyResult] = await Promise.all([summaryPromise, strategyPromise]);
    
    setSummaryData(summaryResult);
    setStrategyData(strategyResult);
    
    setIsSummarizing(false);
    setIsStrategizing(false);
  };

  const hasData = summaryData || strategyData;

  return (
    <div className="space-y-6">
      {!hasData ? (
        <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-20 w-20 bg-cbp-navy dark:bg-cbp-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cbp-navy/20 dark:shadow-cbp-gold/20 transform rotate-3 transition-transform hover:rotate-0">
            <Sparkles className="h-10 w-10 text-white dark:text-cbp-navy animate-pulse" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-3">AI Case Intelligence</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            Dapatkan analisis 360° yang mencakup rangkuman eksekutif, deteksi risiko dini, dan rekomendasi strategi litigasi berbasis data.
          </p>
          <Button 
            onClick={handleFullAnalysis} 
            disabled={isSummarizing || isStrategizing} 
            className="gap-3 px-8 py-6 text-base font-bold shadow-xl shadow-cbp-navy/20"
          >
            {isSummarizing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            Mulai Analisis Mendalam
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           
           {/* Top Stats / Summary */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Executive Summary */}
              <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col">
                 <h4 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <FileText className="h-5 w-5 text-blue-500" /> Executive Summary
                 </h4>
                 {summaryData ? (
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic text-lg font-serif">
                     "{summaryData.summary}"
                   </p>
                 ) : (
                   <div className="flex justify-center p-4"><Loader2 className="animate-spin text-slate-300" /></div>
                 )}
              </Card>

              {/* Risks */}
              <Card className="bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30">
                 <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4 border-b border-red-100 dark:border-red-900/30 pb-2">
                    <AlertTriangle className="h-5 w-5" /> Mitigasi Risiko
                 </h4>
                 {summaryData ? (
                   <ul className="space-y-3">
                      {summaryData.risks.map((risk, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                           <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                           <span>{risk}</span>
                        </li>
                      ))}
                   </ul>
                 ) : (
                   <div className="flex justify-center p-4"><Loader2 className="animate-spin text-red-300" /></div>
                 )}
              </Card>
           </div>

           {/* Strategy Section */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full">
                 <h4 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 mb-6">
                    <Lightbulb className="h-5 w-5 text-cbp-gold" /> Rekomendasi Strategi
                 </h4>
                 {strategyData ? (
                   <div className="space-y-4">
                      {strategyData.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 group">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy flex items-center justify-center font-bold text-sm shadow-md">
                             {idx + 1}
                           </div>
                           <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 flex-1 hover:border-cbp-gold dark:hover:border-cbp-gold transition-colors">
                             <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{step}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-2">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p className="text-xs">Menyusun strategi...</p>
                   </div>
                 )}
              </Card>

              <Card className="bg-slate-900 text-white border-slate-800 h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                 
                 <h4 className="font-bold text-white flex items-center gap-2 mb-6 relative z-10">
                    <Gavel className="h-5 w-5 text-cbp-gold" /> Dasar Hukum Relevan
                 </h4>
                 
                 {strategyData ? (
                   <ul className="space-y-2 relative z-10">
                      {strategyData.legalBasis.map((law, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                           <div className="h-2 w-2 bg-cbp-gold rounded-full flex-shrink-0"></div>
                           <span className="text-sm font-mono text-slate-200">{law}</span>
                        </li>
                      ))}
                   </ul>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <p className="text-xs">Mencari referensi hukum...</p>
                   </div>
                 )}

                 <div className="mt-8 pt-6 border-t border-white/10 flex justify-end relative z-10">
                    <Button variant="outline" size="sm" onClick={() => { setSummaryData(null); setStrategyData(null); }} className="text-xs border-slate-600 text-slate-400 hover:text-white hover:border-white">
                       Analisis Ulang
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      )}
    </div>
  );
};
