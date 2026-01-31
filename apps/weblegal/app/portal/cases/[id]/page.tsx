
"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useClientData, SERVICES } from '@cbp/core';
import { Badge, Button, Card } from '@cbp/ui';
import { ArrowLeft, Briefcase, Calendar, FolderOpen, DollarSign, MessageSquare, Upload } from 'lucide-react';
import { CaseTimeline } from '@/components/portal/CaseTimeline';
import { CaseDocuments } from '@/components/portal/CaseDocuments';
import { CaseBilling } from '@/components/portal/CaseBilling';
import { ClientDocumentUploader } from '@/components/portal/ClientDocumentUploader';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { myCases, myInvoices, myDocuments } = useClientData();
  const [activeTab, setActiveTab] = useState<'timeline' | 'docs' | 'billing'>('timeline');
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const caseData = myCases.find(c => c.id === id);

  if (!caseData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <Briefcase className="h-12 w-12 mb-4 opacity-50" />
        <p>Kasus tidak ditemukan atau Anda tidak memiliki akses.</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">Kembali</Button>
      </div>
    );
  }

  // Filter dokumen untuk kasus ini saja
  // useClientData sudah memfilter dokumen milik user, tapi di halaman detail kita filter lagi by caseId 
  // agar tidak campur dengan kasus lain milik user yang sama.
  const currentCaseDocs = myDocuments.filter(d => d.relatedCaseId === id);

  // Cari SOP terkait layanan ini (Mock logic: match title)
  const relatedService = SERVICES.find(s => s.title === caseData.caseType);
  const sop = relatedService?.sop;

  // Filter invoices for this client (Mock: since we assume 1 active case mostly for demo)
  const relatedInvoices = myInvoices; 

  const tabs = [
    { id: 'timeline', label: 'Progress & SOP', icon: Calendar },
    { id: 'docs', label: 'Dokumen', icon: FolderOpen },
    { id: 'billing', label: 'Tagihan', icon: DollarSign },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Header Navigation */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-sm font-bold text-slate-500 hover:text-cbp-navy dark:hover:text-cbp-gold transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Dashboard
      </button>

      {/* 2. Case Overview Card */}
      <div className="bg-cbp-navy dark:bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={caseData.status === 'Aktif' ? 'success' : 'neutral'} className="border-none shadow-sm">
                {caseData.status}
              </Badge>
              <span className="text-xs font-mono text-slate-400">ID: {caseData.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{caseData.caseType}</h1>
            <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">{caseData.description}</p>
          </div>
          
          <div className="flex gap-3">
             <Button variant="secondary" size="sm" className="gap-2">
               <MessageSquare className="h-4 w-4" /> Hubungi Lawyer
             </Button>
          </div>
        </div>
      </div>

      {/* 3. Tabs & Content */}
      <div>
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-cbp-navy text-cbp-navy dark:border-cbp-gold dark:text-cbp-gold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}
              `}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'timeline' && (
            <Card className="animate-in fade-in zoom-in duration-300">
              <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-6">Timeline Pengerjaan</h3>
              <CaseTimeline caseData={caseData} serviceSOP={sop} />
            </Card>
          )}

          {activeTab === 'docs' && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Dokumen Terkait</h3>
                <Button size="sm" variant="outline" className="gap-2" onClick={() => setIsUploaderOpen(true)}>
                  <Upload className="h-4 w-4" /> Upload Berkas Tambahan
                </Button>
              </div>
              <CaseDocuments documents={currentCaseDocs} />
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="animate-in fade-in zoom-in duration-300">
              <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-6">Riwayat Tagihan</h3>
              <CaseBilling invoices={relatedInvoices} />
            </div>
          )}
        </div>
      </div>

      <ClientDocumentUploader 
        isOpen={isUploaderOpen} 
        onClose={() => setIsUploaderOpen(false)} 
        caseId={caseData.id} 
      />
    </div>
  );
}
