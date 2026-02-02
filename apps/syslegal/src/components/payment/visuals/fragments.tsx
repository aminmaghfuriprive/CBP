
import React from 'react';
import { Building2, QrCode } from 'lucide-react';
import { Invoice } from '@cbp/core';
import { BankOption } from '../data/types';
import { VIRTUAL_ACCOUNT_BANKS, MERCHANT_CODE_PREFIX } from '../data/constants';
import { GroupHeader, BankListItem, CopyButton } from './atoms';

// --- FRAGMENT 1: Virtual Account Display ---
interface VirtualAccountDisplayProps {
  bank: BankOption;
  invoice: Invoice;
  copied: boolean;
  onCopy: () => void;
}

export const VirtualAccountDisplay: React.FC<VirtualAccountDisplayProps> = ({ 
  bank, invoice, copied, onCopy 
}) => {
  return (
    <>
      <div className={`w-16 h-16 mx-auto ${bank.color} rounded-2xl flex items-center justify-center mb-4 text-xs font-bold text-white shadow-lg`}>
        {bank.name}
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
  );
};

// --- FRAGMENT 2: QRIS Display ---
export const QrisDisplay: React.FC = () => {
  return (
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
  );
};

// --- FRAGMENT 3: Bank List Container ---
interface BankListContainerProps {
  onSelect: (bank: BankOption) => void;
}

export const BankListContainer: React.FC<BankListContainerProps> = ({ onSelect }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <GroupHeader icon={Building2} label="Bank Transfer" />
      <div className="divide-y divide-slate-50">
        {VIRTUAL_ACCOUNT_BANKS.map((bank) => (
          <BankListItem 
            key={bank.name} 
            name={bank.name} 
            color={bank.color} 
            onClick={() => onSelect(bank)} 
          />
        ))}
      </div>
    </div>
  );
};
