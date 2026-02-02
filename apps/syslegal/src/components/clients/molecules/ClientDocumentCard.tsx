
import React from 'react';
import { DocumentFile } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { FileText, Download, Check, X, AlertCircle } from 'lucide-react';

interface ClientDocumentCardProps {
  doc: DocumentFile;
  onVerify: (id: string, status: 'Approved' | 'Rejected', reason?: string) => void;
}

export const ClientDocumentCard: React.FC<ClientDocumentCardProps> = ({ doc, onVerify }) => {
  const iconBg = doc.type === 'PDF' 
    ? 'bg-red-50 text-red-600 dark:bg-red-900/20' 
    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';

  const needsValidation = doc.status === 'Pending' || (doc.uploadedBy === 'Client' && !doc.status);

  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all" padding={false}>
      {/* Icon Type */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
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
        {needsValidation ? (
          <>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white border-none h-8 px-3"
              onClick={() => onVerify(doc.id, 'Approved')}
              title="Setujui Dokumen"
            >
              <Check className="h-4 w-4 mr-1" /> Approve
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-3"
              onClick={() => onVerify(doc.id, 'Rejected', 'Dokumen tidak sesuai')}
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
  );
};
