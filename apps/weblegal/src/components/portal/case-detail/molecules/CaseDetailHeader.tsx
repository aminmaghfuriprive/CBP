
import React from 'react';
import { CaseData } from '@cbp/core';
import { Badge, Button } from '@cbp/ui';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface CaseDetailHeaderProps {
  caseData: CaseData;
  onBack: () => void;
}

export const CaseDetailHeader: React.FC<CaseDetailHeaderProps> = ({ caseData, onBack }) => {
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <button 
        onClick={onBack} 
        className="flex items-center text-sm font-bold text-slate-500 hover:text-cbp-navy dark:hover:text-cbp-gold transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Dashboard
      </button>

      {/* Hero Card */}
      <div className="bg-cbp-navy dark:bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={caseData.status === 'Aktif' ? 'success' : 'neutral'} className="border-none shadow-sm">
                {caseData.status}
              </Badge>
              <span className="text-xs font-mono text-slate-400">ID: {caseData.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{caseData.caseType}</h1>
            <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">{caseData.description}</p>
          </div>
          
          <div className="flex gap-3">
             <Button variant="secondary" size="sm" className="gap-2">
               <MessageSquare className="h-4 w-4" /> Hubungi Lawyer
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
