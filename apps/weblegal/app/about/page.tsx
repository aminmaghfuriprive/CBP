
import React from 'react';
import { Card, SectionHeader } from '@cbp/ui';
import { TEAM } from '@cbp/core';
import { Award, BookOpen, Scale, GraduationCap, Quote } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const founder = TEAM.find(m => m.id === 'team_founder');
  const expertStaff = TEAM.filter(m => m.role.toLowerCase().includes('produksi'));
  const supportStaff = TEAM.filter(m => !m.role.toLowerCase().includes('produksi') && m.id !== 'team_founder');

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. FOUNDER HERO HEADER - Extended top padding */}
      <div className="bg-cbp-navy dark:bg-slate-900 relative overflow-hidden pt-32 pb-24 md:pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/80 to-cbp-navy/40 dark:from-slate-900 dark:via-slate-900/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
               </div>
            </div>

            {/* Founder Content */}
            <div className="w-full md:w-7/12 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbp-gold/10 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
                Founder & Managing Partner
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
                {founder?.name.split(',')[0]}
              </h1>
              <div className="relative pl-6 border-l-2 border-cbp-gold mb-8">
                <p className="text-xl text-slate-200 font-serif italic leading-relaxed">
                  "Integritas adalah mata uang yang paling berharga dalam hukum."
                </p>
              </div>
              <p className="text-slate-300 leading-relaxed mb-10 text-lg font-light">
                Dengan pengalaman lebih dari satu dekade, saya mendirikan CBP Corp dengan visi tunggal: menghadirkan layanan hukum yang tidak hanya ahli secara teknis, tetapi juga personal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PHILOSOPHY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-10 md:p-16 text-center">
            <SectionHeader 
              title='Filosofi "Single Lawyer"'
              subtitle="Di CBP Corp, saya adalah penanggung jawab utama kasus Anda."
            />
        </div>
      </section>

      {/* 3. ORGANIZATION SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Staf Ahli & Tim Pendukung" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {expertStaff.map((member) => (
                <Card key={member.id} className="text-center group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-500" padding={false}>
                  <div className="aspect-[4/3] overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-md font-bold text-cbp-navy dark:text-white mb-1">{member.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{member.role}</p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
