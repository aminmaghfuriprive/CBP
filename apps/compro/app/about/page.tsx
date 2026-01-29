import React from 'react';
import { Card } from '@cbp/ui';
import { TEAM } from '@cbp/core';
import { Award, BookOpen, Scale, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const founder = TEAM.find(m => m.id === 'team_founder');
  const staff = TEAM.filter(m => m.id !== 'team_founder');

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pt-20">
      
      {/* 1. FOUNDER HERO HEADER */}
      <div className="bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
               <div className="relative group aspect-[3/4] w-full">
                 <div className="absolute -inset-2 bg-cbp-gold rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                 <Image 
                   src={founder?.imageUrl || ''} 
                   alt={founder?.name || 'Founder'} 
                   fill
                   className="relative rounded-lg shadow-2xl border-2 border-slate-700 grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                 />
               </div>
            </div>

            <div className="w-full md:w-2/3 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cbp-gold/20 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
                Founder & Managing Partner
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{founder?.name}</h1>
              <p className="text-slate-400 text-lg mb-8 font-light italic">"Integritas adalah mata uang yang paling berharga dalam hukum."</p>
              
              <div className="space-y-6 text-slate-300 leading-relaxed mb-10">
                <p>
                  Dengan pengalaman lebih dari 15 tahun di dunia hukum Indonesia, saya mendirikan CBP Corp dengan visi tunggal: menghadirkan layanan hukum yang tidak hanya ahli secara teknis, tetapi juga personal dan berorientasi pada solusi praktis.
                </p>
                <p>
                  Saya memegang lisensi ganda sebagai Pengacara dan Notaris (M.Kn), serta tersertifikasi sebagai Auditor Hukum (CLA) dan Perancang Kontrak (CCD). Kombinasi kompetensi ini memungkinkan saya melihat masalah hukum dari perspektif menyeluruh—baik dari sisi litigasi di pengadilan maupun preventif melalui legalitas dokumen.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cbp-gold/50 transition-colors">
                    <GraduationCap className="h-6 w-6 text-cbp-gold" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Pendidikan</p>
                      <p className="font-bold text-sm">Doktor Ilmu Hukum</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cbp-gold/50 transition-colors">
                    <BookOpen className="h-6 w-6 text-cbp-gold" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Spesialisasi</p>
                      <p className="font-bold text-sm">Magister Kenotariatan</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cbp-gold/50 transition-colors">
                    <Award className="h-6 w-6 text-cbp-gold" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Sertifikasi</p>
                      <p className="font-bold text-sm">Certified Legal Auditor</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cbp-gold/50 transition-colors">
                    <Scale className="h-6 w-6 text-cbp-gold" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Sertifikasi</p>
                      <p className="font-bold text-sm">Contract Drafter (CCD)</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PHILOSOPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white mb-6">Filosofi "Single Lawyer"</h2>
            <div className="w-24 h-1 bg-cbp-gold mx-auto mb-8"></div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-4xl mx-auto">
              Berbeda dengan firma besar di mana kasus Anda mungkin ditangani oleh junior associate yang berganti-ganti, di CBP Corp, <strong>saya adalah penanggung jawab utama kasus Anda</strong>. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-4xl mx-auto mt-4">
              Saya secara pribadi merancang strategi, mengawasi pembuatan dokumen, dan memimpin negosiasi. Model ini menjamin konsistensi kualitas, kerahasiaan maksimal, dan komunikasi yang lebih efisien. Anda menyewa keahlian saya, dan itulah yang Anda dapatkan.
            </p>
        </div>
      </section>

      {/* 3. SUPPORT TEAM */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cbp-navy dark:text-white mb-4">Tim Pendukung & Staf Ahli</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Untuk memastikan operasional berjalan cepat dan lancar, saya didukung oleh tim profesional yang berdedikasi di bidangnya masing-masing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member) => (
              <Card key={member.id} className="text-center group hover:-translate-y-1 transition-transform duration-300" padding={false}>
                <div className="h-64 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-white dark:bg-slate-900">
                  <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1 line-clamp-1">{member.name}</h3>
                  <p className="text-cbp-gold font-bold text-xs uppercase tracking-widest mb-2">{member.role}</p>
                  <div className="w-8 h-px bg-slate-200 dark:bg-slate-700 mx-auto mb-3"></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{member.specialty}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}