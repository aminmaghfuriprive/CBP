
import React from 'react';
import { DocumentFile } from '@cbp/core';
import { ClientDocumentManager } from '../ClientDocumentManager';

interface WorkspaceDocumentsProps {
  clientId: string;
  clientName: string;
  documents: DocumentFile[];
}

export const WorkspaceDocuments: React.FC<WorkspaceDocumentsProps> = ({ 
  clientId, 
  clientName, 
  documents 
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Repository & Validasi</h3>
        <p className="text-sm text-slate-500 mt-1">Kelola dan validasi dokumen yang diunggah oleh klien ini.</p>
      </div>
      <ClientDocumentManager 
        clientId={clientId} 
        clientName={clientName} 
        documents={documents} 
      />
    </div>
  );
};
