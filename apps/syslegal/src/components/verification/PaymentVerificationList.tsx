
"use client";

import React, { useState } from 'react';
import { useFinanceLogic, Invoice, formatCurrencyIDR } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { Check, X, Eye, DollarSign, Clock, AlertCircle } from 'lucide-react';

export const PaymentVerificationList: React.FC = () => {
  const { invoices, updateInvoiceStatus, rejectPayment } = useFinanceLogic();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const pendingPayments = invoices.filter(i => i.status === 'Verifying');

  const handleApprove = (id: string) => {
    if (confirm('Konfirmasi pembayaran ini sebagai Lunas?')) {
      updateInvoiceStatus(id, 'Paid');
    }
  };

  const handleReject = () => {
    if (rejectId && reason) {
      rejectPayment(rejectId, reason);
      setRejectId(null);
      setReason('');
    }
  };

  if (pendingPayments.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
        <Check className="h-12 w-12 text-green-500 mx-auto mb-4 opacity-20" />
        <p className="text-slate-500">Semua pembayaran telah terverifikasi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingPayments.map((inv) => (
        <Card key={inv.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm">
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
                <h4 className="font-bold text-cbp-navy dark:text-white text-lg">{inv.clientName}</h4>
                <Badge variant="warning">Verifikasi</Badge>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{inv.description}</p>
             <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono">ID: {inv.id}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Jatuh Tempo: {inv.dueDate}</span>
             </div>
          </div>

          <div className="text-center md:text-right">
             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Nilai Tagihan</p>
             <p className="text-2xl font-bold text-cbp-navy dark:text-white">{formatCurrencyIDR(inv.amount)}</p>
          </div>

          <div className="flex items-center gap-3">
             {inv.paymentProofUrl && (
               <button 
                 onClick={() => setSelectedImage(inv.paymentProofUrl!)}
                 className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-cbp-gold/10 transition-colors group border border-slate-200 dark:border-slate-700"
               >
                 <Eye className="h-5 w-5 text-slate-400 group-hover:text-cbp-gold" />
               </button>
             )}
             
             <div className="flex gap-2">
                <Button 
                  onClick={() => handleApprove(inv.id)}
                  className="bg-green-600 hover:bg-green-700 text-white border-none h-12 px-6"
                >
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setRejectId(inv.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50 h-12 px-6"
                >
                  Reject
                </Button>
             </div>
          </div>
        </Card>
      ))}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 animate-in fade-in" onClick={() => setSelectedImage(null)}>
           <img src={selectedImage} className="max-w-full max-h-full rounded-lg shadow-2xl" alt="Proof" />
           <p className="absolute bottom-10 text-white font-bold">Klik di mana saja untuk menutup</p>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in zoom-in-95">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                 <AlertCircle className="h-6 w-6" />
                 <h3 className="text-xl font-bold">Tolak Pembayaran</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">Berikan alasan penolakan agar klien dapat memperbaiki pembayaran mereka.</p>
              <textarea 
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-red-500 mb-6 dark:text-white"
                rows={3}
                placeholder="Contoh: Bukti transfer tidak terbaca atau jumlah tidak sesuai."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="flex gap-3">
                 <Button variant="ghost" onClick={() => {setRejectId(null); setReason('');}} className="flex-1">Batal</Button>
                 <Button onClick={handleReject} disabled={!reason} className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none">Kirim Penolakan</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
