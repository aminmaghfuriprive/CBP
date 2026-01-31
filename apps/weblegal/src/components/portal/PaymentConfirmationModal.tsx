
"use client";

import React, { useState, useRef } from 'react';
import { useData, Invoice, formatCurrencyIDR } from '@cbp/core';
import { Button } from '@cbp/ui';
import { X, UploadCloud, Copy, FileText, CheckCircle2, Loader2, CreditCard } from 'lucide-react';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({ isOpen, onClose, invoice }) => {
  const { confirmPayment } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !invoice) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    setIsUploading(true);

    // Simulate Upload & Processing
    setTimeout(() => {
      // In real app, this would return a cloud URL
      const mockUrl = URL.createObjectURL(file);
      confirmPayment(invoice.id, mockUrl);
      
      setIsUploading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening disalin!');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div>
            <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Konfirmasi Pembayaran</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">Invoice: {invoice.id}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-bold text-cbp-navy dark:text-white mb-2">Konfirmasi Terkirim!</h4>
            <p className="text-slate-500 text-sm">Tim kami akan memverifikasi pembayaran Anda secepatnya. Status invoice akan diperbarui setelah verifikasi.</p>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto custom-scrollbar">
            
            {/* Amount & Bank Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-6 border border-blue-100 dark:border-blue-800">
               <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider mb-1">Total Tagihan</p>
               <p className="text-3xl font-bold text-cbp-navy dark:text-white mb-4">{formatCurrencyIDR(invoice.amount)}</p>
               
               <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-slate-500" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-500 uppercase">Bank BCA</p>
                        <p className="text-sm font-mono font-bold text-slate-800 dark:text-white">883-098-7766</p>
                        <p className="text-[10px] text-slate-400">a.n. CBP Corp Legal</p>
                     </div>
                  </div>
                  <button onClick={() => copyToClipboard('8830987766')} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                     <Copy className="h-4 w-4" />
                  </button>
               </div>
            </div>

            {/* Upload Area */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Upload Bukti Transfer</label>
              
              <div 
                className={`
                  relative h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer
                  ${file ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-cbp-gold hover:bg-slate-50 dark:hover:bg-slate-800'}
                `}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input ref={inputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                
                {file ? (
                  <div className="flex flex-col items-center animate-in zoom-in duration-200">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full text-green-600 mb-2 shadow-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white max-w-[200px] truncate">{file.name}</p>
                    <p className="text-xs text-green-600 font-bold mt-1">Siap diupload</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="mt-3 text-xs text-red-500 hover:underline z-10"
                    >
                      Batal / Ganti File
                    </button>
                  </div>
                ) : (
                  <div className="pointer-events-none">
                    <UploadCloud className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Klik atau seret file bukti</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isSuccess && (
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Button 
              onClick={handleSubmit} 
              disabled={!file || isUploading} 
              className="w-full justify-center h-12 text-base font-bold shadow-lg shadow-cbp-navy/10"
            >
              {isUploading ? (
                <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Mengirim...</>
              ) : 'Kirim Konfirmasi'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
