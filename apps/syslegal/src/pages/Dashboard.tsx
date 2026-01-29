import React from 'react';
import { useData, useAuth, useTheme } from '@cbp/core';
import { Card, CardHeader } from '@cbp/ui';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Briefcase, CheckCircle, AlertCircle, Calendar, ArrowRight, DollarSign, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ label: string; value: number | string; icon: any; color: string; subtext?: string }> = ({ label, value, icon: Icon, color, subtext }) => {
  const baseColor = color.split(' ')[0].replace('bg-', '');
  const darkModeBg = `dark:bg-${baseColor}-900/20`;
  const darkModeText = `dark:text-${baseColor}-400`;

  return (
    <Card className="flex items-center p-6 border border-slate-200 dark:border-slate-800" padding={false}>
      <div className={`p-4 rounded-full ${color.split(' ')[0]} bg-opacity-10 ${darkModeBg} mr-4 ml-6`}>
        <Icon className={`h-6 w-6 ${color.split(' ')[1]} ${darkModeText}`} />
      </div>
      <div className="py-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-cbp-navy dark:text-slate-100">{value}</p>
        {subtext && <p className="text-xs text-red-500 dark:text-red-400 font-medium mt-1">{subtext}</p>}
      </div>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { cases, invoices, events } = useData();
  const { theme } = useTheme();

  if (user?.role === 'ADMIN') {
    const overdueInvoices = invoices.filter(i => i.status === 'Overdue');
    const upcomingDeadlines = events.filter(e => 
      (e.type === 'Sidang' || e.type === 'Deadline') && new Date(e.date) >= new Date()
    ).slice(0, 3);

    const chartData = [
      { name: 'Legal Service', kasus: cases.filter(c => c.division === 'CBP Legal Service').length }, 
      { name: 'Law Firm', kasus: cases.filter(c => c.division === 'Christian Law Firm').length }, 
      { name: 'Sahabat Ijinku', kasus: cases.filter(c => c.division === 'Sahabat Ijinku').length },
    ];

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Dashboard Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Kasus Aktif" value={cases.filter(c => c.status === 'Aktif').length} icon={Briefcase} color="bg-blue-600 text-blue-600" />
          <StatCard label="Tagihan Overdue" value={overdueInvoices.length} icon={AlertCircle} color="bg-red-500 text-red-500" />
          <StatCard label="Selesai Bulan Ini" value={cases.filter(c => c.status === 'Selesai').length} icon={CheckCircle} color="bg-green-600 text-green-600" />
          <StatCard label="Total Klien" value={4} icon={Calendar} color="bg-cbp-gold text-cbp-gold" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Distribusi Kasus" />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={120} stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: theme === 'dark' ? '#1e293b' : '#fff'}} />
                  <Bar dataKey="kasus" barSize={20} radius={[0, 4, 4, 0]}>
                    {chartData.map((_, index) => <Cell key={index} fill={theme === 'dark' ? '#d4af37' : '#0f172a'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Deadline</h3>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map(e => (
                <div key={e.id} className="p-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-md">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1">{e.type}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{e.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(e.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Client View
  const userName = user?.name || '';
  const myCases = cases.filter(c => c.clientName.includes(userName));
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Portal Klien</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Kasus Saya" value={myCases.length} icon={Briefcase} color="bg-cbp-navy text-cbp-navy" />
        <StatCard label="Agenda Berikutnya" value="-" icon={Calendar} color="bg-cbp-gold text-cbp-gold" />
        <StatCard label="Tagihan Berjalan" value="IDR 0" icon={DollarSign} color="bg-red-600 text-red-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Status Kasus" />
          {myCases.length > 0 ? (
            <div className="space-y-4">
              {myCases.map(c => (
                <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                   <div className="flex justify-between font-bold text-cbp-navy dark:text-white">
                     <span>{c.caseType}</span>
                     <span>{c.status}</span>
                   </div>
                   <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{c.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Tidak ada kasus aktif.</p>
          )}
        </Card>
      </div>
    </div>
  );
};