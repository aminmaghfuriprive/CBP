"use client";

import React, { useMemo } from 'react';
import { useCaseLogic, CaseLifecycle } from '@cbp/core';

export const useKanbanLogic = (searchTerm: string) => {
  const { cases, advanceLifecycle } = useCaseLogic();

  // 1. Group cases by Lifecycle
  const columns = useMemo(() => {
    // Filter first
    const filteredCases = cases.filter(c => 
      searchTerm === '' || 
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      PRE_PRODUCTION: filteredCases.filter(c => c.lifecycle === 'PRE_PRODUCTION'),
      PRODUCTION: filteredCases.filter(c => c.lifecycle === 'PRODUCTION' || !c.lifecycle), // Default fallback
      POST_PRODUCTION: filteredCases.filter(c => c.lifecycle === 'POST_PRODUCTION'),
      ARCHIVED: filteredCases.filter(c => c.lifecycle === 'ARCHIVED'),
    };
  }, [cases, searchTerm]);

  // 2. Handle Drop
  const handleDrop = (e: React.DragEvent, targetStage: CaseLifecycle) => {
    e.preventDefault();
    const caseId = e.dataTransfer.getData('text/plain');
    if (caseId) {
      advanceLifecycle(caseId, targetStage);
    }
  };

  // 3. Handle Manual Move (Button Click)
  const handleMoveNext = (id: string) => {
    const currentCase = cases.find(c => c.id === id);
    if (!currentCase) return;

    let nextStage: CaseLifecycle | null = null;
    
    switch (currentCase.lifecycle) {
      case 'PRE_PRODUCTION': nextStage = 'PRODUCTION'; break;
      case 'PRODUCTION': nextStage = 'POST_PRODUCTION'; break;
      case 'POST_PRODUCTION': nextStage = 'ARCHIVED'; break;
      default: return;
    }

    if (nextStage) {
      advanceLifecycle(id, nextStage);
    }
  };

  return { columns, handleDrop, handleMoveNext };
};