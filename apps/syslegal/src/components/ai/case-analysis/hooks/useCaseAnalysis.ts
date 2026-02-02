import { useState } from 'react';
import { CaseData, summarizeCase, generateCaseStrategy } from '@cbp/core';

export const useCaseAnalysis = (caseData: CaseData) => {
  const [summaryData, setSummaryData] = useState<{ summary: string; risks: string[] } | null>(null);
  const [strategyData, setStrategyData] = useState<{ steps: string[]; legalBasis: string[] } | null>(null);
  
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isStrategizing, setIsStrategizing] = useState(false);

  const handleFullAnalysis = async () => {
    setIsSummarizing(true);
    setIsStrategizing(true);
    
    try {
      // Parallel execution
      const summaryPromise = summarizeCase(caseData);
      const strategyPromise = generateCaseStrategy(caseData);

      const [summaryResult, strategyResult] = await Promise.all([summaryPromise, strategyPromise]);
      
      setSummaryData(summaryResult);
      setStrategyData(strategyResult);
    } catch (error) {
      console.error("AI Analysis Failed", error);
    } finally {
      setIsSummarizing(false);
      setIsStrategizing(false);
    }
  };

  const resetAnalysis = () => {
    setSummaryData(null);
    setStrategyData(null);
  };

  return {
    summaryData,
    strategyData,
    isSummarizing,
    isStrategizing,
    handleFullAnalysis,
    resetAnalysis,
    hasData: !!(summaryData || strategyData)
  };
};