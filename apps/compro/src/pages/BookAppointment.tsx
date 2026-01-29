import React, { useState } from 'react';
import { Card, Button } from '@cbp/ui';
import { Calendar, User, FileText, CheckCircle } from 'lucide-react';
import { SERVICES } from '@cbp/core';
import { Link } from 'react-router-dom';

export const BookAppointment: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
        <Card className="max-w-lg w-full text-center py-16 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-300">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white mb-4">Permintaan Terkirim</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 px-8 text-lg leading-relaxed">
            Terima kasih. Tim kami akan segera meninjau jadwal pengacara yang tersedia dan mengirimkan konfirmasi ke email Anda dalam waktu 1x24 jam.
          </p>
          <div className="flex justify-center gap-4">
             <Link to="/">
               <Button variant="outline">Kembali ke Beranda</Button>
             </Link>
             <Button onClick={() => setSubmitted(false)}>Buat Janji Baru</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 pt-20">
      <div className="bg-cbp-navy dark:bg-slate-900 py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Buat Janji Temu</h1>
          <p className="text-slate-300 text-lg md:text-xl">Jadwalkan konsultasi eksklusif dengan pakar hukum kami.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 -mt-20 relative z-10">
        <Card className="shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-cbp-navy dark:text-cbp-gold flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <User className="h-5 w-5" /> Informasi Diri
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                  <input required type="text" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all placeholder-slate-400" placeholder="Cth: Budi Santoso" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input required type="email" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all placeholder-slate-400" placeholder="nama@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nomor Telepon / WhatsApp</label>
                  <input required type="tel" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all placeholder-slate-400" placeholder="0812..." />
                </div>
              </div>

              {/* Consultation Details */}
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-cbp-navy dark:text-cbp-gold flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <Calendar className="h-5 w-5" /> Detail Konsultasi
                </h3>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Layanan Hukum</label>
                  <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all">
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="Lainnya">Lainnya / Umum</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tanggal</label>
                    <input required type="date" className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Waktu</label>
                    <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all">
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>13:00</option>
                      <option>15:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-cbp-navy dark:text-cbp-gold flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <FileText className="h-5 w-5" /> Catatan Tambahan
              </h3>
              <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold outline-none transition-all placeholder-slate-400" placeholder="Jelaskan secara singkat permasalahan hukum Anda..."></textarea>
            </div>

            <div className="pt-6 flex items-center justify-end border-t border-slate-100 dark:border-slate-800">
              <Button type="submit" size="lg" className="w-full md:w-auto px-10 bg-cbp-navy text-white hover:bg-slate-800 dark:bg-cbp-gold dark:text-cbp-navy dark:hover:bg-white font-bold tracking-wide">
                Ajukan Jadwal
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};