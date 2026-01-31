
import React from 'react';
import { ServiceStep } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Plus } from 'lucide-react';

interface SOPAddFormProps {
  data: Partial<ServiceStep>;
  onChange: (updates: Partial<ServiceStep>) => void;
  onAdd: () => void;
}

export const SOPAddForm: React.FC<SOPAddFormProps> = ({ data, onChange, onAdd }) => {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-800">
      <h4 className="text-sm font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2">
         <Plus className="h-4 w-4" /> Tambah Langkah Manual
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
         <div className="md:col-span-3">
           <label className="block text-xs font-bold text-slate-500 mb-1">Fase Pengerjaan</label>
           <select 
             className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
             value={data.phase}
             onChange={(e) => onChange({ phase: e.target.value })}
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
             value={data.task || ''}
             onChange={(e) => onChange({ task: e.target.value })}
           />
         </div>
         <div className="md:col-span-2">
           <label className="block text-xs font-bold text-slate-500 mb-1">Durasi (Hari)</label>
           <input 
             type="number"
             min="1"
             className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
             value={data.estimatedDays || 1}
             onChange={(e) => onChange({ estimatedDays: Number(e.target.value) })}
           />
         </div>
         <div className="md:col-span-1">
           <Button onClick={onAdd} className="w-full justify-center px-0">
             <Plus className="h-5 w-5" />
           </Button>
         </div>
      </div>
    </div>
  );
};
