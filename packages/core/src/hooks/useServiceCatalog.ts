
"use client";

import { useMemo } from 'react';
import { SERVICES } from '../data/services';
import { ServiceItem, ServiceDivision } from '../types';

// Tipe data untuk hasil grouping: Key adalah Nama Divisi, Value adalah Array Layanan
export type GroupedServices = Record<ServiceDivision, ServiceItem[]>;

// Definisi urutan divisi agar tampil rapi di UI (bukan urut abjad, tapi urut prioritas bisnis)
export const SERVICE_DIVISIONS_ORDER: ServiceDivision[] = [
  'Hukum Umum & Litigasi',
  'Perizinan & Bisnis',
  'Pertanahan & Agraria',
  'Legal Administratif & Korporasi'
];

export const useServiceCatalog = () => {
  // Memoize hasil grouping agar tidak kalkulasi ulang setiap render
  const catalog = useMemo(() => {
    // 1. Inisialisasi object kosong dengan key divisi
    const groups: GroupedServices = {
      'Hukum Umum & Litigasi': [],
      'Perizinan & Bisnis': [],
      'Pertanahan & Agraria': [],
      'Legal Administratif & Korporasi': []
    };

    // 2. Distribusi layanan ke dalam bucket yang sesuai
    SERVICES.forEach((service) => {
      // Pastikan service aktif sebelum ditampilkan
      if (service.isActive) {
        // TypeScript menjamin service.division valid karena strict typing di Step 1
        if (groups[service.division]) {
          groups[service.division].push(service);
        }
      }
    });

    return groups;
  }, []);

  return {
    /** Data layanan yang sudah dikelompokkan per divisi */
    groupedServices: catalog,
    /** Array nama divisi yang sudah diurutkan untuk keperluan looping UI */
    divisions: SERVICE_DIVISIONS_ORDER,
    /** Raw data jika masih dibutuhkan */
    allServices: SERVICES
  };
};
