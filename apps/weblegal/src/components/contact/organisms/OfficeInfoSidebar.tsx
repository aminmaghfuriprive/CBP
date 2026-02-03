
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const OfficeInfoSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1 h-full hidden lg:block">
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
                    Jl. Mr. Iskandar, Bangeran, Kamolan,<br/>
                    Kec. Blora, Kabupaten Blora,<br/>
                    Jawa Tengah 58219
                  </p>
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
                  <p className="text-slate-300 text-sm font-mono tracking-wide">0296-5301710</p>
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
                  <p className="text-slate-300 text-sm font-medium">
                    Senin - Jumat<br/>
                    09:00 - 17:00 WIB
                  </p>
                  <p className="text-slate-300 text-sm font-medium mt-2">
                    Sabtu<br/>
                    09:00 - 14:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-500 text-center">
            CBP Corp Legal Firm &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};
