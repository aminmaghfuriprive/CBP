
import React from 'react';
import { SERVICES } from '@cbp/core';
import { ContactFormData } from '@/hooks/useContactForm';

interface StepScheduleProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const StepSchedule: React.FC<StepScheduleProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Layanan Hukum</label>
        <select 
            name="service" 
            value={formData.service} 
            onChange={onChange} 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-cbp-gold outline-none transition-all"
        >
          {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          <option value="Lainnya">Lainnya / Konsultasi Umum</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input 
            required 
            name="date" 
            value={formData.date} 
            onChange={onChange} 
            type="date" 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Waktu</label>
          <select 
            name="time" 
            value={formData.time} 
            onChange={onChange} 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-cbp-gold outline-none transition-all"
          >
            <option>09:00</option><option>10:00</option><option>11:00</option><option>13:00</option><option>14:00</option><option>15:00</option><option>16:00</option>
          </select>
        </div>
      </div>
      
      <div>
         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Catatan Awal (Opsional)</label>
         <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={onChange} 
            rows={4} 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all resize-none" 
            placeholder="Ceritakan sedikit tentang masalah hukum Anda..." 
         />
      </div>
    </div>
  );
};
