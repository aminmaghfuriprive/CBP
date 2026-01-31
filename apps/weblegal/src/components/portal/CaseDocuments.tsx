
import React from 'react';
import { DocumentFile } from '@cbp/core';
import { FileText, Download, Eye, File } from 'lucide-react';
import { Button } from '@cbp/ui';

interface CaseDocumentsProps {
  documents: DocumentFile[];
}

export const CaseDocuments: React.FC<CaseDocumentsProps> = ({ documents }) => {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
        <File className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400">Belum ada dokumen yang diunggah untuk kasus ini.</p>
      </div>
    );
  }

  const getIconColor = (type: string) => {
    if (type === 'PDF') return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    if (type === 'DOCX') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-all group">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconColor(doc.type)}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-cbp-navy dark:text-white text-sm group-hover:text-cbp-gold transition-colors">
                {doc.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {doc.category} • {doc.size} • {doc.lastModified}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-slate-500 hover:text-cbp-navy dark:hover:text-white">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> <span className="hidden sm:inline">Unduh</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
