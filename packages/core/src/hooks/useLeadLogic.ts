
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Lead, LeadStatus, ClientData, Booking } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useLeadLogic = () => {
  const { addNotification } = useNotifications();

  const leads = useLiveQuery(() => 
    db.leads.orderBy('createdAt').reverse().toArray()
  ) || [];

  const addLead = async (lead: Lead) => {
    try {
      await db.leads.add(lead);
      addNotification('Lead Masuk', `Permintaan baru dari ${lead.name}.`, 'info', 'MARKETING');
    } catch (error) {
      console.error(error);
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    try {
      await db.leads.update(id, { status });
    } catch (error) {
      console.error(error);
    }
  };

  const convertLeadToClient = async (lead: Lead) => {
    try {
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
        await db.leads.delete(id);
    }
  };

  return { leads, addLead, updateLeadStatus, convertLeadToClient, deleteLead };
};
