
"use client";

import React, { useState } from 'react';
import { PageHeader, StatCard } from '@cbp/ui';
import { EmployeeListView } from '../../../src/components/employees/EmployeeListView';
import { AttendanceView } from '../../../src/components/employees/organisms/AttendanceView';
import { PayrollView } from '../../../src/components/employees/organisms/PayrollView';
import { useData } from '@cbp/core';
import { Users, Briefcase, ShieldCheck, Clock, Wallet } from 'lucide-react';

export default function EmployeesPage() {
  const { employees } = useData();
  const [activeTab, setActiveTab] = useState<'directory' | 'attendance' | 'payroll'>('directory');

  // Simple stats
  const totalEmployees = employees.length;
  const productionStaff = employees.filter(e => e.role === 'PRODUCTION').length;
  const fieldStaff = employees.filter(e => e.role === 'FIELD_OPS').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Manajemen Pegawai" 
        subtitle="Kelola akses pengguna, data karyawan, monitoring kehadiran, dan penggajian." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <StatCard 
            label="Total Pegawai" 
            value={totalEmployees} 
            icon={Users} 
            variant="primary" 
         />
         <StatCard 
            label="Tim Produksi (Lawyer)" 
            value={productionStaff} 
            icon={ShieldCheck} 
            variant="success" 
         />
         <StatCard 
            label="Tim Lapangan" 
            value={fieldStaff} 
            icon={Briefcase} 
            variant="secondary" 
         />
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'directory' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="h-4 w-4" /> Direktori Pegawai
          {activeTab === 'directory' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'attendance' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" /> Absensi & Kehadiran
          {activeTab === 'attendance' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('payroll')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'payroll' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Wallet className="h-4 w-4" /> Payroll & Gaji
          {activeTab === 'payroll' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'directory' && <EmployeeListView />}
        {activeTab === 'attendance' && <AttendanceView />}
        {activeTab === 'payroll' && <PayrollView />}
      </div>
    </div>
  );
}
