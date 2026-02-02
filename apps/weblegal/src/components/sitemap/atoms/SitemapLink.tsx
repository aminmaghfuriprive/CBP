
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SitemapLinkProps {
  label: string;
  href: string;
}

export const SitemapLink: React.FC<SitemapLinkProps> = ({ label, href }) => {
  return (
    <Link 
      href={href} 
      className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-cbp-gold transition-colors py-1"
    >
      <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-cbp-gold transition-colors" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};
