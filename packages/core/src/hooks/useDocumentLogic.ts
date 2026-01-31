
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { DocumentFile } from '../types';
import { db } from '../db';
import { useNotifications } from '../context/NotificationContext';

export const useDocumentLogic = () => {
  const documents = useLiveQuery(() => db.documents.toArray()) || [];
  const { addNotification } = useNotifications();

  const addDocument = async (doc: DocumentFile) => {
    try {
      await db.documents.add({
        ...doc,
        status: doc.uploadedBy === 'Client' ? 'Pending' : 'Approved'
      });
      addNotification('Upload Berhasil', `Dokumen ${doc.name} tersimpan.`, 'success');
    } catch (error) {
      addNotification('Gagal', 'Tidak bisa menyimpan dokumen.', 'warning');
    }
  };

  const verifyDocument = async (id: string, status: 'Approved' | 'Rejected', reason?: string) => {
    try {
      await db.documents.update(id, { 
        status, 
        rejectionReason: reason 
      });
      addNotification('Verifikasi Selesai', `Dokumen telah di-${status.toLowerCase()}.`, 'success');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await db.documents.delete(id);
      addNotification('Dokumen Dihapus', 'File telah dihapus dari sistem.', 'warning');
    } catch (error) {
      console.error(error);
    }
  };

  return { documents, addDocument, deleteDocument, verifyDocument };
};
