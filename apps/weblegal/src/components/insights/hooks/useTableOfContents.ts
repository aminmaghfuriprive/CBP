
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
    const timer = setTimeout(() => {
      const articleBody = document.getElementById('article-content');
      if (!articleBody) return;

      const elements = articleBody.querySelectorAll('h2, h3');
      const items: TOCItem[] = [];

      elements.forEach((elem, index) => {
        const id = `heading-${index}`;
        elem.id = id;
        items.push({
          id,
          text: elem.textContent || '',
          level: Number(elem.tagName.charAt(1))
        });
      });

      setHeadings(items);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' } // Area sorot di bagian atas layar
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return { headings, activeId };
};
