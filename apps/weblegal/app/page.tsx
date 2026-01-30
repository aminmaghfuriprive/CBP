
import React from 'react';
import { Button } from '@cbp/ui';
import { SERVICES } from '@cbp/core';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, Users, Globe, Scale, ArrowRight } from 'lucide-react';

const TimeIcon = () => <Globe className="h-6 w-6" />;

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            alt="Corporate Skyscrapers" 
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-12 bg-cbp-gold"></div>
                <span className="text-cbp-gold font-bold tracking-[0.2em] text-sm uppercase">Since 2010</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight">
                Kepastian di<br />
                Tengah <br/>
                <span className="text-cbp-gold italic">Ketidakpastian.</span>
              </h1>
              
              <div className="border-l-2 border-slate-700 pl-6 mb-10">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  Di era yang penuh kompleksitas, Anda membutuhkan lebih dari sekadar pengacara. 
                  Anda membutuhkan <strong className="text-white font-semibold">mitra strategis</strong> yang mengamankan aset, reputasi, dan masa depan warisan Anda.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  {/* BUTTON 1 & 2: Force Gold/Navy style regardless of theme */}
                  <Button size="lg" className="bg-cbp-gold text-cbp-navy hover:bg-white hover:text-cbp-navy border-transparent transition-all duration-300 px-8 py-4 h-auto text-base w-full sm:w-auto shadow-lg shadow-cbp-gold/20 font-bold">
                    Jadwalkan Konsultasi
                  </Button>
                </Link>
                <Link href="/services">
                  {/* BUTTON 2: High contrast outline for dark bg */}
                  <Button variant="outline" size="lg" className="border-slate-400 text-slate-100 hover:border-white hover:text-white hover:bg-white/10 px-8 py-4 h-auto text-base w-full sm:w-auto">
                    Eksplorasi Layanan
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
              <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-cbp-gold to-slate-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                 <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md">
                    <Shield className="h-12 w-12 text-cbp-gold mb-6" />
                    <blockquote className="font-serif text-2xl text-slate-200 italic leading-relaxed mb-6">
                      "Justice is the constant and perpetual wish to render to every man his due."
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-slate-500"></div>
                      <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">Justinian I</span>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <div className="bg-cbp-navy dark:bg-slate-900 border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { label: "Tahun Pengalaman", value: "15+", icon: TimeIcon },
              { label: "Kasus Ditangani", value: "500+", icon: Scale },
              { label: "Gelar & Sertifikasi", value: "4", icon: Award },
              { label: "Kepuasan Klien", value: "100%", icon: Users }
            ].map((stat, idx) => (
              <div key={idx} className="py-8 px-4 text-center group hover:bg-white/5 transition-colors cursor-default">
                <p className="text-3xl md:text-4xl font-serif font-bold text-white mb-1 group-hover:text-cbp-gold transition-colors">{stat.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FOUNDER SPOTLIGHT */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-1">
              <div className="absolute -inset-4 bg-cbp-navy/5 dark:bg-cbp-gold/10 rounded-xl transform rotate-3"></div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto h-full min-h-[500px]">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1600" 
                  alt="Dr. Christian Bagoes Prasetyo" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cbp-navy/90 to-transparent p-8">
                  <p className="text-white font-serif text-2xl italic">"Kepercayaan Anda adalah amanah profesi saya."</p>
                  <p className="text-cbp-gold text-sm font-bold uppercase mt-2 tracking-widest">Dr. Christian Bagoes Prasetyo</p>
                </div>
              </div>
            </div>

            <div className="order-2">
              <h2 className="text-cbp-gold font-bold tracking-widest uppercase text-sm mb-4">Pimpinan Firma</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-cbp-navy dark:text-white mb-6 leading-tight">
                Satu Pintu untuk <br/>Solusi Hukum Komprehensif.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                Sebagai <i>Single Lawyer</i> dengan dukungan tim ahli yang solid, saya menawarkan pendekatan yang berbeda: <strong>Akuntabilitas Personal</strong>.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                Di CBP Corp, Anda tidak dilempar dari satu divisi ke divisi lain. Saya mengawasi langsung setiap strategi hukum, mulai dari litigasi rumit hingga pengurusan izin korporasi, memastikan standar kualitas yang saya pegang teguh sejak 2010 tetap terjaga.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-cbp-gold rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Doktor Ilmu Hukum & Magister Kenotariatan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-cbp-gold rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Auditor Hukum Tersertifikasi (CLA)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-cbp-gold rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Perancang Kontrak Tersertifikasi (CCD)</span>
                </div>
              </div>

              <Link href="/about">
                {/* BUTTON 4: Changed from text link to Button, Gold/Navy style consistent */}
                <Button size="lg" className="bg-cbp-gold text-cbp-navy hover:bg-cbp-navy hover:text-cbp-gold border-transparent transition-all duration-300 px-8 py-4 h-auto text-base shadow-lg shadow-cbp-gold/20 font-bold">
                   Lihat Profil Lengkap <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cbp-navy dark:text-white mb-6">Area Keahlian</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Layanan hukum terintegrasi di bawah supervisi langsung Dr. Christian.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service) => {
              const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;
              return (
                <div key={service.id} className="group relative bg-white dark:bg-slate-950 rounded-2xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cbp-gold to-cbp-goldlight transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cbp-navy dark:group-hover:bg-cbp-gold transition-colors duration-500">
                    <IconComponent className="h-8 w-8 text-cbp-navy dark:text-cbp-gold group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-cbp-navy dark:text-white mb-4 group-hover:text-cbp-gold transition-colors">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 min-h-[80px]">
                    {service.description}
                  </p>
                  
                  <Link href="/services" className="inline-flex items-center text-sm font-bold text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors">
                    Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="relative py-32 bg-cbp-navy dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cbp-navy/50 to-transparent"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
            Butuh Pendampingan Hukum?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
            Jangan biarkan masalah hukum Anda ditangani secara generik. Dapatkan analisis dan strategi langsung dari saya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              {/* BUTTON 3: Force Gold/Navy style regardless of theme */}
              <Button size="lg" className="bg-cbp-gold text-cbp-navy hover:bg-white hover:text-cbp-navy px-12 py-4 text-lg shadow-lg hover:shadow-cbp-gold/20 transform hover:-translate-y-1 transition-all border-transparent font-bold">
                Jadwalkan Konsultasi
              </Button>
            </Link>
            <Link href="/contact">
              {/* BUTTON 3: Force White Outline style regardless of theme */}
              <Button size="lg" variant="outline" className="px-12 py-4 text-lg border-slate-400 text-slate-100 hover:bg-white hover:text-cbp-navy hover:border-white">
                Hubungi Staf Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
