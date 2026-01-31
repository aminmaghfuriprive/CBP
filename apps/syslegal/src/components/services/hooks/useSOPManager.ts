
"use client";

import { useState, useMemo } from 'react';
import { ServiceStep, generateServiceSOP } from '@cbp/core';

interface UseSOPManagerProps {
  steps: ServiceStep[];
  onStepsChange: (steps: ServiceStep[]) => void;
  serviceTitle?: string;
  serviceDescription?: string;
}

export const useSOPManager = ({
  steps,
  onStepsChange,
  serviceTitle = '',
  serviceDescription = ''
}: UseSOPManagerProps) => {
  const [newStep, setNewStep] = useState<Partial<ServiceStep>>({
    phase: 'Persiapan',
    task: '',
    estimatedDays: 1
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  // Computed Values
  const totalDays = useMemo(() => {
    return steps.reduce((sum, step) => sum + step.estimatedDays, 0);
  }, [steps]);

  const canGenerate = !!serviceTitle;

  // Actions
  const handleFormChange = (updates: Partial<ServiceStep>) => {
    setNewStep(prev => ({ ...prev, ...updates }));
  };

  const handleAddStep = () => {
    if (!newStep.task) return;
    
    const step: ServiceStep = {
      id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      phase: newStep.phase || 'Persiapan',
      task: newStep.task,
      estimatedDays: Number(newStep.estimatedDays) || 1
    };
    
    const updatedSteps = [...steps, step];
    onStepsChange(updatedSteps);
    
    // Reset form
    setNewStep({ phase: 'Persiapan', task: '', estimatedDays: 1 });
  };

  const handleDeleteStep = (id: string) => {
    const updatedSteps = steps.filter(s => s.id !== id);
    onStepsChange(updatedSteps);
  };

  const handleGenerateAI = async () => {
    if (!serviceTitle) {
      alert("Mohon isi Judul Layanan terlebih dahulu.");
      return;
    }
    
    const confirmMsg = steps.length > 0 
      ? "List SOP tidak kosong. Generate AI akan menambahkan langkah baru di bawahnya. Lanjutkan?" 
      : "Sistem akan membuat draft SOP berdasarkan judul dan deskripsi layanan. Lanjutkan?";

    if (!confirm(confirmMsg)) return;

    setIsGenerating(true);
    try {
      const generatedSteps = await generateServiceSOP(serviceTitle, serviceDescription);
      if (generatedSteps.length > 0) {
        onStepsChange([...steps, ...generatedSteps]);
      } else {
        alert("Gagal membuat SOP. Coba perjelas deskripsi layanan.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan koneksi AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    newStep,
    isGenerating,
    totalDays,
    canGenerate,
    handleFormChange,
    handleAddStep,
    handleDeleteStep,
    handleGenerateAI
  };
};
