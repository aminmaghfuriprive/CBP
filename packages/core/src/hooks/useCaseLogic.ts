"use client";

import { useState } from 'react';
import { CaseData } from '../types';
import { MOCK_CASES } from '../data/mock_cases';
import { useNotifications } from '../context/NotificationContext';

export const useCaseLogic = () => {
  const [cases, setCases] = useState<CaseData[]>(MOCK_CASES);
  const { addNotification } = useNotifications();

  const addCase = (newCase: CaseData) => {
    setCases(prev => [newCase, ...prev]);
    addNotification('Kasus Baru Dibuat', `Kasus untuk ${newCase.clientName} telah ditambahkan ke sistem.`, 'success');
  };

  return { cases, addCase };
};