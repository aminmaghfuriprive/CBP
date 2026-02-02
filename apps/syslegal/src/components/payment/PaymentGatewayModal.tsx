
"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PaymentGatewayModalProps } from './data/types';
import { usePaymentGateway } from './hooks/usePaymentGateway';
import {
  PaymentHeader,
  MethodSelectionView,
  PaymentDetailView,
  ProcessingView,
  SuccessView
} from './visuals'; // Updated import path from './visuals/molecules' to './visuals'

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = (props) => {
  const { isOpen, onClose, invoice } = props;

  // Logic Layer: State & Handlers
  const { 
    step, 
    selectedBank, 
    copied, 
    handleSelectBank, 
    handleCopy, 
    simulatePayment, 
    resetSelection 
  } = usePaymentGateway(props);

  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
        
        {/* Header */}
        <PaymentHeader invoice={invoice} onClose={onClose} />

        {/* Body Content Orchestrator */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
          {step === 'SELECT_METHOD' && (
            <MethodSelectionView onSelectBank={handleSelectBank} />
          )}

          {step === 'PAYMENT_DETAIL' && selectedBank && (
            <PaymentDetailView
              invoice={invoice}
              selectedBank={selectedBank}
              copied={copied}
              onCopy={handleCopy}
              onChangeMethod={resetSelection}
              onSimulate={simulatePayment}
            />
          )}

          {step === 'PROCESSING' && <ProcessingView />}
          {step === 'SUCCESS' && <SuccessView />}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 opacity-70">
            <ShieldCheck className="h-3 w-3" /> Powered by Mock Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
};
