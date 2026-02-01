
"use client";

import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { CaseBilling } from '@/components/portal/CaseBilling';

export default function MyBillingPage() {
  const { user } = useAuth();
  const { invoices } = useData();

  // Filter invoice milik user yang sedang login
  const myInvoices = invoices.filter(i => i.clientName.includes(user?.name || ''));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Tagihan & Pembayaran</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Kelola seluruh riwayat tagihan dan lakukan pembayaran layanan hukum Anda di sini.
        </p>
      </div>
      
      {/* Menggunakan komponen CaseBilling yang sudah terintegrasi Payment Gateway */}
      <CaseBilling invoices={myInvoices} />
    </div>
  );
}
