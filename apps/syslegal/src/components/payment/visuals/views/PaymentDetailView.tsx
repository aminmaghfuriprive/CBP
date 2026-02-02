
import React from 'react';
import { ChevronLeft, CreditCard } from 'lucide-react';
import { Button } from '@cbp/ui';
import { Invoice } from '@cbp/core';
import { BankOption } from '../../data/types';
import { PaymentTimer } from '../atoms';
import { VirtualAccountDisplay, QrisDisplay } from '../fragments';

interface PaymentDetailViewProps {
  invoice: Invoice;
  selectedBank: BankOption;
  copied: boolean;
  onCopy: () => void;
  onChangeMethod: () => void;
  onSimulate: () => void;
}

export const PaymentDetailView: React.FC<PaymentDetailViewProps> = ({ 
  invoice, 
  selectedBank, 
  copied, 
  onCopy, 
  onChangeMethod, 
  onSimulate 
}) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
      {/* Navigation Action */}
      <button 
        onClick={onChangeMethod} 
        className="flex items-center text-xs text-slate-500 hover:text-slate-800 mb-2 font-bold w-fit"
      >
        <ChevronLeft className="h-3 w-3 mr-1" /> Change Method
      </button>

      {/* Main Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center flex-1 flex flex-col items-center">
        
        {/* Timer Atom */}
        <PaymentTimer />

        {/* Content Switching Logic */}
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          {selectedBank.type === 'VA' ? (
            <VirtualAccountDisplay 
              bank={selectedBank}
              invoice={invoice}
              copied={copied}
              onCopy={onCopy}
            />
          ) : (
            <QrisDisplay />
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto w-full pt-4 border-t border-slate-100">
          <Button 
            onClick={onSimulate} 
            className="w-full bg-green-600 hover:bg-green-700 text-white border-transparent shadow-lg shadow-green-600/20 py-3"
          >
            <CreditCard className="h-4 w-4 mr-2" /> Simulasi Bayar (Demo)
          </Button>
        </div>
      </div>
    </div>
  );
};
