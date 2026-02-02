
import React from 'react';
import { Clock, Copy, CheckCircle, ChevronRight } from 'lucide-react';

export const PaymentTimer: React.FC = () => (
  <div className="flex items-center gap-2 text-xs font-mono text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-6">
    <Clock className="h-3 w-3" /> Sisa Waktu: 23:59:45
  </div>
);

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{children}</p>
);

export const BankLogo: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <div className={`w-10 h-6 ${color} rounded text-[8px] font-bold flex items-center justify-center text-white shadow-sm`}>
    {name}
  </div>
);

export const BankListItem: React.FC<{ name: string; color: string; onClick: () => void }> = ({ name, color, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors group">
    <div className="flex items-center gap-3">
      <BankLogo name={name} color={color} />
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{name} Virtual Account</span>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
  </button>
);

export const QrisListItem: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-6 bg-white border border-slate-200 rounded text-[8px] font-bold flex items-center justify-center text-slate-800 shadow-sm">QRIS</div>
      <span className="text-sm font-medium text-slate-700">GoPay / ShopeePay / OVO</span>
    </div>
    <ChevronRight className="h-4 w-4 text-slate-300" />
  </button>
);

export const GroupHeader: React.FC<{ icon: any; label: string }> = ({ icon: Icon, label }) => (
  <div className="p-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
    <Icon className={`h-4 w-4 ${label === 'Bank Transfer' ? 'text-blue-600' : 'text-slate-700'}`} />
    <span className="text-sm font-bold text-slate-700">{label}</span>
  </div>
);

export const CopyButton: React.FC<{ copied: boolean; onCopy: () => void }> = ({ copied, onCopy }) => (
  <button onClick={onCopy} className="p-1.5 hover:bg-white rounded text-blue-600 transition-colors" title="Salin">
    {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
  </button>
);
