import React from 'react';
import { Card, Button } from '@cbp/ui';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pt-20">
      <div className="bg-cbp-navy dark:bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hubungi Kami</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Tim kami siap mendengarkan dan memberikan solusi hukum terbaik untuk Anda. Silakan isi formulir di bawah atau kunjungi kantor kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 h-full">
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
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold text-cbp-gold mt-3 hover:underline">
                          Petunjuk Arah <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
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
                        <p className="text-slate-400 text-xs mt-1">Fax: +62 21 5555 8889</p>
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
                        <a href="mailto:karir@cbpcorp.id" className="text-slate-300 text-sm hover:text-white transition-colors block">karir@cbpcorp.id</a>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="bg-cbp-gold/10 p-3 rounded-xl group-hover:bg-cbp-gold group-hover:text-cbp-navy transition-colors duration-300">
                        <Clock className="h-6 w-6 text-cbp-gold group-hover:text-cbp-navy" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Jam Operasional</h4>
                        <div className="flex justify-between text-sm text-slate-300 w-48">
                          <span>Senin - Jumat</span>
                          <span>09:00 - 17:00</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500 w-48 mt-1">
                          <span>Sabtu - Minggu</span>
                          <span>Tutup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-500 text-center">
                  CBP Corp Legal Firm &copy; 2023
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Kirim Pesan</h3>
                <p className="text-slate-500 dark:text-slate-400">Silakan lengkapi formulir di bawah ini. Kami akan merespons dalam 1x24 jam.</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold focus:border-transparent outline-none transition-all placeholder-slate-400" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold focus:border-transparent outline-none transition-all placeholder-slate-400" placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subjek</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold focus:border-transparent outline-none transition-all cursor-pointer">
                    <option>Konsultasi Umum</option>
                    <option>Sengketa Bisnis</option>
                    <option>Hukum Keluarga</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pesan</label>
                  <textarea rows={6} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold focus:border-transparent outline-none transition-all placeholder-slate-400" placeholder="Jelaskan kebutuhan hukum Anda secara singkat..."></textarea>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                   <p className="text-xs text-slate-400 hidden sm:block">
                     Data Anda dilindungi oleh Kebijakan Privasi kami.
                   </p>
                   <Button size="lg" className="w-full sm:w-auto px-8 bg-cbp-navy text-white hover:bg-slate-800 dark:bg-cbp-gold dark:text-cbp-navy dark:hover:bg-white shadow-lg shadow-cbp-navy/20">
                     Kirim Pesan
                   </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <div className="mt-20">
           <h3 className="text-xl font-serif font-bold text-center mb-8 text-cbp-navy dark:text-white">Pertanyaan Umum</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
             <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
               <h4 className="font-bold text-cbp-navy dark:text-white mb-2">Apakah konsultasi awal berbayar?</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400">Untuk konsultasi awal via email (assessment), kami tidak memungut biaya. Biaya konsultasi mendalam akan diinformasikan setelah review awal.</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
               <h4 className="font-bold text-cbp-navy dark:text-white mb-2">Apakah parkir tersedia?</h4>
               <p className="text-sm text-slate-600 dark:text-slate-400">Ya, tersedia parkir tamu di basement Equity Tower. Silakan tukarkan ID Card di resepsionis lobi utama.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}