
"use client";

import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { LEGAL_CONTENT } from '@/data/legal-content';
import { LegalContentBlock } from '@/components/legal/LegalContentBlock';

interface PageProps {
  params: { slug: string };
}

export default function LegalContentPage({ params }: PageProps) {
  // Find content based on slug
  const section = LEGAL_CONTENT.find((s) => s.id === params.slug);

  // Scroll to top when slug changes to ensure user sees start of content
  useEffect(() => {
    // Memastikan scroll naik ke atas secara halus agar transisi terasa natural
    // Kita scroll ke 0 agar Hero section terlihat lagi, memberikan konteks penuh
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.slug]);

  if (!section) {
    return notFound();
  }

  return (
    <LegalContentBlock 
      key={section.id} // Key ensures component remounts for animation
      section={section} 
    />
  );
}
