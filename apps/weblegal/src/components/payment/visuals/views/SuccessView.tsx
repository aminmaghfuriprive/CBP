
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SuccessView: React.FC = () => (
  <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-green-100 shadow-xl">
      <ShieldCheck className="h-10 w-10 text-green-600" />
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-2">Pembayaran Berhasil!</h3>
    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
      Terima kasih. Invoice Anda telah lunas. Sistem akan mengalihkan Anda kembali.
    </p>
  </div>
);
