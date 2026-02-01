
"use client";

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Copy, CheckCircle, CreditCard, Smartphone, Building2, ChevronLeft, Loader2, ShieldCheck, QrCode, Clock } from 'lucide-react';
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
  const [selectedBank, setSelectedBank] = useState<{ name: string; color: string; type: 'VA' | 'QRIS' } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('SELECT_METHOD');
      setSelectedBank(null);
    }
  }, [isOpen]);

  if (!isOpen || !invoice) return null;

  const handleSelectBank = (name: string, color: string, type: 'VA' | 'QRIS') => {
    setSelectedBank({ name, color, type });
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative">
        
        {/* HEADER BRANDING MIDTRANS-STYLE */}
        <div className="bg-white border-b border-slate-100 p-4 shadow-sm relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-lg text-slate-800 tracking-tight">Secure Payment</span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors bg-slate-100 p-1 rounded-full"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Amount</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrencyIDR(invoice.amount)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
              <p className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{invoice.id}</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
          
          {step === 'SELECT_METHOD' && (
            <div className="space-y-4 animate-in slide-in-from-right-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Method</p>
              
              {/* Virtual Account Group */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                   <Building2 className="h-4 w-4 text-blue-600" /> <span className="text-sm font-bold text-slate-700">Bank Transfer</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { name: 'BCA', color: 'bg-blue-600' }, 
                    { name: 'Mandiri', color: 'bg-yellow-500' }, 
                    { name: 'BNI', color: 'bg-orange-500' }, 
                    { name: 'BRI', color: 'bg-blue-800' }
                  ].map((bank) => (
                    <button key={bank.name} onClick={() => handleSelectBank(bank.name, bank.color, 'VA')} className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-6 ${bank.color} rounded text-[8px] font-bold flex items-center justify-center text-white shadow-sm`}>{bank.name}</div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{bank.name} Virtual Account</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                    </button>
                  ))}
                </div>
              </div>

              {/* QRIS Group */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                   <QrCode className="h-4 w-4 text-slate-700" /> <span className="text-sm font-bold text-slate-700">QRIS</span>
                </div>
                <button onClick={() => handleSelectBank('GoPay / QRIS', 'bg-slate-800', 'QRIS')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-white border border-slate-200 rounded text-[8px] font-bold flex items-center justify-center text-slate-800 shadow-sm">QRIS</div>
                      <span className="text-sm font-medium text-slate-700">GoPay / ShopeePay / OVO</span>
                   </div>
                   <ChevronRight className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>
          )}

          {step === 'PAYMENT_DETAIL' && selectedBank && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
              <button onClick={() => setStep('SELECT_METHOD')} className="flex items-center text-xs text-slate-500 hover:text-slate-800 mb-2 font-bold">
                <ChevronLeft className="h-3 w-3 mr-1" /> Change Method
              </button>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center flex-1 flex flex-col items-center">
                 
                 {/* Timer Mock */}
                 <div className="flex items-center gap-2 text-xs font-mono text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-6">
                    <Clock className="h-3 w-3" /> Sisa Waktu: 23:59:45
                 </div>

                 {selectedBank.type === 'VA' ? (
                   <>
                     <div className={`w-16 h-16 mx-auto ${selectedBank.color} rounded-2xl flex items-center justify-center mb-4 text-xs font-bold text-white shadow-lg`}>
                        {selectedBank.name}
                     </div>
                     <p className="text-sm text-slate-500 mb-1">Nomor Virtual Account</p>
                     <div className="flex items-center justify-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100 w-full">
                        <h2 className="text-xl font-bold text-slate-800 tracking-wider font-mono">70070{invoice.id.replace(/\D/g, '').substring(0, 8)}</h2>
                        <button onClick={handleCopy} className="p-1.5 hover:bg-white rounded text-blue-600 transition-colors" title="Salin">
                           {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        </button>
                     </div>
                     <div className="text-xs text-slate-400 mb-6 max-w-xs leading-relaxed">
                        Transfer ke nomor di atas sebelum waktu habis. Pembayaran akan terverifikasi otomatis.
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden group border-4 border-slate-900">
                        <QrCode className="h-32 w-32 text-white opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white font-bold text-xs">Scan via App</span>
                        </div>
                     </div>
                     <p className="text-sm font-bold text-slate-700 mb-1">Scan QRIS</p>
                     <p className="text-xs text-slate-400 mb-6">Buka aplikasi Gojek/OVO/Shopee Anda.</p>
                   </>
                 )}

                 <div className="mt-auto w-full pt-4 border-t border-slate-100">
                    <Button onClick={simulatePayment} className="w-full bg-green-600 hover:bg-green-700 text-white border-transparent shadow-lg shadow-green-600/20 py-3">
                        <CreditCard className="h-4 w-4 mr-2" /> Simulasi Bayar (Demo)
                    </Button>
                 </div>
              </div>
            </div>
          )}

          {step === 'PROCESSING' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
               <div className="relative">
                 <div className="h-16 w-16 rounded-full border-4 border-slate-200"></div>
                 <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
               </div>
               <h3 className="font-bold text-slate-800 mt-6 text-lg">Memproses Pembayaran...</h3>
               <p className="text-xs text-slate-500 mt-2">Mohon tunggu sebentar, jangan tutup halaman ini.</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-green-100 shadow-xl">
                  <ShieldCheck className="h-10 w-10 text-green-600" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">Pembayaran Berhasil!</h3>
               <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                 Terima kasih. Invoice Anda telah lunas. Sistem akan mengalihkan Anda kembali.
               </p>
            </div>
          )}

        </div>
        
        {/* FOOTER LOGO */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
           <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 opacity-70">
             <ShieldCheck className="h-3 w-3" /> Powered by Mock Payment Gateway
           </p>
        </div>
      </div>
    </div>
  );
};
