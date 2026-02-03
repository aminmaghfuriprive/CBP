
"use client";

import React, { useState, useEffect } from 'react';
import { RegulationItem, RegulationStatus, askLegalAssistant, createAIClient, AI_CONFIGS } from '@cbp/core';
import { Button } from '@cbp/ui';
import { X, UploadCloud, Sparkles, FileText, Loader2 } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea } from '../../common/forms';
import { ModalWrapper, ModalHeader, ModalFooter } from '../../common/modal';

interface RegulationUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: RegulationItem) => void;
  initialData?: RegulationItem | null;
}

export const RegulationUploadModal: React.FC<RegulationUploadModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<RegulationItem>>({
    title: '',
    type: 'UU',
    number: '',
    year: new Date().getFullYear(),
    category: 'Bisnis & Investasi',
    status: 'Berlaku',
    summary: '',
    fileUrl: ''
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileName, setFileName] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
        setFileName(initialData.fileUrl.split('/').pop() || 'Existing File');
      } else {
        setFormData({
          title: '', type: 'UU', number: '', year: new Date().getFullYear(),
          category: 'Bisnis & Investasi', status: 'Berlaku', summary: '', fileUrl: ''
        });
        setFileName('');
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (field: keyof RegulationItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock File Upload + AI Parsing
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsAnalyzing(true);

      // 1. Simulate Parsing Delay (Extraction)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Mock Logic: Extract Metadata from Filename (e.g. "UU 11 2020 Cipta Kerja.pdf")
      // In real app, this would use a backend PDF parser
      const nameParts = file.name.replace('.pdf', '').split(' ');
      let detectedType = formData.type || 'UU';
      let detectedNum = formData.number || '';
      let detectedYear = formData.year || new Date().getFullYear();
      let detectedTitle = file.name.replace('.pdf', '').replace(/[-_]/g, ' ');

      // Simple heuristic for demo
      if (file.name.toLowerCase().includes('uu')) detectedType = 'UU';
      else if (file.name.toLowerCase().includes('pp')) detectedType = 'PP';
      
      const yearMatch = file.name.match(/20\d{2}/);
      if (yearMatch) detectedYear = parseInt(yearMatch[0]);

      const numMatch = file.name.match(/\d+/);
      if (numMatch) detectedNum = numMatch[0];

      setFormData(prev => ({
        ...prev,
        title: detectedTitle,
        type: detectedType,
        number: detectedNum,
        year: detectedYear,
        fileUrl: URL.createObjectURL(file) // Local blob for preview
      }));

      // 3. Call Gemini to generate summary based on Title (Simulated content)
      try {
        const ai = createAIClient();
        const prompt = AI_CONFIGS.summarizeRegulation.prompt(detectedTitle);
        const response = await ai.models.generateContent({
            model: AI_CONFIGS.summarizeRegulation.model,
            contents: prompt
        });
        
        if (response.text) {
            setFormData(prev => ({ ...prev, summary: response.text?.trim() }));
        }
      } catch (err) {
        console.error("AI Summary failed", err);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave: RegulationItem = {
      id: initialData?.id || `reg_${Date.now()}`,
      title: formData.title || '',
      type: formData.type || 'UU',
      number: formData.number || '',
      year: formData.year || new Date().getFullYear(),
      category: formData.category || 'Umum',
      status: (formData.status as RegulationStatus) || 'Berlaku',
      fileUrl: formData.fileUrl || '',
      summary: formData.summary || '',
      downloadCount: initialData?.downloadCount || 0,
      uploadedAt: initialData?.uploadedAt || new Date().toISOString()
    };
    onSave(itemToSave);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <ModalHeader 
        title={initialData ? 'Edit Dokumen Regulasi' : 'Upload Regulasi Baru'}
        icon={FileText}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* File Upload Area */}
          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
             <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" onChange={handleFileChange} />
             
             {isAnalyzing ? (
                <div className="flex flex-col items-center animate-pulse">
                   <Sparkles className="h-10 w-10 text-cbp-gold mb-2" />
                   <p className="text-sm font-bold text-cbp-navy dark:text-cbp-gold">AI sedang menganalisis dokumen...</p>
                   <p className="text-xs text-slate-500">Mengekstrak Metadata & Membuat Ringkasan</p>
                </div>
             ) : fileName ? (
                <div className="flex flex-col items-center">
                   <div className="bg-red-50 text-red-600 p-3 rounded-full mb-2">
                      <FileText className="h-6 w-6" />
                   </div>
                   <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{fileName}</p>
                   <p className="text-xs text-green-600 mt-1 font-medium">Dokumen Siap (Data Terisi Otomatis)</p>
                </div>
             ) : (
                <div className="flex flex-col items-center text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                   <UploadCloud className="h-10 w-10 mb-2" />
                   <p className="text-sm font-medium">Klik atau drop file PDF di sini</p>
                   <p className="text-[10px] mt-1 bg-cbp-gold/10 text-cbp-gold px-2 py-0.5 rounded-full font-bold">
                      ✨ AI Auto-Fill Enabled
                   </p>
                </div>
             )}
          </div>

          <FormInput 
            label="Judul Lengkap Regulasi"
            name="title"
            value={formData.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Contoh: Undang-Undang No. 11 Tahun 2020 tentang..."
            required
          />

          <div className="grid grid-cols-3 gap-4">
             <FormSelect 
                label="Jenis"
                name="type"
                value={formData.type || 'UU'}
                onChange={(e) => handleChange('type', e.target.value)}
                options={['UU', 'PP', 'Perpres', 'Permen', 'Putusan MK']}
             />
             <FormInput 
                label="Nomor"
                name="number"
                value={formData.number || ''}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="11"
             />
             <FormInput 
                label="Tahun"
                type="number"
                name="year"
                value={formData.year || ''}
                onChange={(e) => handleChange('year', Number(e.target.value))}
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <FormSelect 
                label="Kategori Bidang"
                name="category"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                options={['Bisnis & Investasi', 'Pajak', 'Ketenagakerjaan', 'Pidana', 'Perdata', 'Agraria']}
             />
             <FormSelect 
                label="Status Hukum"
                name="status"
                value={formData.status || 'Berlaku'}
                onChange={(e) => handleChange('status', e.target.value)}
                options={['Berlaku', 'Dicabut', 'Diubah']}
             />
          </div>

          <FormTextarea 
             label="Ringkasan Singkat (AI Generated)"
             name="summary"
             value={formData.summary || ''}
             onChange={(e) => handleChange('summary', e.target.value)}
             placeholder="Ringkasan akan muncul otomatis setelah upload..."
             rows={3}
          />
        </div>

        <ModalFooter>
           <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
           <Button type="submit" disabled={!formData.title || isAnalyzing}>
              {isAnalyzing ? 'Processing...' : 'Simpan ke Library'}
           </Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};
