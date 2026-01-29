"use client";

import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Briefcase, Calendar, DollarSign, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

const StatCard: React.FC<{ label: string; value: string | number; icon: any; color: string }> = ({ label, value, icon: Icon, color }) => (
  <Card className="flex items-center p-6 border-l-4" style={{borderLeftColor: 'var(--color)'}} padding={false}>
     <div className={`p-4 rounded-full mr-4 ml-6 ${color} bg-opacity-10 text-current`}>
       <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
     </div>
     <div className="py-6">
       <p className="text-sm font-medium text-slate-500">{label}</p>
       <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
     </div>
  </Card>
);

export default function ClientDashboard() {
  const { user } = useAuth();
  const { cases, invoices } = useData();

  const myCases = cases.filter(c => c.clientName.includes(user?.name || ''));
  const myInvoices = invoices.filter(i => i.clientName.includes(user?.name || ''));
  const unpaidAmount = myInvoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white">Selamat Datang, {user?.name.split(' ')[0]}</h1>
          <p className="text-slate-500 dark:text-slate-400">Berikut adalah ringkasan aktivitas hukum Anda.</p>
        </div>
        <Link href="/portal/new-request">
          <Button className="gap-2 shadow-lg shadow-cbp-gold/20">
            <Plus className="h-4 w-4" /> Buat Permintaan Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Kasus Aktif" value={myCases.length} icon={Briefcase} color="text-cbp-navy" />
        <StatCard label="Jadwal Berikutnya" value="-" icon={Calendar} color="text-cbp-gold" />
        <StatCard 
          label="Tagihan Berjalan" 
          value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(unpaidAmount)} 
          icon={DollarSign} 
          color="text-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Status Kasus Terkini</h3>
            <Link href="/portal/cases" className="text-xs font-bold text-cbp-gold hover:underline">Lihat Semua</Link>
          </div>
          {myCases.length > 0 ? (
            <div className="space-y-4">
              {myCases.slice(0, 3).map(c => (
                <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-cbp-navy dark:text-white">{c.caseType}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>{c.status}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{c.description}</p>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-slate-500">Belum ada kasus aktif.</div>
          )}
        </Card>

        <Card className="bg-cbp-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="font-serif font-bold text-xl mb-4 text-cbp-gold">Butuh Bantuan Hukum Cepat?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Gunakan fitur AI Recommendation kami untuk menganalisis masalah Anda dan menemukan layanan yang paling tepat beserta estimasi biayanya.
            </p>
            <Link href="/portal/new-request">
              <Button variant="secondary" className="w-full justify-between group">
                Mulai Analisis AI <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}