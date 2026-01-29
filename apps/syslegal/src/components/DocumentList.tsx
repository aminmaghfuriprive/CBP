import React from 'react';
import { DocumentFile } from '@cbp/core';
import { FileText, Download, Trash2 } from 'lucide-react';

interface DocumentListProps {
  documents: DocumentFile[];
  onDelete: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-500">
        <FileText className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
        <p>Belum ada dokumen yang sesuai filter ini.</p>
      </div>
    );
  }

  const getIconColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'DOCX': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'XLSX': return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {documents.map((doc) => (
        <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${getIconColor(doc.type)}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-cbp-navy dark:text-white text-sm group-hover:text-cbp-gold transition-colors cursor-pointer">{doc.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="font-bold text-slate-600 dark:text-slate-300">{doc.type}</span> • {doc.category} • {doc.size} • {doc.lastModified}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors" title="Download">
              <Download className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(doc.id)}
              className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" 
              title="Hapus"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};