
import React from 'react';
import { ContactFormData } from '@/hooks/useContactForm';

interface StepPersonalDataProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const StepPersonalData: React.FC<StepPersonalDataProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input 
            required 
            name="name" 
            value={formData.name} 
            onChange={onChange} 
            type="text" 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
            placeholder="Cth: Budi Santoso" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input 
            required 
            name="whatsapp" 
            value={formData.whatsapp} 
            onChange={onChange} 
            type="tel" 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
            placeholder="0812..." 
          />
        </div>
      </div>
      <div>
         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email (Opsional)</label>
         <input 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            type="email" 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
            placeholder="email@anda.com" 
         />
      </div>
      <div>
         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Alamat Lengkap</label>
         <textarea 
            name="address" 
            value={formData.address} 
            onChange={onChange} 
            rows={2} 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-gold outline-none transition-all resize-none" 
            placeholder="Jalan, Nomor Rumah..." 
         />
      </div>
    </div>
  );
};
