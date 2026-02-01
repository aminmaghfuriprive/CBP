
"use client";

import React, { useState } from 'react';
import { DocumentFile, useDocumentLogic } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { FileText, Download, Check, X, Upload, AlertCircle } from 'lucide-react';
import { DocumentUploadModal } from '../../DocumentUploadModal';

interface ClientDocumentManagerProps {
  clientId: string; // ID Client (untuk filter & upload)
  clientName: string; // Nama Client (untuk filtering legacy data jika perlu)
  documents: DocumentFile[];
}

export const ClientDocumentManager: React.FC<ClientDocumentManagerProps> = ({ 
  clientId, clientName, documents 
}) => {
  const { verifyDocument, addDocument, deleteDocument } = useDocumentLogic();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved'>('All');

  // Filter dokumen milik klien ini
  const clientDocs = documents.filter(d => {
    // Logic pencocokan kepemilikan (bisa by ID atau Name match untuk data mock)
    const isOwner = d.relatedCaseId?.includes(clientId) || // Jika ada relasi ID
                    (d.uploadedBy === 'Client' && d.name.includes(clientName)) || // Mock logic
                    true; // Fallback untuk demo: tampilkan semua jika belum strict
    
    // Filter status
    if (filter === 'Pending') return isOwner && (d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status));
    if (filter === 'Approved') return isOwner && d.status === 'Approved';
    return isOwner;
  });

  const handleUpload = (newDoc: DocumentFile) => {
    // Inject client context saat upload dari panel ini
    addDocument({
      ...newDoc,
      uploadedBy: 'Internal', // Admin yang upload
      status: 'Approved' // Auto approve jika admin yang upload
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
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
              {f} {f === 'Pending' && clientDocs.filter(d => d.status === 'Pending').length > 0 && '( ! )'}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setIsUploadOpen(true)} className="gap-2">
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {clientDocs.length > 0 ? (
          clientDocs.map((doc) => (
            <Card key={doc.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all" padding={false}>
              {/* Icon Type */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                ${doc.type === 'PDF' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'}
              `}>
                <FileText className="h-6 w-6" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{doc.name}</h4>
                  {doc.status === 'Pending' && (
                    <Badge variant="warning" className="text-[10px] py-0 px-1.5 flex gap-1">
                      <AlertCircle className="h-3 w-3" /> Butuh Validasi
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-medium bg-slate-100 dark:bg-slate-800 px-1.5 rounded">{doc.category}</span>
                  <span>• {doc.size}</span>
                  <span>• {doc.lastModified}</span>
                  {doc.uploadedBy && <span>• Uploaded by: {doc.uploadedBy}</span>}
                </div>
              </div>

              {/* Actions Area */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
                {/* Validation Controls */}
                {(doc.status === 'Pending' || (doc.uploadedBy === 'Client' && !doc.status)) ? (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white border-none h-8 px-3"
                      onClick={() => verifyDocument(doc.id, 'Approved')}
                      title="Setujui Dokumen"
                    >
                      <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-3"
                      onClick={() => verifyDocument(doc.id, 'Rejected', 'Dokumen tidak sesuai')}
                      title="Tolak Dokumen"
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </>
                ) : (
                  <>
                    {doc.status === 'Rejected' && <span className="text-xs text-red-500 font-bold mr-2">Ditolak</span>}
                    {doc.status === 'Approved' && <span className="text-xs text-green-600 font-bold mr-2">Valid</span>}
                  </>
                )}

                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
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
