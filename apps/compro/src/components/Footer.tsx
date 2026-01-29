import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cbp-navy dark:bg-slate-950 text-slate-300 py-16 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-serif font-bold mb-6 tracking-wide">CBP Corp</h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Berkomitmen memberikan layanan hukum premium dengan integritas tanpa kompromi untuk melindungi kepentingan Anda di era modern.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cbp-gold transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cbp-gold transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-cbp-gold transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-serif font-bold mb-6">Layanan</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cbp-gold transition-colors">Hukum Korporasi</a></li>
              <li><a href="#" className="hover:text-cbp-gold transition-colors">Litigasi & Sengketa</a></li>
              <li><a href="#" className="hover:text-cbp-gold transition-colors">Hukum Properti</a></li>
              <li><a href="#" className="hover:text-cbp-gold transition-colors">Kekayaan Intelektual</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-serif font-bold mb-6">Kontak</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cbp-gold flex-shrink-0" />
                <span>Equity Tower Lt. 35, SCBD Lot 9<br/>Jl. Jend. Sudirman Kav. 52-53<br/>Jakarta Selatan 12190</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cbp-gold flex-shrink-0" />
                <span>+62 21 5555 8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cbp-gold flex-shrink-0" />
                <span>info@cbpcorp.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-serif font-bold mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Dapatkan update regulasi terbaru.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-slate-800/50 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-cbp-gold transition-colors"
              />
              <button className="bg-cbp-gold text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-cbp-golddark transition-colors">
                Berlangganan
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} CBP Corp Law Firm. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cbp-gold">Kebijakan Privasi</a>
            <a href="#" className="hover:text-cbp-gold">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-cbp-gold">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};