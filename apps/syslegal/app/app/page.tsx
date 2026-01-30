
"use client";

import React from 'react';
import { useData, useAuth, useTheme, getEventTypeVariant, formatDateID, formatCurrencyIDR } from '@cbp/core';
import { Card, CardHeader, PageHeader, StatCard, Badge } from '@cbp/ui';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Briefcase, CheckCircle, AlertCircle, Calendar, DollarSign, AlertTriangle, MapPin, Navigation, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const { cases, invoices, events } = useData();
  const { theme } = useTheme();

  // 1. TAMPILAN FIELD OPS (Lapangan) - Mobile First UI
  if (user?.role === 'FIELD_OPS') {
    const todayEvents = events.filter(e => {
        const d = new Date(e.date);
        const today = new Date();
        return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });

    return (
      <div className="space-y-6 max-w-lg mx-auto pb-20">
         <div className="bg-cbp-navy text-white p-6 -m-8 mb-6 rounded-b-3xl pb-12 dark:bg-slate-900 dark:border-b dark:border-slate-800 shadow-xl">
            <h1 className="text-xl font-bold">Halo, {user.name.split(' ')[0]}</h1>
            <p className="text-slate-300 text-sm">Siap bertugas hari ini?</p>
            <div className="mt-6 flex gap-4">
               <div className="bg-white/10 p-4 rounded-xl flex-1 text-center backdrop-blur-sm border border-white/10">
                  <span className="block text-3xl font-bold text-cbp-gold">{todayEvents.length}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Agenda</span>
               </div>
               <div className="bg-white/10 p-4 rounded-xl flex-1 text-center backdrop-blur-sm border border-white/10">
                  <span className="block text-3xl font-bold text-green-400">0</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Selesai</span>
               </div>
            </div>
         </div>

         <div className="px-1 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wide">
               <MapPin className="h-4 w-4 text-cbp-gold" />
               Agenda & Rute
            </h3>
            {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map(e => (
                    <div key={e.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex gap-4">
                       <div className="flex flex-col items-center justify-center w-16 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                          <span className="font-bold text-cbp-navy dark:text-white text-lg">{e.time.split(':')[0]}</span>
                          <span className="text-xs text-slate-400">{e.time.split(':')[1]}</span>
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{e.title}</h4>
                            <Badge variant={getEventTypeVariant(e.type)} className="text-[10px] px-1.5 py-0.5">{e.type}</Badge>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">{e.client}</p>
                          <div className="flex gap-2">
                             <button className="flex-1 text-[10px] bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy px-3 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
                               <Navigation className="h-3 w-3" /> Buka Maps
                             </button>
                             <button className="flex-1 text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-3 py-2 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                               Detail
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
            ) : (
                <div className="text-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-dashed border border-slate-300 dark:border-slate-700">
                    <CheckCircle className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm font-medium">Tidak ada agenda mendesak.</p>
                </div>
            )}
         </div>

         <div className="px-1 pt-2">
             <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
               <Briefcase className="h-4 w-4 text-cbp-gold" />
               Akses Cepat
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <Link href="/app/agenda" className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-cbp-navy dark:hover:border-cbp-gold hover:shadow-md transition-all group">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Kalender Kerja</span>
               </Link>
               <Link href="/app/documents" className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-cbp-navy dark:hover:border-cbp-gold hover:shadow-md transition-all group">
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 transition-colors">
                    <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Dokumen</span>
               </Link>
            </div>
         </div>
      </div>
    );
  }

  // 2. TAMPILAN INTERNAL (Admin, Produksi, Finance, IT)
  if (user?.role && user.role !== 'CLIENT') {
    const overdueInvoices = invoices.filter(i => i.status === 'Overdue');
    const upcomingDeadlines = events.filter(e => 
      (e.type === 'Sidang' || e.type === 'Deadline') && new Date(e.date) >= new Date()
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

    // Update Chart Data untuk 4 Divisi Baru
    const chartData = [
      { name: 'Korporasi', kasus: cases.filter(c => c.division === 'Legal Administratif & Korporasi').length }, 
      { name: 'Litigasi', kasus: cases.filter(c => c.division === 'Hukum Umum & Litigasi').length }, 
      { name: 'Perizinan', kasus: cases.filter(c => c.division === 'Perizinan & Bisnis').length },
      { name: 'Agraria', kasus: cases.filter(c => c.division === 'Pertanahan & Agraria').length },
    ];

    return (
      <div className="space-y-6 pb-10">
        <PageHeader 
          title={`Dashboard ${user.role.charAt(0) + user.role.slice(1).toLowerCase().replace('_', ' ')}`}
          subtitle="Ringkasan aktivitas dan performa firma hukum." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Kasus Aktif" 
            value={cases.filter(c => c.status === 'Aktif').length} 
            icon={Briefcase} 
            variant="primary" 
          />
          <StatCard 
            label="Tagihan Overdue" 
            value={overdueInvoices.length} 
            icon={AlertCircle} 
            variant="danger"
            subtext={overdueInvoices.length > 0 ? "Perlu tindak lanjut segera" : "Semua tagihan lancar"} 
          />
          <StatCard 
            label="Selesai Bulan Ini" 
            value={cases.filter(c => c.status === 'Selesai').length} 
            icon={CheckCircle} 
            variant="success" 
          />
          <StatCard 
            label="Agenda Hari Ini" 
            value={events.length} 
            icon={Calendar} 
            variant="secondary" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Distribusi Divisi" subtitle="Beban kerja per divisi" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={120} stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="kasus" barSize={20} radius={[0, 4, 4, 0]}>
                    {chartData.map((_, index) => <Cell key={index} fill={theme === 'dark' ? '#d4af37' : '#0f172a'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Deadline Terdekat</h3>
              </div>
              <Link href="/app/agenda" className="text-xs font-bold text-cbp-navy dark:text-cbp-gold hover:underline">Lihat Semua</Link>
            </div>
            
            <div className="space-y-4">
              {upcomingDeadlines.length > 0 ? upcomingDeadlines.map(e => (
                <div key={e.id} className="flex gap-4 items-start group p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex-shrink-0 border border-red-100 dark:border-red-900/30">
                     <span className="text-sm font-bold">{new Date(e.date).getDate()}</span>
                     <span className="text-[9px] uppercase font-bold">{new Date(e.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                       <Badge variant={getEventTypeVariant(e.type)} className="text-[10px] px-1.5 py-0.5">{e.type}</Badge>
                       <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-red-600 transition-colors">{e.title}</p>
                    <p className="text-xs text-slate-500 truncate">{e.client}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  Tidak ada deadline mendesak.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // 3. TAMPILAN CLIENT PORTAL
  const userName = user?.name || '';
  const myCases = cases.filter(c => c.clientName.includes(userName) || (user?.name || '').includes(c.clientName));
  const myInvoices = invoices.filter(i => i.clientName.includes(userName) || (user?.name || '').includes(i.clientName));
  const unpaidAmount = myInvoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Portal Klien" 
        subtitle={`Selamat datang kembali, ${userName}. Berikut ringkasan hukum Anda.`} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Kasus Aktif" value={myCases.length} icon={Briefcase} variant="primary" />
        <StatCard label="Tagihan Berjalan" value={formatCurrencyIDR(unpaidAmount)} icon={DollarSign} variant="danger" />
        <StatCard label="Jadwal Berikutnya" value="-" icon={Calendar} variant="secondary" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Status Kasus Saya" />
          {myCases.length > 0 ? (
            <div className="space-y-4">
              {myCases.map(c => (
                <div key={c.id} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-cbp-navy dark:text-white text-lg">{c.caseType}</h4>
                     <Badge variant={c.status === 'Aktif' ? 'success' : 'neutral'}>{c.status}</Badge>
                   </div>
                   <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                   <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Calendar className="h-3.5 w-3.5" /> Updated: {formatDateID(c.lastUpdate, { dateStyle: 'long' })}
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
               <Briefcase className="h-10 w-10 mx-auto mb-2 text-slate-300" />
               <p>Tidak ada kasus aktif.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
