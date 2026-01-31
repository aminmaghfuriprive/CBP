
import React from 'react';
import { CaseData, ServiceItem } from '@cbp/core';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

interface CaseTimelineProps {
  caseData: CaseData;
  serviceSOP?: ServiceItem['sop'];
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ caseData, serviceSOP }) => {
  // Fallback SOP jika layanan tidak memiliki SOP spesifik
  const steps = serviceSOP || [
    { id: 's1', phase: 'Administrasi', task: 'Verifikasi Berkas & Tanda Tangan Kuasa', estimatedDays: 2 },
    { id: 's2', phase: 'Proses Hukum', task: 'Penyusunan Dokumen & Pendaftaran', estimatedDays: 5 },
    { id: 's3', phase: 'Review', task: 'Validasi Instansi Terkait', estimatedDays: 3 },
    { id: 's4', phase: 'Selesai', task: 'Penyerahan Hasil Akhir', estimatedDays: 1 },
  ];

  // Logic sederhana untuk menentukan current step berdasarkan status kasus
  // Di real app, ini akan mapping ID step dari database
  let activeStepIndex = 0;
  if (caseData.status === 'Selesai') activeStepIndex = steps.length;
  else if (caseData.currentStage.includes('produksi')) activeStepIndex = 1;
  else if (caseData.currentStage.includes('review') || caseData.currentStage.includes('monitoring')) activeStepIndex = 2;
  else activeStepIndex = 0;

  return (
    <div className="py-2">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        <div className="space-y-8">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const isPending = idx > activeStepIndex;

            return (
              <div key={step.id} className="relative flex gap-6 group">
                {/* Icon Marker */}
                <div className={`
                  relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-green-100 border-green-50 text-green-600 dark:bg-green-900/30 dark:border-green-900 dark:text-green-400' 
                    : isCurrent 
                      ? 'bg-cbp-navy border-cbp-gold/50 text-cbp-gold dark:bg-cbp-gold dark:border-cbp-navy/50 dark:text-cbp-navy shadow-lg shadow-cbp-gold/20' 
                      : 'bg-white border-slate-200 text-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-700'}
                `}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : 
                   isCurrent ? <Clock className="h-6 w-6 animate-pulse" /> : 
                   <Circle className="h-6 w-6" />}
                </div>

                {/* Content */}
                <div className={`flex-1 pt-1 ${isPending ? 'opacity-60 grayscale' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${isCurrent ? 'text-cbp-gold' : 'text-slate-400'}`}>
                        {step.phase}
                      </span>
                      <h4 className={`text-base font-bold ${isCurrent ? 'text-cbp-navy dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {step.task}
                      </h4>
                    </div>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold whitespace-nowrap border border-blue-100 dark:border-blue-800">
                        <AlertCircle className="h-3 w-3" /> Sedang Proses
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Estimasi pengerjaan: {step.estimatedDays} hari kerja.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
