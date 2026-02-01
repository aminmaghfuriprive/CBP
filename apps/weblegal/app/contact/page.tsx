
"use client";

import React, { useState } from 'react';
import { Card, Button } from '@cbp/ui';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { SERVICES, useLeadLogic, Lead } from '@cbp/core';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const { addLead } = useLeadLogic();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    address: '',
    district: '',
    city: '',
    province: '',
    country: 'Indonesia',
    service: SERVICES[0]?.title || 'Konsultasi Umum',
    date: '', // Still kept for UI but will be saved in notes
    time: '09:00',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (isNavigating) return;

    // Validation Step 1
    if (step === 1) {
        if (!formData.name || !formData.whatsapp) {
            alert("Mohon lengkapi Nama dan Nomor WhatsApp.");
            return;
        }
    }
    // Validation Step 2
    if (step === 2) {
        if (!formData.date) {
            alert("Mohon pilih tanggal konsultasi.");
            return;
        }
    }

    setIsNavigating(true);
    setStep(s => s + 1);
    setTimeout(() => setIsNavigating(false), 500);
  };
  
  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step > 1) setStep(s => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNavigating) return;

    // IMPORVISASI: Data masuk ke Leads Marketing dulu, bukan Booking/Client langsung.
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: formData.name,
      contact: formData.whatsapp,
      email: formData.email, // Added field
      interest: formData.service,
      source: 'Website',
      status: 'New',
      address: `${formData.address}, ${formData.district}, ${formData.city}`,
      notes: `Req Tanggal: ${formData.date} Jam ${formData.time}. Ket: ${formData.notes}`,
      createdAt: new Date().toISOString()
    };

    addLead(newLead);
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < 3 && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-10 relative px-4">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
      <div className="absolute top-1/2 left-0 h-0.5 bg-cbp-gold -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2 relative z-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
            step >= s 
              ? 'bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy border-cbp-navy dark:border-cbp-gold' 
              : 'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600 border-slate-200 dark:border-slate-700'
          }`}>
            {step > s ? <CheckCircle className="h-5 w-5" /> : s}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-400 dark:text-slate-600'}`}>
            {s === 1 ? 'Data Diri' : s === 2 ? 'Jadwal' : 'Konfirmasi'}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-32 pb-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hubungi & Reservasi</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Jadwalkan konsultasi hukum atau kunjungi kantor kami. Tim kami siap memberikan solusi terbaik untuk Anda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: INFORMASI KANTOR */}
          <div className="lg:col-span-1 h-full hidden lg:block">
            <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden h-full relative border border-slate-700">
              <div className="absolute inset-0 bg-gradient-to-br from-cbp-navy to-slate-900 opacity-90 z-0"></div>
              
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <h3 className="text-2xl font-serif font-bold mb-8 text-cbp-gold border-b border-white/10 pb-4">
                  Informasi Kantor
                </h3>
                
                <div className="space-y-8 flex-1">
                  <div className="group">
                    <div className="flex items-start gap-4 mb-2">
                      <div className="bg-cbp-gold/10 p-3 rounded-xl group-hover:bg-cbp-gold group-hover:text-cbp-navy transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-cbp-gold group-hover:text-cbp-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Alamat Utama</h4>
                        <p className="text-slate-300 leading-relaxed text-sm">
                          Equity Tower Lt. 35<br/>
                          SCBD Lot 9, Jl. Jend. Sudirman Kav. 52-53<br/>
                          Jakarta Selatan 12190
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="bg-cbp-gold/10 p-3 rounded-xl group-hover:bg-cbp-gold group-hover:text-cbp-navy transition-colors duration-300">
                        <Phone className="h-6 w-6 text-cbp-gold group-hover:text-cbp-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Telepon</h4>
                        <p className="text-slate-300 text-sm font-mono tracking-wide">+62 21 5555 8888</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="bg-cbp-gold/10 p-3 rounded-xl group-hover:bg-cbp-gold group-hover:text-cbp-navy transition-colors duration-300">
                        <Mail className="h-6 w-6 text-cbp-gold group-hover:text-cbp-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Email</h4>
                        <a href="mailto:info@cbpcorp.id" className="text-slate-300 text-sm hover:text-white transition-colors block">info@cbpcorp.id</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-500 text-center">
                  CBP Corp Legal Firm &copy; {new Date().getFullYear()}
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: FORMULIR WIZARD */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl flex flex-col justify-between">
              
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Permintaan Terkirim</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                    Terima kasih. Data Anda telah masuk ke sistem kami. Tim Marketing kami akan segera menghubungi Anda untuk konfirmasi jadwal.
                  </p>
                  <Button onClick={() => { setSubmitted(false); setStep(1); }} variant="outline">Buat Jadwal Baru</Button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Buat Janji Temu</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Lengkapi data diri dan preferensi jadwal konsultasi Anda.</p>
                    {renderStepIndicator()}
                  </div>
                  
                  <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex-1">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                            <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Cth: Budi Santoso" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nomor WhatsApp</label>
                            <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="0812..." />
                          </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email (Opsional)</label>
                           <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="email@anda.com" />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Alamat Lengkap</label>
                           <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Jalan, Nomor Rumah..." />
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Layanan Hukum</label>
                          <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer">
                            {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                            <option value="Lainnya">Lainnya / Konsultasi Umum</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal</label>
                            <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Waktu</label>
                            <select name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer">
                              <option>09:00</option><option>10:00</option><option>11:00</option><option>13:00</option><option>14:00</option><option>15:00</option><option>16:00</option>
                            </select>
                          </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Catatan Awal (Opsional)</label>
                           <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Ceritakan sedikit tentang masalah hukum Anda..." />
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
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
                            </div>
                         </div>
                      </div>
                    )}
                    
                    {/* NAVIGATION BUTTONS */}
                    <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-100 dark:border-slate-800">
                      {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" /> Kembali
                        </Button>
                      ) : (<div></div>)}
                      
                      {step < 3 ? (
                        <Button type="button" onClick={nextStep} disabled={isNavigating} className="bg-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy flex items-center gap-2 px-6">
                          Lanjut <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isNavigating} className="bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-lg shadow-cbp-gold/20 font-bold px-8">
                          Kirim Permintaan
                        </Button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
