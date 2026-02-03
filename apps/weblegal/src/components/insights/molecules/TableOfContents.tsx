
"use client";

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Tunggu render konten selesai
    const timer = setTimeout(() => {
      const articleBody = document.getElementById('article-content');
      if (!articleBody) return;

      const elements = articleBody.querySelectorAll('h2, h3');
      const items: TOCItem[] = [];

      elements.forEach((elem, index) => {
        const id = `heading-${index}`;
        elem.id = id; // Inject ID ke elemen HTML asli
        items.push({
          id,
          text: elem.textContent || '',
          level: Number(elem.tagName.charAt(1))
        });
      });

      setHeadings(items);
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer untuk active state scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h4 className="font-serif font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
        <List className="h-4 w-4 text-cbp-gold" /> Daftar Isi
      </h4>
      <nav className="flex flex-col gap-2">
        {headings.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setActiveId(item.id);
            }}
            className={`
              text-sm transition-all duration-300 border-l-2 pl-3 py-1 block
              ${item.level === 3 ? 'ml-4 text-xs' : ''}
              ${activeId === item.id 
                ? 'border-cbp-gold text-cbp-navy dark:text-cbp-gold font-bold bg-gradient-to-r from-cbp-gold/10 to-transparent' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:border-slate-300'}
            `}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
