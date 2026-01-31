
"use client";

import React, { useState, useRef } from 'react';
import { DocumentFile, useData } from '@cbp/core';
import { Button } from '@cbp/ui';
import { UploadCloud, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';

interface ClientDocumentUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

export const ClientDocumentUploader: React.FC<ClientDocumentUploaderProps> = ({ isOpen, onClose, caseId }) => {
  const { addDocument } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Berkas Klien');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    setIsUploading(true);

    // Simulate Network Request
    setTimeout(() => {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'DOCX';
      const docType = ['PDF', 'DOCX', 'XLSX', 'JPG', 'PNG'].includes(ext) ? ext as any : 'DOCX';

      const newDoc: DocumentFile = {
        id: `doc_${Date.now()}`,
        name: file.name,
        type: docType,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        category: category,
        lastModified: new Date().toISOString().split('T')[0],
        uploadedBy: 'Client',
        relatedCaseId: caseId
      };

      addDocument(newDoc);
      setIsUploading(false);
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Upload Dokumen</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-cbp-navy dark:text-white">Berhasil Diunggah!</h4>
            <p className="text-sm text-slate-500">Dokumen telah tersimpan di sistem.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Drag Drop Area */}
            <div 
              className={`
                relative h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer
                ${dragActive 
                  ? 'border-cbp-gold bg-cbp-gold/5' 
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
              
              {file ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-200">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 mb-2">
                    <FileText className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-bold text-cbp-navy dark:text-white max-w-[200px] truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Ganti File
                  </button>
                </div>
              ) : (
                <div className="pointer-events-none">
                  <UploadCloud className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Klik atau seret file ke sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOCX, JPG (Max 5MB)</p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Kategori Dokumen</label>
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-cbp-gold"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Berkas Klien">Berkas Klien (KTP/NPWP)</option>
                <option value="Bukti">Bukti / Evidence</option>
                <option value="Surat Kuasa">Surat Kuasa</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <Button 
              onClick={handleSubmit} 
              disabled={!file || isUploading} 
              className="w-full justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Mengunggah...
                </>
              ) : 'Simpan Dokumen'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
