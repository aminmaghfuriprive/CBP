
"use client";

import React, { useState } from 'react';
import { useDocumentLogic, DocumentFile, useData } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { Check, X, FileText, Download, User, Briefcase } from 'lucide-react';

export const DocumentVerificationList: React.FC = () => {
  const { documents, verifyDocument } = useDocumentLogic();
  const { cases } = useData();
  
  const pendingDocs = documents.filter(d => d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status));

  const getCaseInfo = (id?: string) => {
    if (!id) return null;
    return cases.find(c => c.id === id);
  };

  if (pendingDocs.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4 opacity-20" />
        <p className="text-slate-500">Tidak ada dokumen baru yang perlu diperiksa.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pendingDocs.map((doc) => {
        const relatedCase = getCaseInfo(doc.relatedCaseId);
        return (
          <Card key={doc.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-5 group hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
               <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <FileText className="h-6 w-6" />
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => verifyDocument(doc.id, 'Approved')}
                    className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-all"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => verifyDocument(doc.id, 'Rejected', 'Dokumen tidak valid atau kurang lengkap')}
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
               </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-cbp-navy dark:text-white truncate">{doc.name}</h4>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">{doc.category} • {doc.size}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="h-3 w-3" />
                  <span>Diunggah oleh: <span className="font-bold">Klien</span></span>
               </div>
               {relatedCase && (
                 <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Briefcase className="h-3 w-3" />
                    <span>Kasus: <span className="text-cbp-gold font-bold">{relatedCase.caseType}</span></span>
                 </div>
               )}
            </div>

            <div className="mt-5">
               <Button variant="outline" size="sm" className="w-full gap-2">
                 <Download className="h-4 w-4" /> Preview Dokumen
               </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
