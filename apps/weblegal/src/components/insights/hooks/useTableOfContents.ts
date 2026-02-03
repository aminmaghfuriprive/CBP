
"use client";

import { useEffect, useState } from 'react';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const useTableOfContents = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parsing Heading
    const timer = setTimeout(() => {
      const articleBody = document.getElementById('article-content');
      if (!articleBody) return;

      const elements = articleBody.querySelectorAll('h2, h3');
      const items: TOCItem[] = [];

      elements.forEach((elem, index) => {
        const id = elem.id || `heading-${index}`;
        elem.id = id;
        items.push({
          id,
          text: elem.textContent || '',
          level: Number(elem.tagName.charAt(1))
        });
      });

      setHeadings(items);
      // Set default active ke yang pertama
      if (items.length > 0) setActiveId(items[0].id);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        // Logika Sorot:
        // Area deteksi diperkecil menjadi celah sempit di bagian atas layar.
        // -100px dari atas (kompensasi header sticky)
        // -80% dari bawah (abaikan elemen yang masih jauh di bawah)
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return { headings, activeId };
};
