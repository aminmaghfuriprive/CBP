
"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Copy, CheckCircle, CreditCard, Smartphone, Building2, ChevronLeft, Loader2, ShieldCheck } from 'lucide-react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';
import { Button } from '@cbp/ui';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSuccess: () => void;
}

type PaymentStep = 'SELECT_METHOD' | 'PAYMENT_DETAIL' | 'PROCESSING' | 'SUCCESS';

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({ isOpen, onClose, invoice, onSuccess }) => {
  const [step, setStep] = useState<PaymentStep>('SELECT_METHOD');
  const [selectedBank, setSelectedBank] = useState<{ name: string; color: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('SELECT_METHOD');
      setSelectedBank(null);
    }
  }, [isOpen]);

  if (!isOpen || !invoice) return null;

  const handleSelectBank = (name: string, color: string) => {
    setSelectedBank({ name, color });
    setStep('PAYMENT_DETAIL');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`70070${invoice.id.replace(/\D/g, '')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    setStep('PROCESSING');
    setTimeout(() => {
      setStep('SUCCESS');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-white border-b p-4 shadow-sm relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">CBP Payment</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Tagihan</p>
              <p className="text-xl font-bold text-cbp-navy">{formatCurrencyIDR(invoice.amount)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Order ID</p>
              <p className="text-xs font-mono font-bold text-slate-600">{invoice.id}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
          {step === 'SELECT_METHOD' && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Metode Pembayaran</p>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                   <Building2 className="h-4 w-4 text-slate-500" /> <span className="text-sm font-bold text-slate-700">Virtual Account</span>
                </div>
                <div>
                  {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                    <button key={bank} onClick={() => handleSelectBank(bank, 'bg-blue-600')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-slate-200 rounded text-[10px] font-bold flex items-center justify-center text-slate-500">{bank}</div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-cbp-navy">{bank} Virtual Account</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                   <Smartphone className="h-4 w-4 text-slate-500" /> <span className="text-sm font-bold text-slate-700">E-Wallet / QRIS</span>
                </div>
                <button onClick={() => handleSelectBank('QRIS', 'bg-slate-800')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-slate-200 rounded text-[10px] font-bold flex items-center justify-center text-slate-500">QRIS</div>
                      <span className="text-sm font-medium text-slate-700">GoPay / ShopeePay / OVO</span>
                   </div>
                   <ChevronRight className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>
          )}

          {step === 'PAYMENT_DETAIL' && selectedBank && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <button onClick={() => setStep('SELECT_METHOD')} className="flex items-center text-xs text-slate-500 hover:text-slate-800 mb-2">
                <ChevronLeft className="h-4 w-4" /> Ganti Metode Pembayaran
              </button>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                 <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 text-xs font-bold text-slate-600 border border-slate-200">
                    {selectedBank.name}
                 </div>
                 <p className="text-sm text-slate-500 mb-1">Nomor Virtual Account</p>
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-wider">70070{invoice.id.replace(/\D/g, '').substring(0, 8)}</h2>
                    <button onClick={handleCopy} className="p-1.5 hover:bg-slate-100 rounded text-cbp-gold transition-colors" title="Salin">
                       {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                 </div>
                 <Button onClick={simulatePayment} className="w-full bg-green-600 hover:bg-green-700 text-white border-transparent">
                    <CreditCard className="h-4 w-4 mr-2" /> Simulasi Bayar
                 </Button>
              </div>
            </div>
          )}

          {step === 'PROCESSING' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
               <Loader2 className="h-12 w-12 animate-spin text-cbp-navy mb-4" />
               <h3 className="font-bold text-slate-800">Memproses...</h3>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="h-10 w-10 text-green-600" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Berhasil!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
