
import React from 'react';
import { Button } from '@cbp/ui';
import { Globe } from 'lucide-react';

export const ServiceWebPreview: React.FC = () => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
      <Globe className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
      
      <h4 className="font-bold text-lg mb-2 relative z-10">Tampilan Web</h4>
      
      <p className="text-slate-300 text-sm mb-4 relative z-10 leading-relaxed">
        Lihat bagaimana layanan ini ditampilkan kepada calon klien di website publik CBP Corp.
      </p>
      
      <Button 
        size="sm" 
        variant="secondary" 
        className="w-full relative z-10 font-bold"
        onClick={() => window.open('/services', '_blank')}
      >
        Preview Halaman
      </Button>
    </div>
  );
};
