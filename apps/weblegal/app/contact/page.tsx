
"use client";

import React, { useState } from 'react';
import { Card, Button } from '@cbp/ui';
import { Mail, Phone, MapPin, Clock, ExternalLink, User, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { SERVICES } from '@cbp/core';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    address: '',
    district: '',
    city: '',
    province: '',
    country: 'Indonesia',
    service: SERVICES[0]?.title || 'Konsultasi Umum',
    date: '',
    time: '09:00',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
        if (!formData.name || !formData.whatsapp) {
            alert("Mohon lengkapi Nama dan Nomor WhatsApp.");
            return;
        }
    }
    if (step === 2) {
        if (!formData.date) {
            alert("Mohon pilih tanggal konsultasi.");
            return;
        }
    }
    setStep(s => s + 1);
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < 3) {
      e.preventDefault();
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8 relative px-4">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
      <div className="absolute top-1/2 left-0 h-0.5 bg-cbp-gold -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2">
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
      
      {/* HERO SECTION - Dark background extends to top, padded for Navbar */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
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
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-cbp-gold mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">Alamat Utama</h4>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        Equity Tower Lt. 35<br/>
                        SCBD Lot 9, Jl. Jend. Sudirman<br/>
                        Jakarta Selatan 12190
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-cbp-gold mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">Telepon</h4>
                      <p className="text-slate-300 text-sm font-mono">+62 21 5555 8888</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-cbp-gold mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <p className="text-slate-300 text-sm">info@cbpcorp.id</p>
                    </div>
                  </div>
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
                    Terima kasih. Tim kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal dalam waktu 1x24 jam.
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
                    {/* STEP 1: IDENTITAS & ALAMAT */}
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
                           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Alamat Lengkap</label>
                           <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white" placeholder="Alamat..." />
                        </div>
                      </div>
                    )}

                    {/* STEP 2: JADWAL */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Layanan Hukum</label>
                          <select name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
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
                            <select name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                              <option>09:00</option><option>10:00</option><option>11:00</option><option>13:00</option><option>14:00</option><option>15:00</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: SUMMARY */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold text-cbp-navy dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Ringkasan Data</h4>
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                               <div className="text-slate-500">Nama Lengkap</div>
                               <div className="font-bold text-slate-900 dark:text-white text-right">{formData.name}</div>
                               <div className="text-slate-500">WhatsApp</div>
                               <div className="font-bold text-slate-900 dark:text-white text-right">{formData.whatsapp}</div>
                               <div className="text-slate-500">Layanan</div>
                               <div className="font-bold text-slate-900 dark:text-white text-right">{formData.service}</div>
                               <div className="text-slate-500">Jadwal</div>
                               <div className="font-bold text-slate-900 dark:text-white text-right">{formData.date} @ {formData.time}</div>
                            </div>
                         </div>
                         <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-sm text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/20">
                            <p>Pastikan data sudah benar sebelum konfirmasi.</p>
                         </div>
                      </div>
                    )}
                    
                    {/* BUTTONS */}
                    <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-100 dark:border-slate-800">
                      {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep}>Kembali</Button>
                      ) : (<div></div>)}
                      
                      {step < 3 ? (
                        <Button type="button" onClick={nextStep} className="bg-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy">Lanjut</Button>
                      ) : (
                        <Button type="submit" className="bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy">Konfirmasi Booking</Button>
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
