
"use client";

import React, { useState, useEffect } from 'react';
import { ClientData, useData, useClientLogic, useEmployeeLogic, User } from '@cbp/core';
import { X, Trash2, Edit, ExternalLink, UserPlus, Building2, User as UserIcon, Save, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@cbp/ui';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, onClose, client }) => {
  // Logic Hooks
  const { cases, invoices } = useData();
  const { addClient, deleteClient } = useClientLogic();
  const { addEmployee } = useEmployeeLogic(); // Used for adding Client User Account

  // State for Create Mode
  const [clientType, setClientType] = useState<'INDIVIDUAL' | 'CORPORATE'>('INDIVIDUAL');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    industry: '',
    picName: '', // Corporate Only
    occupation: '', // Individual Only
    generatePortal: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form on open
  useEffect(() => {
    if (isOpen && !client) {
      setFormData({
        name: '',
        email: '',
        contact: '',
        address: '',
        industry: 'Teknologi',
        picName: '',
        occupation: '',
        generatePortal: true
      });
      setClientType('INDIVIDUAL');
    }
  }, [isOpen, client]);

  if (!isOpen) return null;

  // --- LOGIC: CREATE CLIENT ---
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const industryValue = clientType === 'CORPORATE' ? formData.industry : 'Perorangan';
      
      // 1. Create Client Data
      const newClient: ClientData = {
        id: `cl_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        address: formData.address,
        industry: industryValue,
      };

      await addClient(newClient);

      // 2. Auto-Create Portal Account (Optional)
      if (formData.generatePortal && formData.email) {
        const newUser: User = {
          id: `u_${Date.now()}`, // Shared ID or mapped
          name: formData.name,
          email: formData.email,
          role: 'CLIENT',
          division: null,
          // In real app, password would be generated/hashed or sent via invite link
        };
        await addEmployee(newUser); 
      }

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- LOGIC: VIEW CLIENT (Stats Calculation) ---
  const clientCases = client ? cases.filter(c => c.clientName === client.name) : [];
  const clientInvoices = client ? invoices.filter(i => i.clientName === client.name) : [];
  
  const totalCases = clientCases.length;
  const activeCases = clientCases.filter(c => c.status === 'Aktif').length;
  const unpaidAmount = clientInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const handleDelete = () => {
    if (client && confirm(`Yakin ingin menghapus data ${client.name}?`)) {
      deleteClient(client.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* --- MODAL HEADER --- */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                {client ? (
                  <Building2 className="h-5 w-5 text-cbp-navy dark:text-cbp-gold" />
                ) : (
                  <UserPlus className="h-5 w-5 text-cbp-gold" />
                )}
             </div>
             <div>
                <h3 className="font-bold text-lg text-cbp-navy dark:text-white leading-none">
                  {client ? 'Detail Profil Klien' : 'Registrasi Klien Baru'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {client ? `ID: ${client.id}` : 'Lengkapi data identitas & akses sistem'}
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* --- MODAL BODY --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* A. CREATE MODE */}
          {!client ? (
            <form id="create-client-form" onSubmit={handleCreate} className="p-6 space-y-6">
               
               {/* 1. Tipe Klien Switcher */}
               <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setClientType('INDIVIDUAL')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      clientType === 'INDIVIDUAL' 
                        ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <UserIcon className="h-4 w-4" /> Perorangan
                  </button>
                  <button
                    type="button"
                    onClick={() => setClientType('CORPORATE')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      clientType === 'CORPORATE' 
                        ? 'bg-white dark:bg-slate-700 text-cbp-navy dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Building2 className="h-4 w-4" /> Perusahaan
                  </button>
               </div>

               {/* 2. Identitas Utama */}
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      {clientType === 'CORPORATE' ? 'Nama Resmi Perusahaan (PT/CV)' : 'Nama Lengkap (Sesuai KTP)'} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      required
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
                      placeholder={clientType === 'CORPORATE' ? 'Contoh: PT. Maju Jaya Abadi' : 'Contoh: Budi Santoso, S.H.'}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Resmi <span className="text-red-500">*</span></label>
                        <input 
                          required
                          type="email"
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">No. WhatsApp / HP <span className="text-red-500">*</span></label>
                        <input 
                          required
                          type="tel"
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
                          value={formData.contact}
                          onChange={(e) => handleInputChange('contact', e.target.value)}
                        />
                     </div>
                  </div>

                  {/* Conditional Fields */}
                  {clientType === 'CORPORATE' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sektor Industri</label>
                          <select 
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white cursor-pointer"
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                          >
                            <option>Teknologi</option>
                            <option>Manufaktur</option>
                            <option>F&B (Kuliner)</option>
                            <option>Properti & Konstruksi</option>
                            <option>Pertambangan & Energi</option>
                            <option>Jasa Keuangan</option>
                            <option>Lainnya</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama PIC</label>
                          <input 
                            type="text"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
                            placeholder="Penanggung Jawab"
                            value={formData.picName}
                            onChange={(e) => handleInputChange('picName', e.target.value)}
                          />
                       </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-top-2">
                       <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Pekerjaan</label>
                       <input 
                          type="text"
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
                          placeholder="Swasta / PNS / Wiraswasta"
                          value={formData.occupation}
                          onChange={(e) => handleInputChange('occupation', e.target.value)}
                        />
                    </div>
                  )}

                  <div>
                     <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Alamat Lengkap</label>
                     <textarea 
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white resize-none"
                        placeholder="Jalan, Nomor, Kelurahan, Kecamatan..."
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                     />
                  </div>
               </div>

               {/* 3. System Access */}
               <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-xl flex items-start gap-3">
                  <div className="mt-0.5 text-blue-600 dark:text-blue-400">
                     <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                     <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Akses Portal Klien</h4>
                     <p className="text-xs text-blue-600 dark:text-blue-400/80 mb-3 leading-relaxed">
                        Akun login akan dibuat otomatis menggunakan email di atas. Klien dapat memantau status kasus dan tagihan melalui portal.
                     </p>
                     <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={formData.generatePortal}
                          onChange={(e) => handleInputChange('generatePortal', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">
                           Aktifkan Akun Portal (Default)
                        </span>
                     </label>
                  </div>
               </div>

            </form>
          ) : (
            // B. VIEW MODE (Existing Layout)
            <div className="px-8 py-8 space-y-8">
              <ClientProfileHeader client={client} />
              
              <ClientStatsOverview 
                totalCases={totalCases} 
                activeCases={activeCases} 
                unpaidAmount={unpaidAmount} 
              />

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Informasi Kontak</h4>
                <ClientContactInfo client={client} />
              </div>

              {clientCases.length > 0 && (
                 <div className="space-y-3">
                   <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Riwayat Kasus Terbaru</h4>
                   <div className="space-y-2">
                     {clientCases.slice(0, 3).map(c => (
                       <div key={c.id} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.caseType}</p>
                            <p className="text-xs text-slate-500">{c.currentStage.replace(/_/g, ' ')}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded ${c.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {c.status}
                          </span>
                       </div>
                     ))}
                   </div>
                 </div>
              )}
            </div>
          )}
        </div>

        {/* --- MODAL FOOTER --- */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
           {!client ? (
             <>
               <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
               <Button 
                 type="submit" 
                 form="create-client-form" 
                 disabled={isSubmitting}
                 className="shadow-lg shadow-cbp-navy/10"
               >
                 {isSubmitting ? (
                   <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</span>
                 ) : (
                   <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Simpan Data</span>
                 )}
               </Button>
             </>
           ) : (
             <>
               <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleDelete}>
                 <Trash2 className="h-4 w-4 mr-2" /> Hapus Klien
               </Button>
               <div className="flex gap-3">
                 <Button variant="outline" className="gap-2">
                   <Edit className="h-4 w-4" /> Edit Profil
                 </Button>
                 <Button className="gap-2">
                   <ExternalLink className="h-4 w-4" /> Buka File Lengkap
                 </Button>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};
