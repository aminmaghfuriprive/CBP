"use client";

import React, { useState } from 'react';
import { recommendService, useData, Booking } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { Bot, Loader2, ArrowRight, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewRequestPage() {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const { bookings } = useData(); // In real app, we would use addBooking
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    const result = await recommendService(description);
    setRecommendation(result);
    setIsAnalyzing(false);
  };

  const handleBooking = () => {
    // Mock booking creation
    alert("Permintaan layanan berhasil dibuat! Tim kami akan menghubungi Anda.");
    router.push('/portal/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Buat Permintaan Layanan</h1>
        <p className="text-slate-500 dark:text-slate-400">Ceritakan masalah hukum Anda, AI kami akan merekomendasikan solusi terbaik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="h-fit">
          <label className="block font-bold text-slate-700 dark:text-slate-200 mb-3">Deskripsi Masalah</label>
          <textarea
            className="w-full p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cbp-gold outline-none min-h-[200px] text-slate-900 dark:text-white mb-4"
            placeholder="Contoh: Saya memiliki sengketa tanah warisan dengan saudara kandung yang ingin menjual aset tanpa persetujuan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !description} 
            className="w-full gap-2"
          >
            {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
            {isAnalyzing ? 'Menganalisis...' : 'Analisis Masalah'}
          </Button>
        </Card>

        {/* AI Result */}
        <div>
          {recommendation ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">Rekomendasi Ditemukan</span>
              </div>
              
              <Card className="border-2 border-cbp-gold bg-white dark:bg-slate-900">
                <div className="mb-4">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Layanan Direkomendasikan</p>
                  <h3 className="text-xl font-bold text-cbp-navy dark:text-white">{recommendation.recommendedServiceId.replace(/_/g, ' ')}</h3>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{recommendation.reasoning}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Kompleksitas</p>
                    <Badge variant={recommendation.estimatedComplexity === 'Tinggi' ? 'danger' : 'warning'}>
                      {recommendation.estimatedComplexity}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Estimasi Biaya</p>
                    <p className="font-bold text-cbp-navy dark:text-white text-sm">{recommendation.estimatedCostRange}</p>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full gap-2 bg-cbp-navy text-white hover:bg-slate-800">
                  Pilih Layanan Ini <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>

              <p className="text-xs text-slate-400 text-center">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                Estimasi biaya dapat berubah setelah review dokumen lengkap oleh tim lawyer.
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
              <Bot className="h-12 w-12 mb-4 opacity-50" />
              <p>Belum ada analisis.</p>
              <p className="text-sm mt-2">Masukkan deskripsi masalah dan klik "Analisis Masalah".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}