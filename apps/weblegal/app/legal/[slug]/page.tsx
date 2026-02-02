
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

  // Scroll to content anchor when slug changes
  useEffect(() => {
    const element = document.getElementById('legal-content-anchor');
    if (element) {
      // Offset 85px (Approx Navbar Height) untuk memastikan Hero tertutup sempurna
      const headerOffset = 85; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
