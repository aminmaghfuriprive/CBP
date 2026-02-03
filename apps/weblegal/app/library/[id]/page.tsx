
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useRegulationLogic } from '@cbp/core';
import { Button, Badge } from '@cbp/ui';
import { ArrowLeft, Download, FileText, Calendar, ShieldCheck, Eye } from 'lucide-react';
import { AISummaryCard } from '@/components/library/molecules/AISummaryCard';

export default function RegulationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { regulations, trackDownload } = useRegulationLogic();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const reg = regulations.find(r => r.id === id);

  if (!reg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-500 mb-4">Dokumen tidak ditemukan.</p>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    );
  }

  const handleDownload = () => {
    trackDownload(reg.id);
    // Simulasi download
    window.open(reg.fileUrl, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm font-bold text-slate-500 hover:text-cbp-navy dark:hover:text-cbp-gold mb-6 transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Library
        </button>

        {/* Header Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-400">
                 <FileText className="h-8 w-8" />
              </div>
              <div className="flex-1">
                 <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{reg.type}</span>
                    <Badge variant={reg.status === 'Berlaku' ? 'success' : reg.status === 'Dicabut' ? 'danger' : 'warning'}>
                      {reg.status}
                    </Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                       <Calendar className="h-3 w-3" /> Tahun {reg.year}
                    </span>
                 </div>
                 <h1 className="text-2xl md:text-3xl font-serif font-bold text-cbp-navy dark:text-white leading-tight mb-2">
                   {reg.title}
                 </h1>
                 <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                   Nomor: {reg.number} • Kategori: {reg.category}
                 </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                 <Button onClick={handleDownload} className="gap-2 w-full md:w-auto shadow-lg shadow-cbp-navy/10">
                    <Download className="h-4 w-4" /> Download PDF
                 </Button>
                 <Button variant="outline" size="sm" className="gap-2 w-full md:w-auto justify-center" onClick={() => window.open(reg.fileUrl, '_blank')}>
                    <Eye className="h-4 w-4" /> Preview
                 </Button>
              </div>
           </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: AI Summary */}
           <div className="lg:col-span-2 space-y-8">
              <AISummaryCard summary={reg.summary} />
              
              {/* PDF Preview Placehoder (Mock) */}
              <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-[500px] flex flex-col items-center justify-center text-slate-400 border border-slate-300 dark:border-slate-700">
                 <FileText className="h-16 w-16 mb-4 opacity-50" />
                 <p className="font-bold">Dokumen Preview</p>
                 <p className="text-sm">Halaman 1 dari 45</p>
              </div>
           </div>

           {/* Right: Meta Info */}
           <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                 <h4 className="font-bold text-sm text-cbp-navy dark:text-white uppercase tracking-widest mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                   Metadata Dokumen
                 </h4>
                 <ul className="space-y-4 text-sm">
                    <li className="flex justify-between">
                       <span className="text-slate-500">Tipe</span>
                       <span className="font-bold text-slate-800 dark:text-slate-200">{reg.type}</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Nomor</span>
                       <span className="font-bold text-slate-800 dark:text-slate-200">{reg.number}</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Tahun</span>
                       <span className="font-bold text-slate-800 dark:text-slate-200">{reg.year}</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Diunduh</span>
                       <span className="font-bold text-slate-800 dark:text-slate-200">{reg.downloadCount} kali</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Diupload</span>
                       <span className="font-bold text-slate-800 dark:text-slate-200">{new Date(reg.uploadedAt).toLocaleDateString()}</span>
                    </li>
                 </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900 flex items-start gap-3">
                 <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                 <div>
                    <h5 className="font-bold text-blue-800 dark:text-blue-300 text-sm">Dokumen Terverifikasi</h5>
                    <p className="text-xs text-blue-700/80 dark:text-blue-400 mt-1 leading-relaxed">
                       File ini telah diverifikasi keasliannya oleh tim legal CBP Corp dan sesuai dengan database pemerintah.
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
