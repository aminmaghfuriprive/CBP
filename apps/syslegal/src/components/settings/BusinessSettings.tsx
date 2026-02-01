
"use client";

import React, { useState } from 'react';
import { useNotifications, COMPANY_NAME, TAGLINE, db } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Building, MapPin, Phone, Globe, Save, FileText, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';

export const BusinessSettings: React.FC = () => {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [bizData, setBizData] = useState({
    name: COMPANY_NAME,
    tagline: TAGLINE,
    address: 'Equity Tower Lt. 35, SCBD Lot 9, Jl. Jend. Sudirman Kav. 52-53',
    phone: '+62 21 5555 8888',
    website: 'www.cbpcorp.id'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBizData({ ...bizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addNotification('Disimpan', 'Informasi bisnis berhasil diperbarui.', 'success');
    }, 1200);
  };

  const handleReset = async () => {
    if (confirm('PERINGATAN: Ini akan menghapus semua data transaksi, klien baru, dan dokumen yang tersimpan di browser ini, lalu mengembalikan ke data awal (Mock Data). Lanjutkan?')) {
      setIsResetting(true);
      await db.resetDatabase();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <h3 className="font-bold text-cbp-navy dark:text-white mb-1 flex items-center gap-2">
                <Building className="h-5 w-5 text-cbp-gold" /> Identitas Firma
              </h3>
              <p className="text-sm text-slate-500 mb-4">Informasi ini akan tampil di kop surat dan invoice.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Perusahaan</label>
              <input 
                name="name" type="text" value={bizData.name} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tagline / Slogan</label>
              <input 
                name="tagline" type="text" value={bizData.tagline} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
              />
            </div>

            <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                 <MapPin className="h-4 w-4 inline mr-1 text-slate-400" /> Alamat Lengkap
               </label>
               <textarea 
                 name="address" rows={3} value={bizData.address} onChange={handleChange}
                 className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
               />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                 <Phone className="h-4 w-4 inline mr-1 text-slate-400" /> Telepon Kantor
              </label>
              <input 
                name="phone" type="text" value={bizData.phone} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                 <Globe className="h-4 w-4 inline mr-1 text-slate-400" /> Website
              </label>
              <input 
                name="website" type="text" value={bizData.website} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <Button type="button" variant="ghost" className="text-slate-500 gap-2">
               <FileText className="h-4 w-4" /> Preview Kop Surat
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Save className="h-4 w-4" /> {isLoading ? 'Menyimpan...' : 'Update Profil Bisnis'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl">
         <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone: Factory Reset
         </h4>
         <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-4">
            Fitur ini akan menghapus seluruh data lokal (Database Browser) dan mengembalikannya ke kondisi awal (Mock Data Default). Gunakan ini jika Anda ingin membersihkan data setelah demo aplikasi.
         </p>
         <Button 
           onClick={handleReset} 
           disabled={isResetting}
           className="bg-red-600 hover:bg-red-700 text-white border-transparent gap-2"
         >
           {isResetting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
           {isResetting ? 'Mereset...' : 'Reset Database & Reload'}
         </Button>
      </div>
    </div>
  );
};
