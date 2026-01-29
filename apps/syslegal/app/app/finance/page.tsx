"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { Card, Button, PageHeader, StatCard, StatusBadge } from '@cbp/ui';
import { InvoiceModal } from '../../../src/components/InvoiceModal';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Download, Plus } from 'lucide-react';

export default function FinancePage() {
  const { invoices, addInvoice, updateInvoiceStatus } = useData();
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Statistics
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  const filteredInvoices = invoices.filter(i => filter === 'All' || i.status === filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Keuangan & Tagihan" 
        subtitle="Kelola arus kas, tagihan klien, dan status pembayaran."
        action={
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <Download className="h-4 w-4" /> Laporan
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Buat Tagihan
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Pendapatan" 
          value={formatCurrency(totalRevenue)} 
          icon={TrendingUp} 
          variant="success" 
        />
        <StatCard 
          label="Tagihan Belum Lunas" 
          value={formatCurrency(outstanding)} 
          icon={DollarSign} 
          variant="warning" 
        />
        <StatCard 
          label="Jatuh Tempo" 
          value={`${overdueCount} Tagihan`} 
          icon={AlertCircle} 
          variant="danger" 
        />
      </div>

      {/* Invoice Table */}
      <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="font-bold text-cbp-navy dark:text-white">Daftar Invoice</h3>
          <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
            {['All', 'Paid', 'Unpaid', 'Overdue'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  filter === s 
                    ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white'
                }`}
              >
                {s === 'All' ? 'Semua' : s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">No. Invoice</th>
                <th className="px-6 py-4 font-bold tracking-wider">Klien</th>
                <th className="px-6 py-4 font-bold tracking-wider">Jatuh Tempo</th>
                <th className="px-6 py-4 font-bold tracking-wider">Jumlah</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/20 rounded-r-md">{inv.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-cbp-navy dark:text-slate-200">{inv.clientName}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 truncate max-w-[150px]">{inv.description}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{inv.dueDate}</td>
                    <td className="px-6 py-4 font-bold text-cbp-navy dark:text-white">{formatCurrency(inv.amount)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {inv.status !== 'Paid' && (
                        <button 
                          onClick={() => updateInvoiceStatus(inv.id, 'Paid')}
                          className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-bold flex items-center justify-end gap-1 ml-auto transition-colors"
                        >
                          <CheckCircle className="h-3 w-3" /> Tandai Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-500">
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full mb-2">
                        <DollarSign className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                      </div>
                      Tidak ada data tagihan ditemukan.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addInvoice} 
      />
    </div>
  );
}