import React from 'react';
import { CaseData } from '@cbp/core';
import { useCaseAnalysis } from './case-analysis/hooks/useCaseAnalysis';
import { AnalysisEmptyState } from './case-analysis/molecules/AnalysisEmptyState';
import { ExecutiveSummaryCard } from './case-analysis/molecules/ExecutiveSummaryCard';
import { RiskAssessmentCard } from './case-analysis/molecules/RiskAssessmentCard';
import { StrategyStepsCard } from './case-analysis/molecules/StrategyStepsCard';
import { LegalBasisCard } from './case-analysis/molecules/LegalBasisCard';

interface CaseAISummaryProps {
  caseData: CaseData;
}

export const CaseAISummary: React.FC<CaseAISummaryProps> = ({ caseData }) => {
  const {
    summaryData,
    strategyData,
    isSummarizing,
    isStrategizing,
    handleFullAnalysis,
    resetAnalysis,
    hasData
  } = useCaseAnalysis(caseData);

  const isLoading = isSummarizing || isStrategizing;

  // Render 1: Empty State / Initial View
  if (!hasData) {
    return (
      <AnalysisEmptyState 
        onAnalyze={handleFullAnalysis} 
        isLoading={isLoading} 
      />
    );
  }

  // Render 2: Data Dashboard View
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       
       {/* Top Row: Executive Summary & Risks */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExecutiveSummaryCard 
            summary={summaryData?.summary || ''} 
          />
          <RiskAssessmentCard 
            risks={summaryData?.risks || []} 
          />
       </div>

       {/* Bottom Row: Strategy & Legal Basis */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrategyStepsCard 
            steps={strategyData?.steps || []} 
          />
          <LegalBasisCard 
            legalBasis={strategyData?.legalBasis || []}
            onReset={resetAnalysis}
          />
       </div>
    </div>
  );
};