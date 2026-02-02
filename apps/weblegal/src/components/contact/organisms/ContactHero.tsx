
import React from 'react';

export const ContactHero: React.FC = () => {
  return (
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
  );
};
