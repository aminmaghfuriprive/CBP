"use client";

import { useState } from 'react';
import { DocumentFile } from '../types';
import { DOCUMENTS } from '../data/mock_content';
import { useNotifications } from '../context/NotificationContext';

export const useDocumentLogic = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>(DOCUMENTS);
  const { addNotification } = useNotifications();

  const addDocument = (doc: DocumentFile) => {
    setDocuments(prev => [doc, ...prev]);
    addNotification('Upload Berhasil', `Dokumen ${doc.name} berhasil disimpan ke database.`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    addNotification('Dokumen Dihapus', 'File telah dihapus dari sistem arsip.', 'warning');
  };

  return { documents, addDocument, deleteDocument };
};