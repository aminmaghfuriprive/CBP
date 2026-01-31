
"use client";

import React from 'react';
import { ServiceStep } from '@cbp/core';
import { Card } from '@cbp/ui';
import { SOPHeader } from './molecules/SOPHeader';
import { SOPStepList } from './molecules/SOPStepList';
import { SOPAddForm } from './molecules/SOPAddForm';
import { useSOPManager } from './hooks/useSOPManager';

interface ServiceSOPManagerProps {
  steps: ServiceStep[];
  onStepsChange: (steps: ServiceStep[]) => void;
  serviceTitle?: string;
  serviceDescription?: string;
}

export const ServiceSOPManager: React.FC<ServiceSOPManagerProps> = (props) => {
  // 1. Logic Layer (Delegated to Hook)
  const {
    newStep,
    isGenerating,
    totalDays,
    canGenerate,
    handleFormChange,
    handleAddStep,
    handleDeleteStep,
    handleGenerateAI
  } = useSOPManager(props);

  // 2. Visual Layer (Composition of Molecules)
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <SOPHeader 
        totalDays={totalDays}
        onGenerateAI={handleGenerateAI}
        isGenerating={isGenerating}
        canGenerate={canGenerate}
      />

      <SOPStepList 
        steps={props.steps} 
        onDelete={handleDeleteStep} 
      />

      <SOPAddForm 
        data={newStep} 
        onChange={handleFormChange} 
        onAdd={handleAddStep} 
      />
    </Card>
  );
};
