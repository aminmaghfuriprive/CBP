
import React from 'react';
import { ContactFormData } from '@/hooks/useContactForm';

interface StepConfirmationProps {
  formData: ContactFormData;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({ formData }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
       <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-cbp-gold/50 shadow-sm relative overflow-hidden">
          <h4 className="font-bold text-lg text-cbp-navy dark:text-white mb-6 border-b-2 border-slate-100 dark:border-slate-800 pb-2">
             Periksa Kembali Data Anda
          </h4>
          
          <div className="space-y-4 text-sm relative z-10">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Nama Lengkap</span>
                <span className="sm:col-span-2 font-bold text-slate-900 dark:text-white">{formData.name}</span>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">WhatsApp</span>
                <span className="sm:col-span-2 font-bold text-slate-900 dark:text-white font-mono">{formData.whatsapp}</span>
             </div>
             
             <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Layanan</span>
                <span className="sm:col-span-2 font-bold text-slate-900 dark:text-white">{formData.service}</span>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-slate-500 font-medium">Jadwal</span>
                <span className="sm:col-span-2 font-bold text-slate-900 dark:text-white">
                  {formData.date} <span className="mx-2 text-slate-300">|</span> {formData.time} WIB
                </span>
             </div>

             {formData.notes && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-slate-500 font-medium">Catatan</span>
                    <span className="sm:col-span-2 text-slate-700 dark:text-slate-300 italic">"{formData.notes}"</span>
                </div>
             )}
          </div>
       </div>
       
       <p className="text-xs text-slate-500 text-center italic">
         Dengan mengirimkan formulir ini, Anda menyetujui kebijakan privasi kami untuk pemrosesan data.
       </p>
    </div>
  );
};
