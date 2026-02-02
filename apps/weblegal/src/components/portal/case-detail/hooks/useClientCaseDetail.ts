
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useClientData, SERVICES } from '@cbp/core';

export type CaseDetailTab = 'timeline' | 'docs' | 'billing';

export const useClientCaseDetail = (caseId: string) => {
  const router = useRouter();
  const { myCases, myInvoices, myDocuments } = useClientData();
  
  const [activeTab, setActiveTab] = useState<CaseDetailTab>('timeline');
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  // 1. Get Specific Case Data
  const caseData = useMemo(() => 
    myCases.find(c => c.id === caseId), 
  [myCases, caseId]);

  // 2. Filter Documents for this Case
  const caseDocs = useMemo(() => 
    myDocuments.filter(d => d.relatedCaseId === caseId),
  [myDocuments, caseId]);

  // 3. Get Related Service SOP based on Case Type Title
  const serviceSOP = useMemo(() => {
    if (!caseData) return undefined;
    return SERVICES.find(s => s.title === caseData.caseType)?.sop;
  }, [caseData]);

  // 4. Get Related Invoices
  // Note: Currently returns all client invoices as per previous logic. 
  // Ideally should filter by caseId if invoice data supports linking to specific cases.
  const caseInvoices = myInvoices;

  const handleBack = () => router.back();

  return {
    caseData,
    caseDocs,
    caseInvoices,
    serviceSOP,
    activeTab,
    isUploaderOpen,
    setActiveTab,
    setIsUploaderOpen,
    handleBack,
    // Helper to detect if data is possibly loading (though Dexie is fast)
    notFound: !caseData && myCases.length > 0
  };
};
