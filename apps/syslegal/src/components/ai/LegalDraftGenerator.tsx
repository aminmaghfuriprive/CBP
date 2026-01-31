
"use client";

import React, { useState } from 'react';
import { draftLegalDocument, CaseData } from '@cbp/core';
import { Button, Card } from '@cbp/ui';
import { PenTool, Copy, Check, Sparkles, Loader2, FileSignature } from 'lucide-react';

interface LegalDraftGeneratorProps {
  caseData: CaseData;
}

export const LegalDraftGenerator: React.FC<LegalDraftGeneratorProps> = ({ caseData }) => {
  const [draft, setDraft] = useState('');
  const [docType, setDocType] = useState('Surat Somasi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const clientInfo = `Klien: ${caseData.clientName}. Law Firm: CBP Corp.`;
    const result = await draftLegalDocument(docType, clientInfo, caseData.description);
    setDraft(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <Card className="lg:col-span-1 h-fit">
          <h4 className="font-bold text-cbp-navy dark:text-white mb-4">Pengaturan Draf</h4>
          <div className="space-y-4">
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Jenis Dokumen</label>
                <select 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white text-sm"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option>Surat Somasi</option>
                  <option>Surat Kuasa Khusus</option>
                  <option>Draft Perjanjian Damai</option>
                  <option>Kronologi Perkara</option>
                </select>
             </div>
             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                AI akan menggunakan data klien dan deskripsi kasus untuk mengisi konten otomatis. Pastikan review kembali sebelum dikirim.
             </div>
             <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenTool className="h-4 w-4" />}
                Generate Draf Pro
             </Button>
          </div>
       </Card>

       <div className="lg:col-span-2">
          {draft ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileSignature className="h-5 w-5 text-cbp-gold" /> Preview Draf
                  </h4>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Tersalin' : 'Salin Teks'}
                  </Button>
               </div>
               <div className="bg-white dark:bg-slate-950 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner font-serif text-sm leading-relaxed whitespace-pre-wrap h-[500px] overflow-y-auto custom-scrollbar dark:text-slate-300">
                 {draft}
               </div>
            </div>
          ) : (
            <div className="h-[550px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
               <Sparkles className="h-12 w-12 mb-4 opacity-20" />
               <p>Pilih jenis dokumen dan klik generate.</p>
            </div>
          )}
       </div>
    </div>
  );
};
