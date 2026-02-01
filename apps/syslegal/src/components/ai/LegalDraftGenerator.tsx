
"use client";

import React, { useState } from 'react';
import { draftLegalDocument, refineDraft, CaseData } from '@cbp/core';
import { Button, Card } from '@cbp/ui';
import { PenTool, Copy, Check, Sparkles, Loader2, FileSignature, RefreshCw, MessageSquare } from 'lucide-react';

interface LegalDraftGeneratorProps {
  caseData: CaseData;
}

export const LegalDraftGenerator: React.FC<LegalDraftGeneratorProps> = ({ caseData }) => {
  const [draft, setDraft] = useState('');
  const [docType, setDocType] = useState('Surat Somasi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instruction, setInstruction] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    const clientInfo = `Klien: ${caseData.clientName}. Law Firm: CBP Corp.`;
    const result = await draftLegalDocument(docType, clientInfo, caseData.description);
    setDraft(result);
    setIsGenerating(false);
  };

  const handleRefine = async () => {
    if (!draft || !instruction) return;
    setIsRefining(true);
    const refinedResult = await refineDraft(draft, instruction);
    setDraft(refinedResult);
    setInstruction('');
    setIsRefining(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Left Panel: Settings */}
       <Card className="lg:col-span-1 h-fit">
          <h4 className="font-bold text-cbp-navy dark:text-white mb-4">Pengaturan Draf</h4>
          <div className="space-y-4">
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Jenis Dokumen</label>
                <select 
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none dark:text-white text-sm focus:ring-2 focus:ring-cbp-gold"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                >
                  <option>Surat Somasi</option>
                  <option>Surat Kuasa Khusus</option>
                  <option>Draft Perjanjian Damai</option>
                  <option>Pendapat Hukum (Legal Opinion)</option>
                  <option>Kronologi Perkara</option>
                </select>
             </div>
             
             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                <strong>Smart Agent:</strong> Saya akan menggunakan data kasus aktif untuk mengisi detail secara otomatis. Anda bisa merevisi hasilnya nanti.
             </div>
             
             <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenTool className="h-4 w-4" />}
                {isGenerating ? 'Menyusun Draf...' : 'Buat Draf Awal'}
             </Button>
          </div>
       </Card>

       {/* Right Panel: Editor & Refinement */}
       <div className="lg:col-span-2">
          {draft ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
               {/* Editor Header */}
               <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileSignature className="h-5 w-5 text-cbp-gold" /> Editor Dokumen
                  </h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setDraft('')} className="text-red-500 hover:bg-red-50">
                       Reset
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Tersalin' : 'Salin Teks'}
                    </Button>
                  </div>
               </div>

               {/* Draft Content Area */}
               <div className="bg-white dark:bg-slate-950 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                 <textarea 
                    className="w-full h-[400px] bg-transparent border-none outline-none resize-none font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-300 custom-scrollbar"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                 />
               </div>

               {/* Refinement Control */}
               <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
                  <div className="p-2 bg-cbp-navy dark:bg-cbp-gold rounded-lg text-white dark:text-cbp-navy">
                     <Sparkles className="h-5 w-5" />
                  </div>
                  <input 
                    type="text" 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-white placeholder:text-slate-400"
                    placeholder="Instruksi revisi (cth: 'Buat bahasanya lebih tegas', 'Tambahkan pasal wanprestasi')..."
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleRefine} 
                    disabled={isRefining || !instruction}
                    className="shrink-0 gap-2"
                  >
                    {isRefining ? <RefreshCw className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                    Revisi
                  </Button>
               </div>
            </div>
          ) : (
            <div className="h-[550px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
               <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="h-10 w-10 text-cbp-gold opacity-50" />
               </div>
               <h3 className="font-bold text-slate-600 dark:text-slate-300 text-lg mb-2">Smart Legal Drafter</h3>
               <p className="max-w-sm text-center text-sm">Pilih jenis dokumen di sebelah kiri dan biarkan AI menyusun draf awal profesional untuk Anda.</p>
            </div>
          )}
       </div>
    </div>
  );
};
