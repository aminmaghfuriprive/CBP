import React, { useState } from 'react';
import { X, DollarSign, FileText } from 'lucide-react';
import { Button } from '@cbp/ui';
import { Invoice, CLIENTS } from '@cbp/core';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, onSave }) => {
  const [clientName, setClientName] = useState(CLIENTS[0].name);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !dueDate) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newInvoice: Invoice = {
        id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        clientName,
        amount: parseFloat(amount),
        status: 'Unpaid',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: dueDate,
        description
      };

      onSave(newInvoice);
      setIsSubmitting(false);
      
      // Reset form
      setAmount('');
      setDescription('');
      setDueDate('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-black/50 w-full max-w-md mx-4 overflow-hidden border border-slate-200 dark:border-slate-800 transform transition-all">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-cbp-gold" />
            Buat Tagihan Baru
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Klien</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            >
              {CLIENTS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deskripsi Layanan</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <textarea 
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all placeholder-slate-400"
                rows={3}
                placeholder="Cth: Biaya Konsultasi Hukum Oktober"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Jumlah (IDR)</label>
              <input 
                required
                type="number"
                min="0"
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all placeholder-slate-400"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Jatuh Tempo</label>
              <div className="relative">
                <input 
                  required
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full justify-center text-base" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses...' : 'Terbitkan Invoice'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};