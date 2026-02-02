import React from 'react';
import { Button } from '@cbp/ui';
import { Sparkles, Loader2 } from 'lucide-react';

interface AnalysisEmptyStateProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

export const AnalysisEmptyState: React.FC<AnalysisEmptyStateProps> = ({ onAnalyze, isLoading }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
      <div className="h-20 w-20 bg-cbp-navy dark:bg-cbp-gold rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cbp-navy/20 dark:shadow-cbp-gold/20 transform rotate-3 transition-transform hover:rotate-0">
        <Sparkles className="h-10 w-10 text-white dark:text-cbp-navy animate-pulse" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-3">AI Case Intelligence</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
        Dapatkan analisis 360° yang mencakup rangkuman eksekutif, deteksi risiko dini, dan rekomendasi strategi litigasi berbasis data.
      </p>
      <Button 
        onClick={onAnalyze} 
        disabled={isLoading} 
        className="gap-3 px-8 py-6 text-base font-bold shadow-xl shadow-cbp-navy/20"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
        Mulai Analisis Mendalam
      </Button>
    </div>
  );
};