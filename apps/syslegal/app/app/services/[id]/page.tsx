
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, ServiceItem, useServiceLogic } from '@cbp/core';
import { Button, Card, Badge } from '@cbp/ui';
import { ArrowLeft, DollarSign, FileText, Save, Trash2, Globe } from 'lucide-react';
import { ServiceSOPManager } from '@/components/services/ServiceSOPManager';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const service = useLiveQuery(() => db.services.get(id), [id]);
  const { updateService, deleteService } = useServiceLogic();

  // Form State
  const [formData, setFormData] = useState<Partial<ServiceItem>>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        division: service.division,
        basePrice: service.basePrice,
        description: service.description,
        isActive: service.isActive
      });
    }
  }, [service]);

  const handleChange = (field: keyof ServiceItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSaveInfo = async () => {
    if (service) {
      await updateService(service.id, formData);
      setIsDirty(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini beserta seluruh SOP-nya?')) {
      await deleteService(id);
      router.push('/app/services');
    }
  };

  // Handler untuk SOP Change
  const handleSopChange = (newSteps: any[]) => {
    if(service) {
       updateService(service.id, { sop: newSteps });
    }
  };

  if (!service) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <button onClick={() => router.push('/app/services')} className="flex items-center text-sm text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-cbp-gold mb-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Daftar Layanan
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">{service.title}</h1>
              <Badge variant={service.isActive ? 'success' : 'neutral'}>{service.isActive ? 'Active' : 'Draft'}</Badge>
           </div>
           <p className="text-slate-500 dark:text-slate-400">{service.division}</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}>
             <Trash2 className="h-4 w-4 mr-2" /> Hapus
           </Button>
           {isDirty && (
             <Button onClick={handleSaveInfo} className="animate-in fade-in zoom-in duration-300">
               <Save className="h-4 w-4 mr-2" /> Simpan Perubahan
             </Button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & SOP */}
        <div className="lg:col-span-2 space-y-8">
           {/* Basic Info Editor */}
           <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-cbp-gold" /> Informasi Dasar
              </h3>
              <div className="space-y-4">
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama Layanan</label>
                   <input 
                     className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                     value={formData.title}
                     onChange={(e) => handleChange('title', e.target.value)}
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deskripsi Publik</label>
                   <textarea 
                     rows={3}
                     className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                     value={formData.description}
                     onChange={(e) => handleChange('description', e.target.value)}
                   />
                </div>
              </div>
           </Card>

           {/* SOP Module */}
           <ServiceSOPManager 
             steps={service.sop || []} 
             onStepsChange={handleSopChange} 
             serviceTitle={formData.title}
             serviceDescription={formData.description}
           />
        </div>

        {/* Right Column: Settings & Summary */}
        <div className="space-y-6">
           <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-cbp-navy dark:text-white mb-4">Pengaturan</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Divisi Penanggung Jawab</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
                    value={formData.division}
                    onChange={(e) => handleChange('division', e.target.value)}
                  >
                    <option value="Hukum Umum & Litigasi">Hukum Umum & Litigasi</option>
                    <option value="Perizinan & Bisnis">Perizinan & Bisnis</option>
                    <option value="Pertanahan & Agraria">Pertanahan & Agraria</option>
                    <option value="Legal Administratif & Korporasi">Legal Administratif & Korporasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Harga Dasar (Mulai Dari)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                        type="number"
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
                        value={formData.basePrice}
                        onChange={(e) => handleChange('basePrice', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status Layanan</span>
                   <button 
                     onClick={() => handleChange('isActive', !formData.isActive)}
                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.isActive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                   >
                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                   </button>
                </div>
              </div>
           </Card>

           <div className="bg-cbp-navy dark:bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
              <Globe className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
              <h4 className="font-bold text-lg mb-2 relative z-10">Tampilan Web</h4>
              <p className="text-slate-300 text-sm mb-4 relative z-10">Lihat bagaimana layanan ini ditampilkan kepada calon klien di website publik.</p>
              <Button size="sm" variant="secondary" className="w-full relative z-10">Preview Halaman</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
