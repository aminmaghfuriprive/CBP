
"use client";

import React, { useState } from 'react';
import { ServiceStep } from '@cbp/core';
import { Button, Card } from '@cbp/ui';
import { Plus, Trash2, Clock } from 'lucide-react';

interface ServiceSOPManagerProps {
  steps: ServiceStep[];
  onStepsChange: (steps: ServiceStep[]) => void;
}

export const ServiceSOPManager: React.FC<ServiceSOPManagerProps> = ({ steps, onStepsChange }) => {
  const [newStep, setNewStep] = useState<Partial<ServiceStep>>({
    phase: 'Persiapan',
    task: '',
    estimatedDays: 1
  });

  const totalDays = steps.reduce((sum, step) => sum + step.estimatedDays, 0);

  const handleAddStep = () => {
    if (!newStep.task) return;
    const step: ServiceStep = {
      id: `step_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      phase: newStep.phase || 'Persiapan',
      task: newStep.task,
      estimatedDays: Number(newStep.estimatedDays) || 1
    };
    const updatedSteps = [...steps, step];
    onStepsChange(updatedSteps);
    setNewStep({ phase: 'Persiapan', task: '', estimatedDays: 1 });
  };

  const handleDeleteStep = (id: string) => {
    const updatedSteps = steps.filter(s => s.id !== id);
    onStepsChange(updatedSteps);
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Standar Operasional Prosedur (SOP)</h3>
          <p className="text-sm text-slate-500">Definisikan alur kerja layanan ini.</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-sm font-bold text-cbp-navy dark:text-cbp-gold flex items-center gap-2">
          <Clock className="h-4 w-4" /> Estimasi: {totalDays} Hari Kerja
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {steps.length > 0 ? (
          steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 group">
               <div className="h-8 w-8 rounded-full bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy flex items-center justify-center font-bold text-xs flex-shrink-0">
                 {index + 1}
               </div>
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{step.phase}</span>
                 </div>
                 <p className="font-bold text-slate-800 dark:text-white">{step.task}</p>
               </div>
               <div className="flex items-center gap-4">
                 <span className="text-sm text-slate-500 font-medium whitespace-nowrap">{step.estimatedDays} Hari</span>
                 <button 
                   onClick={() => handleDeleteStep(step.id)}
                   className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                 >
                   <Trash2 className="h-4 w-4" />
                 </button>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400">
            Belum ada langkah SOP. Silakan tambah langkah baru.
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2">
           <Plus className="h-4 w-4" /> Tambah Langkah Baru
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
           <div className="md:col-span-3">
             <label className="block text-xs font-bold text-slate-500 mb-1">Fase Pengerjaan</label>
             <select 
               className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
               value={newStep.phase}
               onChange={(e) => setNewStep({...newStep, phase: e.target.value})}
             >
               <option>Persiapan</option>
               <option>Eksekusi</option>
               <option>Review Internal</option>
               <option>Finalisasi</option>
               <option>Administrasi</option>
             </select>
           </div>
           <div className="md:col-span-6">
             <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi Tugas</label>
             <input 
               type="text"
               className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
               placeholder="Contoh: Verifikasi berkas fisik"
               value={newStep.task}
               onChange={(e) => setNewStep({...newStep, task: e.target.value})}
             />
           </div>
           <div className="md:col-span-2">
             <label className="block text-xs font-bold text-slate-500 mb-1">Durasi (Hari)</label>
             <input 
               type="number"
               min="1"
               className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
               value={newStep.estimatedDays}
               onChange={(e) => setNewStep({...newStep, estimatedDays: Number(e.target.value)})}
             />
           </div>
           <div className="md:col-span-1">
             <Button onClick={handleAddStep} className="w-full justify-center px-0">
               <Plus className="h-5 w-5" />
             </Button>
           </div>
        </div>
      </div>
    </Card>
  );
};
