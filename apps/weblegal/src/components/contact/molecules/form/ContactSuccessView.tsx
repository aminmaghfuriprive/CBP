
import React from 'react';
import { Button } from '@cbp/ui';
import { CheckCircle } from 'lucide-react';

interface ContactSuccessViewProps {
  onReset: () => void;
}

export const ContactSuccessView: React.FC<ContactSuccessViewProps> = ({ onReset }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Permintaan Terkirim</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Terima kasih. Data Anda telah masuk ke sistem kami. Tim Marketing kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
      </p>
      <Button onClick={onReset} variant="outline" className="border-cbp-navy text-cbp-navy dark:border-white dark:text-white hover:bg-cbp-navy hover:text-white dark:hover:bg-white dark:hover:text-slate-900">
        Buat Jadwal Baru
      </Button>
    </div>
  );
};
