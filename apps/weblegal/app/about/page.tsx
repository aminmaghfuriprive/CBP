
import React from 'react';
import { Card, SectionHeader } from '@cbp/ui';
import { TEAM } from '@cbp/core';
import { Award, BookOpen, Scale, GraduationCap, Quote, ShieldCheck, Clock, Users, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const founder = TEAM.find(m => m.id === 'team_founder');
  // Filter teams
  const expertStaff = TEAM.filter(m => m.role.toLowerCase().includes('produksi') || m.specialty.includes('Divisi'));
  const supportStaff = TEAM.filter(m => !m.role.toLowerCase().includes('produksi') && !m.specialty.includes('Divisi') && m.id !== 'team_founder');

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. FOUNDER HERO HEADER */}
      <div className="bg-cbp-navy dark:bg-slate-900 relative overflow-hidden pt-32 pb-32 md:pb-48">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/80 to-cbp-navy/40 dark:from-slate-900 dark:via-slate-900/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Founder Image */}
            <div className="w-full md:w-5/12 order-2 md:order-1">
               <div className="relative group aspect-[3/4] w-full max-w-sm mx-auto md:mr-auto">
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
               </div>
            </div>

            {/* Founder Content */}
            <div className="w-full md:w-7/12 text-white order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbp-gold/10 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
                Founder & Managing Partner
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
                {founder?.name.split(',')[0]}
              </h1>
              <div className="relative pl-6 border-l-4 border-cbp-gold mb-8">
                <p className="text-xl md:text-2xl text-slate-200 font-serif italic leading-relaxed">
                  "Integritas adalah mata uang yang paling berharga dalam hukum. Tanpa itu, keadilan hanyalah ilusi."
                </p>
              </div>
              <div className="text-slate-300 leading-relaxed space-y-4 text-lg font-light">
                <p>
                  Dengan pengalaman lebih dari satu dekade, saya mendirikan CBP Corp dengan visi tunggal: menghadirkan layanan hukum yang tidak hanya ahli secara teknis, tetapi juga personal dan berintegritas.
                </p>
                <p>
                  Saya percaya bahwa setiap klien berhak mendapatkan akses langsung ke pemikir strategi utama, bukan hanya dilayani oleh staf junior tanpa pengawasan.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <GraduationCap className="h-5 w-5 text-cbp-gold" />
                    <span className="text-sm font-bold">Doktor Ilmu Hukum</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <Award className="h-5 w-5 text-cbp-gold" />
                    <span className="text-sm font-bold">Certified Legal Auditor</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PHILOSOPHY & VALUES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-10 md:p-16 text-center border-b border-slate-100 dark:border-slate-800">
                <SectionHeader 
                  title='Filosofi "Single Lawyer"'
                  subtitle="Di CBP Corp, Dr. Christian adalah penanggung jawab utama & tunggal untuk strategi kasus Anda."
                />
                <div className="max-w-4xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed space-y-6 text-lg">
                   <p>
                     Berbeda dengan firma hukum besar ("Big Law") di mana kasus Anda seringkali didelegasikan sepenuhnya kepada associate junior dengan jam terbang minim, CBP Corp menerapkan konsep <strong>Single Lawyer Accountability</strong>.
                   </p>
                   <p>
                     Setiap dokumen legal, setiap strategi litigasi, dan setiap nasihat hukum yang keluar dari kantor ini telah melalui review dan persetujuan langsung dari saya. Tim pendukung bekerja untuk efisiensi, tetapi otak strategi tetap satu. Ini menjamin konsistensi kualitas dan akuntabilitas yang tidak terpecah.
                   </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950">
               <div className="p-10 text-center hover:bg-white dark:hover:bg-slate-900 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                     <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-3">Integritas Absolut</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Kami menolak segala bentuk suap atau praktik curang (jual beli perkara). Kemenangan yang bermartabat adalah satu-satunya kemenangan yang kami kejar.
                  </p>
               </div>
               <div className="p-10 text-center hover:bg-white dark:hover:bg-slate-900 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6">
                     <Scale className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-3">Keahlian Spesifik</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Kami tidak menjadi "palugada". Fokus kami adalah Hukum Korporasi, Litigasi Bisnis, dan Pertanahan. Kami ahli di bidang yang kami pilih.
                  </p>
               </div>
               <div className="p-10 text-center hover:bg-white dark:hover:bg-slate-900 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6">
                     <HeartHandshake className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-3">Personal & Empati</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Hukum bukan hanya soal pasal, tapi soal manusia. Kami mendengarkan kekhawatiran Anda dan memberikan solusi yang menenangkan.
                  </p>
               </div>
            </div>
        </div>
      </section>

      {/* 3. ORGANIZATION SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Tim Ahli & Produksi" 
            subtitle="Para sarjana hukum berdedikasi yang mendukung setiap langkah operasional firma."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {expertStaff.map((member) => (
                <Card key={member.id} className="text-center group bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500" padding={false}>
                  <div className="aspect-[3/4] overflow-hidden relative border-b border-slate-200 dark:border-slate-800">
                    <div className="absolute inset-0 bg-cbp-navy/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <Image 
                      src={member.imageUrl} 
                      alt={member.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1 leading-tight">{member.name}</h3>
                    <p className="text-xs text-cbp-gold font-bold uppercase tracking-wider mb-2">{member.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{member.specialty}</p>
                  </div>
                </Card>
              ))}
          </div>

          {supportStaff.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                 <h3 className="text-xl font-serif font-bold text-slate-400 uppercase tracking-widest">Manajemen & Pendukung</h3>
                 <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {supportStaff.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                       <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                       </div>
                       <div>
                          <h4 className="font-bold text-cbp-navy dark:text-white text-sm">{member.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">{member.specialty}</p>
                       </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
