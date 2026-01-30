
"use client";

import React, { useState } from 'react';
import { useData, User } from '@cbp/core';
import { EmployeeTable } from './molecules/EmployeeTable';
import { EmployeeModal } from './molecules/EmployeeModal';
import { Button, SearchInput } from '@cbp/ui';
import { Plus } from 'lucide-react';

export const EmployeeListView: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (emp: User) => {
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchInput 
              placeholder="Cari nama atau email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:text-white cursor-pointer"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="All">Semua Role</option>
            <option value="PRODUCTION">Produksi</option>
            <option value="FIELD_OPS">Lapangan</option>
            <option value="ADMIN">Admin</option>
            <option value="FINANCE">Finance</option>
          </select>
        </div>
        <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" /> Tambah Pegawai
        </Button>
      </div>

      {/* Table Organism */}
      <EmployeeTable 
        employees={filteredEmployees} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Logic for Modal */}
      <EmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedEmployee}
        onSave={(data) => {
          if (selectedEmployee) {
            updateEmployee(data.id, data);
          } else {
            addEmployee(data);
          }
        }}
      />
    </div>
  );
};
