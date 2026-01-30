
import React from 'react';
import { Card, SectionHeader } from '@cbp/ui';
import { TEAM } from '@cbp/core';
import { Award, BookOpen, Scale, GraduationCap, Quote } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const founder = TEAM.find(m => m.id === 'team_founder');
  // Mengurutkan staff agar Finance tampil, lalu Produksi
  const staff = TEAM.filter(m => m.id !== 'team_founder');

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pt-20">
      
      {/* 1. FOUNDER HERO HEADER */}
      <div className="bg-cbp-navy dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/80 to-cbp-navy/40 dark:from-slate-900 dark:via-slate-900/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Founder Image */}
            <div className="w-full md:w-5/12">
               <div className="relative group aspect-[3/4] w-full max-w-md mx-auto">
                 <div className="absolute -inset-4 bg-cbp-gold/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition duration-1000"></div>
                 <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-cbp-gold/30 shadow-2xl">
                    <Image 
                      src={founder?.imageUrl || ''} 
                      alt={founder?.name || 'Founder'} 
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy/80 via-transparent to-transparent opacity-60"></div>
                 </div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border-l-4 border-cbp-gold hidden md:block animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <p className="font-serif font-bold text-3xl text-cbp-navy dark:text-cbp-gold">15+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Tahun Pengalaman</p>
                 </div>
               </div>
            </div>

            {/* Founder Content */}
            <div className="w-full md:w-7/12 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbp-gold/10 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
                Founder & Managing Partner
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
                {founder?.name.split(',')[0]}
                <span className="block text-2xl lg:text-3xl font-sans font-light text-slate-300 mt-2">
                  {founder?.name.split(',').slice(1).join(',')}
                </span>
              </h1>
              
              <div className="relative pl-6 border-l-2 border-cbp-gold mb-8">
                <Quote className="absolute -top-2 -left-3 h-6 w-6 text-cbp-gold bg-cbp-navy dark:bg-slate-900 p-1 rounded-full" />
                <p className="text-xl text-slate-200 font-serif italic leading-relaxed">
                  "Integritas adalah mata uang yang paling berharga dalam hukum. Kami hadir bukan hanya sebagai penasihat, tapi sebagai benteng pelindung kepentingan Anda."
                </p>
              </div>
              
              <div className="space-y-6 text-slate-300 leading-relaxed mb-10 text-lg font-light">
                <p>
                  Dengan pengalaman lebih dari satu dekade di dunia hukum Indonesia, saya mendirikan CBP Corp dengan visi tunggal: menghadirkan layanan hukum yang tidak hanya ahli secara teknis, tetapi juga personal dan berorientasi pada solusi praktis.
                </p>
                <p>
                  Saya memegang lisensi ganda sebagai Pengacara dan Notaris (M.Kn), serta tersertifikasi sebagai Auditor Hukum (CLA) dan Perancang Kontrak (CCD). Kombinasi kompetensi ini memungkinkan saya melihat masalah hukum dari perspektif menyeluruh—baik dari sisi litigasi di pengadilan maupun preventif melalui legalitas dokumen.
                </p>
              </div>

              {/* Credentials Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-cbp-gold/10 rounded-lg text-cbp-gold"><GraduationCap className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Akademik</p>
                      <p className="font-bold text-sm">Doktor Ilmu Hukum</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-cbp-gold/10 rounded-lg text-cbp-gold"><BookOpen className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Spesialisasi</p>
                      <p className="font-bold text-sm">Magister Kenotariatan</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-cbp-gold/10 rounded-lg text-cbp-gold"><Award className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Lisensi</p>
                      <p className="font-bold text-sm">Certified Legal Auditor</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="p-2 bg-cbp-gold/10 rounded-lg text-cbp-gold"><Scale className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Keahlian</p>
                      <p className="font-bold text-sm">Contract Drafter (CCD)</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PHILOSOPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-10 md:p-16 text-center">
            <SectionHeader 
              title='Filosofi "Single Lawyer"'
              subtitle="Berbeda dengan firma besar di mana kasus Anda mungkin ditangani oleh junior associate yang berganti-ganti, di CBP Corp, saya adalah penanggung jawab utama kasus Anda."
            />
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-4xl mx-auto mt-[-2rem]">
              Saya secara pribadi merancang strategi, mengawasi pembuatan dokumen, dan memimpin negosiasi. Model ini menjamin konsistensi kualitas, kerahasiaan maksimal, dan komunikasi yang lebih efisien. Anda menyewa keahlian saya, dan itulah yang Anda dapatkan.
            </p>
        </div>
      </section>

      {/* 3. SUPPORT TEAM */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Tim Operasional"
            subtitle="Untuk memastikan layanan berjalan efisien, saya didukung oleh staf profesional yang menangani aspek administratif dan teknis."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {staff.map((member) => (
              <Card key={member.id} className="text-center group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500" padding={false}>
                <div className="aspect-square overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
                  <div className="absolute inset-0 bg-cbp-navy/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-8 bg-white dark:bg-slate-900 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cbp-gold text-cbp-navy text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
                    {member.role}
                  </div>
                  <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-2 pt-2">{member.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{member.specialty}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
