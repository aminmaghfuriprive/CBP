
import React from 'react';

export const ProcessingView: React.FC = () => (
  <div className="h-full flex flex-col items-center justify-center text-center py-12">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-slate-200"></div>
      <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
    </div>
    <h3 className="font-bold text-slate-800 mt-6 text-lg">Memproses Pembayaran...</h3>
    <p className="text-xs text-slate-500 mt-2">Mohon tunggu sebentar, jangan tutup halaman ini.</p>
  </div>
);
