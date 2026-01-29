import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { Card, Badge, Button } from '@cbp/ui';
import { DollarSign, Download, CreditCard } from 'lucide-react';

export const ClientInvoices: React.FC = () => {
  const { user } = useAuth();
  const { invoices } = useData();

  const myInvoices = invoices.filter(i => 
    i.clientName.includes(user?.name || '') || (user?.name || '').includes(i.clientName)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Paid': return 'success';
      case 'Unpaid': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Tagihan Saya</h1>
        <p className="text-slate-500 dark:text-slate-400">Riwayat pembayaran dan tagihan layanan hukum.</p>
      </div>

      {myInvoices.length > 0 ? (
        <div className="space-y-4">
          {myInvoices.map((inv) => (
            <Card key={inv.id} className="flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`p-3 rounded-full flex-shrink-0 ${
                  inv.status === 'Paid' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <h3 className="font-bold text-cbp-navy dark:text-white">{inv.id}</h3>
                     <Badge variant={getStatusVariant(inv.status)}>{inv.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{inv.description}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Jatuh Tempo: {inv.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto gap-8 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Tagihan</p>
                  <p className="text-xl font-bold text-cbp-navy dark:text-white">{formatCurrency(inv.amount)}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cbp-navy dark:hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                  {inv.status !== 'Paid' && (
                    <Button size="sm" className="gap-2">
                      <CreditCard className="h-4 w-4" /> Bayar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-slate-500 dark:text-slate-400">Tidak ada riwayat tagihan.</p>
        </div>
      )}
    </div>
  );
};