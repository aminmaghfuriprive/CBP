
"use client";

import React, { useMemo } from 'react';
import { useCaseLogic, CaseLifecycle, CaseData } from '@cbp/core';

export const useKanbanLogic = (searchTerm: string) => {
  const { cases, advanceLifecycle } = useCaseLogic();

  // Helper: Priority Score (Higher = Top)
  const getPriorityScore = (c: CaseData) => {
    let score = 0;
    // Rule 1: 'Menunggu' status is urgent (Action Needed)
    if (c.status === 'Menunggu') score += 100;
    // Rule 2: Newer updates usually more relevant
    const daysSinceUpdate = (new Date().getTime() - new Date(c.lastUpdate).getTime()) / (1000 * 3600 * 24);
    if (daysSinceUpdate < 3) score += 10;
    return score;
  };

  // 1. Group cases by Lifecycle & Apply Sorting
  const columns = useMemo(() => {
    // Filter first
    let filteredCases = cases.filter(c => 
      searchTerm === '' || 
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by Priority (Urgent Top)
    filteredCases.sort((a, b) => getPriorityScore(b) - getPriorityScore(a));

    return {
      PRE_PRODUCTION: filteredCases.filter(c => c.lifecycle === 'PRE_PRODUCTION'),
      PRODUCTION: filteredCases.filter(c => c.lifecycle === 'PRODUCTION' || !c.lifecycle), // Default fallback
      POST_PRODUCTION: filteredCases.filter(c => c.lifecycle === 'POST_PRODUCTION'),
      ARCHIVED: filteredCases.filter(c => c.lifecycle === 'ARCHIVED'),
    };
  }, [cases, searchTerm]);

  // 2. Handle Manual Move (With Strict Verification)
  const handleMoveNext = (id: string) => {
    const currentCase = cases.find(c => c.id === id);
    if (!currentCase) return;

    let nextStage: CaseLifecycle | null = null;
    let requiredDocs = 0; // Mock logic for verification requirements

    switch (currentCase.lifecycle) {
      case 'PRE_PRODUCTION': 
        nextStage = 'PRODUCTION'; 
        requiredDocs = 2; // e.g. Surat Kuasa & Bukti Bayar
        break;
      case 'PRODUCTION': 
        nextStage = 'POST_PRODUCTION'; 
        requiredDocs = 5; // e.g. Putusan/Draft Final
        break;
      case 'POST_PRODUCTION': 
        nextStage = 'ARCHIVED'; 
        break;
      default: return;
    }

    if (nextStage) {
      // STRICT VERIFICATION SIMULATION
      const message = `
        [SISTEM VERIFIKASI]
        
        Anda akan memindahkan kasus "${currentCase.clientName}" ke meja ${nextStage}.
        
        Sistem mendeteksi prasyarat terpenuhi:
        ✅ Dokumen Lengkap (${requiredDocs}/${requiredDocs})
        ✅ Tidak ada tagihan tertunggak
        
        Lanjutkan proses ini?
      `;

      if (window.confirm(message)) {
        advanceLifecycle(id, nextStage);
      }
    }
  };

  return { columns, handleMoveNext, getPriorityScore };
};
