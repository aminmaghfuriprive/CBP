import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';
import { Button } from '@cbp/ui';
import { DocumentFile } from '@cbp/core';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (doc: DocumentFile) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Kontrak');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const type = selectedFile.name.split('.').pop()?.toUpperCase() as any || 'DOCX';
      const newDoc: DocumentFile = {
        id: `d${Date.now()}`,
        name: selectedFile.name,
        type: ['PDF', 'DOCX', 'XLSX'].includes(type) ? type : 'DOCX',
        size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        category: category,
        lastModified: new Date().toISOString().split('T')[0]
      };

      onUpload(newDoc);
      setIsUploading(false);
      setSelectedFile(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-black/50 w-full max-w-md mx-4 overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white text-lg">Upload Dokumen Baru</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 rounded-xl p-8 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative group">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept=".pdf,.docx,.xlsx"
            />
            {selectedFile ? (
              <div className="flex flex-col items-center text-cbp-navy dark:text-white">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm mb-3">
                  <FileText className="h-8 w-8 text-cbp-gold" />
                </div>
                <span className="font-medium text-sm">{selectedFile.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{(selectedFile.size / 1024).toFixed(0)} KB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                <Upload className="h-10 w-10 mb-3" />
                <span className="text-sm font-medium">Klik atau seret file ke sini</span>
                <span className="text-xs mt-1">PDF, DOCX, XLSX (Max 10MB)</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Kategori Dokumen</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Kontrak</option>
              <option>Litigasi</option>
              <option>Bukti</option>
              <option>Audit</option>
              <option>Administrasi</option>
            </select>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full justify-center text-base" 
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Mengupload...' : 'Simpan Dokumen'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};