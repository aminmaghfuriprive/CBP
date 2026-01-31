"use client";

import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { Card, Badge, Button } from '@cbp/ui';
import { DollarSign, Download, CreditCard } from 'lucide-react';

export default function MyBillingPage() {
  const { user } = useAuth();
  const { invoices } = useData();

  const myInvoices = invoices.filter(i => i.clientName.includes(user?.name || ''));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Tagihan & Pembayaran</h1>
      
      <div className="grid gap-4">
        {myInvoices.map((inv) => (
          <Card key={inv.id} className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`p-3 rounded-full flex-shrink-0 ${
                  inv.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-cbp-navy dark:text-white">{inv.description}</h3>
                  <p className="text-sm text-slate-500">Jatuh Tempo: {inv.dueDate}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-cbp-navy dark:text-white">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(inv.amount)}
                </p>
                <div className="flex gap-2 justify-end mt-2">
                   <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>{inv.status}</Badge>
                </div>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
}