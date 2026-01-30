
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { User } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useEmployeeLogic = () => {
  // Filter out CLIENT role, only show internal employees
  const employees = useLiveQuery(() => 
    db.users
      .filter(u => u.role !== 'CLIENT')
      .toArray()
  ) || [];
  
  const { addNotification } = useNotifications();

  const addEmployee = async (employee: User) => {
    try {
      await db.users.add(employee);
      addNotification('Pegawai Ditambahkan', `${employee.name} telah terdaftar.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal menambah pegawai.', 'warning');
    }
  };

  const updateEmployee = async (id: string, updates: Partial<User>) => {
    try {
      await db.users.update(id, updates);
      addNotification('Update Berhasil', 'Data pegawai diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal update data.', 'warning');
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await db.users.delete(id);
      addNotification('Terhapus', 'Pegawai dihapus dari sistem.', 'info');
    } catch (error) {
      addNotification('Gagal', 'Gagal menghapus pegawai.', 'warning');
    }
  };

  return { employees, addEmployee, updateEmployee, deleteEmployee };
};
