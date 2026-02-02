
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname && (pathname.startsWith('/portal') || pathname.startsWith('/auth'))) return null;

  return (
    <footer className="bg-cbp-navy dark:bg-slate-950 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-cbp-gold" />
              <div>
                <span className="block font-serif font-bold text-xl leading-none tracking-tight text-white">CBP Corp</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cbp-gold">Legal Firm</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mitra hukum strategis terpercaya untuk korporasi dan individu. Mengutamakan integritas, keahlian, dan solusi yang personal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-cbp-gold hover:text-cbp-navy transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-cbp-gold hover:text-cbp-navy transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-cbp-gold hover:text-cbp-navy transition-colors"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white font-serif">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-cbp-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/services" className="hover:text-cbp-gold transition-colors">Layanan Hukum</Link></li>
              <li><Link href="/insights" className="hover:text-cbp-gold transition-colors">Artikel & Berita</Link></li>
              <li><Link href="/contact" className="hover:text-cbp-gold transition-colors">Buat Janji Temu</Link></li>
              <li><Link href="/careers" className="hover:text-cbp-gold transition-colors">Lowongan / Karir</Link></li>
            </ul>
          </div>

          {/* Services (Updated Divisions) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white font-serif">Area Praktik</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-cbp-gold transition-colors">Hukum Umum & Litigasi</Link></li>
              <li><Link href="/services" className="hover:text-cbp-gold transition-colors">Perizinan & Bisnis</Link></li>
              <li><Link href="/services" className="hover:text-cbp-gold transition-colors">Pertanahan & Agraria</Link></li>
              <li><Link href="/services" className="hover:text-cbp-gold transition-colors">Legal Administratif & Korporasi</Link></li>
            </ul>
          </div>

          {/* Contact (Updated Address) */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white font-serif">Kantor</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-cbp-gold flex-shrink-0" />
                <span>
                  Jl. Mr. Iskandar, Bangeran, Kamolan,<br/>
                  Kec. Blora, Kabupaten Blora,<br/>
                  Jawa Tengah 58219
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-cbp-gold flex-shrink-0" />
                <span>0296-5301710</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-cbp-gold flex-shrink-0" />
                <a href="mailto:info@cbpcorp.id" className="hover:text-white">info@cbpcorp.id</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} CBP Corp. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/legal#privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/legal#terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/legal#cookies" className="hover:text-white transition-colors">Cookie</Link>
            <Link href="/legal#faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
