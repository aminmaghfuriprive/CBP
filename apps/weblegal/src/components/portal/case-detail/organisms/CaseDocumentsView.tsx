
import React from 'react';
import { DocumentFile } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Upload } from 'lucide-react';
import { CaseDocuments } from '../../../CaseDocuments';
import { ClientDocumentUploader } from '../../../ClientDocumentUploader';

interface CaseDocumentsViewProps {
  documents: DocumentFile[];
  caseId: string;
  isUploaderOpen: boolean;
  onOpenUploader: () => void;
  onCloseUploader: () => void;
}

export const CaseDocumentsView: React.FC<CaseDocumentsViewProps> = ({ 
  documents, 
  caseId,
  isUploaderOpen,
  onOpenUploader,
  onCloseUploader
}) => {
  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Dokumen Terkait</h3>
        <Button size="sm" variant="outline" className="gap-2" onClick={onOpenUploader}>
          <Upload className="h-4 w-4" /> Upload Berkas Tambahan
        </Button>
      </div>
      
      <CaseDocuments documents={documents} />
      
      <ClientDocumentUploader 
        isOpen={isUploaderOpen} 
        onClose={onCloseUploader} 
        caseId={caseId} 
      />
    </div>
  );
};
