
import React from 'react';
import { CaseLifecycle } from '@cbp/core';
import { Check, Circle, ArrowRight } from 'lucide-react';

interface LifecycleStepperProps {
  currentStage: CaseLifecycle;
  onAdvance: () => void;
  isUpdating?: boolean;
}

const PHASES: { id: CaseLifecycle; label: string; desc: string }[] = [
  { id: 'PRE_PRODUCTION', label: 'Pra-Produksi', desc: 'Onboarding & Verifikasi' },
  { id: 'PRODUCTION', label: 'Produksi', desc: 'Pengerjaan & Litigasi' },
  { id: 'POST_PRODUCTION', label: 'Pasca-Produksi', desc: 'Penagihan & Serah Terima' },
  { id: 'ARCHIVED', label: 'Arsip', desc: 'Kasus Selesai' }
];

export const LifecycleStepper: React.FC<LifecycleStepperProps> = ({ currentStage, onAdvance, isUpdating }) => {
  const currentIndex = PHASES.findIndex(p => p.id === currentStage);

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between w-full">
        {/* Connecting Line Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10" />
        
        {/* Active Line Progress */}
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-cbp-navy dark:bg-cbp-gold -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / (PHASES.length - 1)) * 100}%` }}
        />

        {PHASES.map((phase, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={phase.id} className="flex flex-col items-center group relative">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10
                  ${isCompleted 
                    ? 'bg-cbp-navy border-cbp-navy text-white dark:bg-cbp-gold dark:border-cbp-gold dark:text-cbp-navy' 
                    : isActive 
                      ? 'bg-white border-cbp-navy text-cbp-navy dark:bg-slate-900 dark:border-cbp-gold dark:text-cbp-gold scale-110 shadow-lg' 
                      : 'bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                  }
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : isActive ? <div className="w-3 h-3 rounded-full bg-current animate-pulse" /> : <Circle className="w-5 h-5" />}
              </div>
              
              <div className="absolute top-14 text-center w-32">
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isActive ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {phase.label}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:block">
                  {phase.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button for Next Stage */}
      {currentStage !== 'ARCHIVED' && (
        <div className="flex justify-end mt-12">
          <button
            onClick={onAdvance}
            disabled={isUpdating}
            className="flex items-center gap-2 px-4 py-2 bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy rounded-lg text-sm font-bold shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? 'Memproses...' : 'Lanjut Fase Berikutnya'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
