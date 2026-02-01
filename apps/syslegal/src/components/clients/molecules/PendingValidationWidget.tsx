
import React from 'react';
import { DocumentFile, useDocumentLogic, useData } from '@cbp/core';
import { Card } from '@cbp/ui';
import { FileText, ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface PendingValidationWidgetProps {
  onReviewClick: (doc: DocumentFile) => void;
}

export const PendingValidationWidget: React.FC<PendingValidationWidgetProps> = ({ onReviewClick }) => {
  const { documents } = useDocumentLogic();
  const { clients } = useData();

  // Filter pending documents
  const pendingDocs = documents.filter(d => 
    d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status)
  ).slice(0, 5); // Show max 5

  const getClientName = (clientId?: string) => {
    // Mock logic: In real app, we verify linking. Here we try to match ID or assume logic
    if (!clientId) return 'Unknown Client';
    const client = clients.find(c => c.id === clientId); // Assuming doc has clientId or we find via case
    return client ? client.name : 'Klien Eksternal';
  };

  return (
    <Card className="h-full flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" padding={false}>
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 text-sm">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          Antrean Validasi
        </h3>
        <span className="text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
          {pendingDocs.length} Pending
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {pendingDocs.length > 0 ? (
          <div className="space-y-2">
            {pendingDocs.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => onReviewClick(doc)}
                className="group p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-cbp-gold dark:hover:border-cbp-gold bg-white dark:bg-slate-800 cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{doc.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="truncate max-w-[100px]">{doc.category}</span>
                    <span>•</span>
                    <span className="text-slate-400">{doc.lastModified}</span>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cbp-navy dark:text-cbp-gold">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <CheckCircle2 className="h-10 w-10 mb-2 opacity-20 text-green-500" />
            <p className="text-xs">Semua dokumen telah diverifikasi.</p>
          </div>
        )}
      </div>
      
      {pendingDocs.length > 0 && (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
          <button className="text-xs font-bold text-cbp-navy dark:text-cbp-gold hover:underline">
            Lihat Semua Antrean
          </button>
        </div>
      )}
    </Card>
  );
};
