
"use client";

import React, { useState, useMemo } from 'react';
import { DocumentFile, useDocumentLogic } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Upload } from 'lucide-react';
import { DocumentUploadModal } from '../../DocumentUploadModal';
import { ClientDocumentCard } from '../molecules/ClientDocumentCard';

interface ClientDocumentManagerProps {
  clientId: string; 
  clientName: string;
  documents: DocumentFile[];
}

export const ClientDocumentManager: React.FC<ClientDocumentManagerProps> = ({ 
  clientId, clientName, documents 
}) => {
  const { verifyDocument, addDocument } = useDocumentLogic();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved'>('All');

  // Filter Logic Encapsulated
  const clientDocs = useMemo(() => {
    return documents.filter(d => {
      const isOwner = d.relatedCaseId?.includes(clientId) || 
                      (d.uploadedBy === 'Client' && d.name.includes(clientName)) || 
                      true; // Fallback mock
      
      if (filter === 'Pending') return isOwner && (d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status));
      if (filter === 'Approved') return isOwner && d.status === 'Approved';
      return isOwner;
    });
  }, [documents, filter, clientId, clientName]);

  const handleUpload = (newDoc: DocumentFile) => {
    addDocument({
      ...newDoc,
      uploadedBy: 'Internal',
      status: 'Approved'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['All', 'Pending', 'Approved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                filter === f 
                  ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold' 
                  : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setIsUploadOpen(true)} className="gap-2">
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </div>

      <div className="space-y-3">
        {clientDocs.length > 0 ? (
          clientDocs.map((doc) => (
            <ClientDocumentCard 
              key={doc.id} 
              doc={doc} 
              onVerify={verifyDocument} 
            />
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-slate-500 text-sm">Belum ada dokumen {filter !== 'All' ? filter.toLowerCase() : ''}.</p>
          </div>
        )}
      </div>

      <DocumentUploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUpload={handleUpload} 
      />
    </div>
  );
};
