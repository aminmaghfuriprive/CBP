
"use client";

import React from 'react';
import { PageHeader, StatCard } from '@cbp/ui';
import { EmployeeListView } from '../../../src/components/employees/EmployeeListView';
import { useData } from '@cbp/core';
import { Users, Briefcase, ShieldCheck } from 'lucide-react';

export default function EmployeesPage() {
  const { employees } = useData();

  // Simple stats
  const totalEmployees = employees.length;
  const productionStaff = employees.filter(e => e.role === 'PRODUCTION').length;
  const fieldStaff = employees.filter(e => e.role === 'FIELD_OPS').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Manajemen Pegawai" 
        subtitle="Kelola akses pengguna, data karyawan, dan pembagian divisi." 
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

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <EmployeeListView />
      </div>
    </div>
  );
}
