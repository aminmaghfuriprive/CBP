
"use client";

import { useState } from 'react';
import { useAuth, useInternalStats, CaseLifecycle } from '@cbp/core';

export type DashboardViewType = 'workspace' | 'analytics';
export type StageFilterType = 'ALL' | CaseLifecycle;

export const useInternalDashboard = () => {
  const { user } = useAuth();
  const stats = useInternalStats();

  const [activeView, setActiveView] = useState<DashboardViewType>('workspace');
  const [stageFilter, setStageFilter] = useState<StageFilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const roleLabel = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase().replace('_', ' ')
    : 'Staff';

  return {
    // State
    activeView,
    stageFilter,
    searchQuery,
    
    // Data
    roleLabel,
    stats,

    // Actions
    setActiveView,
    setStageFilter,
    setSearchQuery
  };
};
