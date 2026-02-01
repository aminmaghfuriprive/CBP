
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Lead, LeadStatus, ClientData, Booking } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useLeadLogic = () => {
  const { addNotification } = useNotifications();

  // Fail-safe query: Cek apakah db.leads sudah ada sebelum akses
  const leads = useLiveQuery(() => {
    if (!db.leads) return [];
    return db.leads.orderBy('createdAt').reverse().toArray();
  }) || [];

  const addLead = async (lead: Lead) => {
    try {
      if (!db.leads) throw new Error("Database not ready");
      await db.leads.add(lead);
      addNotification('Lead Masuk', `Permintaan baru dari ${lead.name}.`, 'info', 'MARKETING');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Sistem belum siap menerima data lead. Coba refresh halaman.', 'warning');
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    try {
      if (!db.leads) return;
      await db.leads.update(id, { status });
    } catch (error) {
      console.error(error);
    }
  };

  const convertLeadToClient = async (lead: Lead) => {
    try {
      if (!db.clients || !db.bookings || !db.leads) return;

      // 1. Create Client
      const newClient: ClientData = {
        id: `cl_${Date.now()}`,
        name: lead.name,
        contact: lead.contact,
        email: lead.email,
        industry: 'Umum', // Default, bisa diedit nanti
        address: lead.address
      };
      await db.clients.add(newClient);

      // 2. Create Initial Booking (Pending)
      const newBooking: Booking = {
        id: `bk_${Date.now()}`,
        clientName: lead.name,
        contact: lead.contact,
        serviceType: lead.interest,
        date: new Date().toISOString().split('T')[0], // Default today
        time: '09:00',
        status: 'Pending',
        notes: `Converted from Lead. Interest: ${lead.interest}. Notes: ${lead.notes || '-'}`
      };
      await db.bookings.add(newBooking);

      // 3. Update Lead Status
      await db.leads.update(lead.id, { status: 'Converted' });

      addNotification('Konversi Berhasil', `${lead.name} telah dipindahkan ke Database Klien.`, 'success');
    } catch (error) {
      console.error(error);
      addNotification('Gagal', 'Gagal mengonversi lead.', 'danger');
    }
  };

  const deleteLead = async (id: string) => {
    if(confirm("Hapus lead ini?")) {
        if (!db.leads) return;
        await db.leads.delete(id);
    }
  };

  return { leads, addLead, updateLeadStatus, convertLeadToClient, deleteLead };
};
