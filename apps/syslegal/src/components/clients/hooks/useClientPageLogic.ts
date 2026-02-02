
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDocumentLogic } from '@cbp/core';
import { CLIENT_PAGE_TABS, TabView } from '../client-page.config';

export const useClientPageLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { documents: allDocs } = useDocumentLogic();

  // 1. Initialize State
  const initialTab = (searchParams.get('view') as TabView) || 'clients';
  const [activeTab, setActiveTab] = useState<TabView>(initialTab);
  
  // Local UI State
  const [caseViewMode, setCaseViewMode] = useState<'list' | 'board'>('list');
  const [boardSearch, setBoardSearch] = useState('');

  // 2. Sync State when URL Changes (Back/Forward navigation)
  useEffect(() => {
    const view = searchParams.get('view') as TabView;
    const validTabIds = CLIENT_PAGE_TABS.map(t => t.id);
    
    if (view && validTabIds.includes(view)) {
      setActiveTab(view);
    }
  }, [searchParams]);

  // 3. Handlers
  const handleTabChange = (tab: TabView) => {
    setActiveTab(tab);
    // Update URL shallowly without reload
    router.push(`/app/clients?view=${tab}`, { scroll: false });
  };

  // 4. Computed Data (Logic-heavy calculations)
  const pendingDocsCount = allDocs.filter(d => 
    d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status)
  ).length;

  return {
    // State
    activeTab,
    caseViewMode,
    boardSearch,
    pendingDocsCount,
    
    // Setters / Handlers
    setCaseViewMode,
    setBoardSearch,
    handleTabChange,
  };
};
