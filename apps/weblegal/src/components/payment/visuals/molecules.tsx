
import React from 'react';
import { ShieldCheck, X, Building2, QrCode, ChevronLeft, CreditCard } from 'lucide-react';
import { Invoice, formatCurrencyIDR } from '@cbp/core';
import { Button } from '@cbp/ui';
import { BankOption } from '../data/types';
import { VIRTUAL_ACCOUNT_BANKS, QRIS_OPTION, MERCHANT_CODE_PREFIX } from '../data/constants';
import { PaymentTimer, SectionLabel, GroupHeader, BankListItem, QrisListItem, CopyButton } from './atoms';

export const PaymentHeader = ({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) => (
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
);

export const MethodSelectionView = ({ onSelectBank }: { onSelectBank: (bank: BankOption) => void }) => (
  <div className="space-y-4 animate-in slide-in-from-right-4">
    <SectionLabel>Select Method</SectionLabel>
    
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <GroupHeader icon={Building2} label="Bank Transfer" />
      <div className="divide-y divide-slate-50">
        {VIRTUAL_ACCOUNT_BANKS.map((bank) => (
          <BankListItem key={bank.name} name={bank.name} color={bank.color} onClick={() => onSelectBank(bank)} />
        ))}
      </div>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <GroupHeader icon={QrCode} label="QRIS" />
      <QrisListItem onClick={() => onSelectBank(QRIS_OPTION)} />
    </div>
  </div>
);

export const PaymentDetailView = ({ 
  invoice, 
  selectedBank, 
  copied, 
  onCopy, 
  onChangeMethod, 
  onSimulate 
}: any) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
      <button onClick={onChangeMethod} className="flex items-center text-xs text-slate-500 hover:text-slate-800 mb-2 font-bold">
        <ChevronLeft className="h-3 w-3 mr-1" /> Change Method
      </button>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center flex-1 flex flex-col items-center">
        <PaymentTimer />

        {selectedBank.type === 'VA' ? (
          <>
            <div className={`w-16 h-16 mx-auto ${selectedBank.color} rounded-2xl flex items-center justify-center mb-4 text-xs font-bold text-white shadow-lg`}>
              {selectedBank.name}
            </div>
            <p className="text-sm text-slate-500 mb-1">Nomor Virtual Account</p>
            <div className="flex items-center justify-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100 w-full">
              <h2 className="text-xl font-bold text-slate-800 tracking-wider font-mono">
                {MERCHANT_CODE_PREFIX}{invoice.id.replace(/\D/g, '').substring(0, 8)}
              </h2>
              <CopyButton copied={copied} onCopy={onCopy} />
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
          <Button onClick={onSimulate} className="w-full bg-green-600 hover:bg-green-700 text-white border-transparent shadow-lg shadow-green-600/20 py-3">
            <CreditCard className="h-4 w-4 mr-2" /> Simulasi Bayar (Demo)
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProcessingView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center py-12">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-slate-200"></div>
      <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
    </div>
    <h3 className="font-bold text-slate-800 mt-6 text-lg">Memproses Pembayaran...</h3>
    <p className="text-xs text-slate-500 mt-2">Mohon tunggu sebentar, jangan tutup halaman ini.</p>
  </div>
);

export const SuccessView = () => (
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
