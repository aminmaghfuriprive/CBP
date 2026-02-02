
"use client";

import { useState, useEffect } from 'react';

export const useActiveLegalSection = () => {
  const [activeSection, setActiveSection] = useState<string>('privacy');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Margin negatif berarti area deteksi diperkecil ke tengah layar.
        // -20% dari atas: Trigger aktif setelah elemen melewati header.
        // -35% dari bawah: Mencegah elemen bawah terdeteksi terlalu dini.
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.1
      }
    );

    // Mengambil semua elemen <section> yang memiliki ID
    // Pastikan ID di HTML nanti sesuai dengan ID di data (privacy, terms, dll)
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return activeSection;
};
