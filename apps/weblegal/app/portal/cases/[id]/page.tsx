
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@cbp/ui';
import { Briefcase } from 'lucide-react';

// 1. Logic Hook
import { useClientCaseDetail } from '@/components/portal/case-detail/hooks/useClientCaseDetail';

// 2. Molecules (Static Parts)
import { CaseDetailHeader } from '@/components/portal/case-detail/molecules/CaseDetailHeader';
import { CaseTabNavigation } from '@/components/portal/case-detail/molecules/CaseTabNavigation';

// 3. Organisms (Dynamic Tab Content)
import { CaseProgressView } from '@/components/portal/case-detail/organisms/CaseProgressView';
import { CaseDocumentsView } from '@/components/portal/case-detail/organisms/CaseDocumentsView';
import { CaseBillingView } from '@/components/portal/case-detail/organisms/CaseBillingView';

export default function CaseDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Menggunakan Logic Hook yang sudah diekstrak di Step 1
  const {
    caseData,
    caseDocs,
    caseInvoices,
    serviceSOP,
    activeTab,
    isUploaderOpen,
    setActiveTab,
    setIsUploaderOpen,
    handleBack,
    notFound
  } = useClientCaseDetail(id);

  if (notFound || !caseData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 animate-in fade-in duration-300">
        <Briefcase className="h-12 w-12 mb-4 opacity-50" />
        <p>Kasus tidak ditemukan atau Anda tidak memiliki akses.</p>
        <Button variant="ghost" onClick={handleBack} className="mt-4">Kembali</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* 1. Header Area */}
      <CaseDetailHeader 
        caseData={caseData} 
        onBack={handleBack} 
      />

      {/* 2. Content Area */}
      <div>
        <CaseTabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="min-h-[400px]">
          {activeTab === 'timeline' && (
            <CaseProgressView 
              caseData={caseData} 
              serviceSOP={serviceSOP} 
            />
          )}

          {activeTab === 'docs' && (
            <CaseDocumentsView 
              documents={caseDocs} 
              caseId={caseData.id}
              isUploaderOpen={isUploaderOpen}
              onOpenUploader={() => setIsUploaderOpen(true)}
              onCloseUploader={() => setIsUploaderOpen(false)}
            />
          )}

          {activeTab === 'billing' && (
            <CaseBillingView 
              invoices={caseInvoices} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
