import React from 'react';
import { Card, Button } from '@cbp/ui';
import { Gavel } from 'lucide-react';

interface LegalBasisCardProps {
  legalBasis: string[];
  onReset?: () => void;
}

export const LegalBasisCard: React.FC<LegalBasisCardProps> = ({ legalBasis, onReset }) => {
  return (
    <Card className="bg-slate-900 text-white border-slate-800 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <h4 className="font-bold text-white flex items-center gap-2 mb-6 relative z-10">
        <Gavel className="h-5 w-5 text-cbp-gold" /> Dasar Hukum Relevan
      </h4>
      
      <ul className="space-y-2 relative z-10">
        {legalBasis.map((law, idx) => (
          <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="h-2 w-2 bg-cbp-gold rounded-full flex-shrink-0"></div>
            <span className="text-sm font-mono text-slate-200">{law}</span>
          </li>
        ))}
      </ul>

      {onReset && (
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end relative z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset} 
            className="text-xs border-slate-600 text-slate-400 hover:text-white hover:border-white bg-transparent"
          >
            Analisis Ulang
          </Button>
        </div>
      )}
    </Card>
  );
};