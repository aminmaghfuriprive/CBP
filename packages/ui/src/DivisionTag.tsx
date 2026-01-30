
import React from 'react';
import { Badge } from './Badge';

interface DivisionTagProps {
  division: string;
  className?: string;
}

export const DivisionTag: React.FC<DivisionTagProps> = ({ division, className = '' }) => {
  
  // Logic sentralisasi warna berdasarkan nama divisi
  // Ini menggantikan logic if-else yang berulang di page level
  const getVariant = (divName: string) => {
    // 1. Hukum Umum & Litigasi -> Merah (Danger/Assertive)
    if (divName.includes('Litigasi')) return 'danger';
    
    // 2. Perizinan & Bisnis -> Biru (Info/Corporate)
    if (divName.includes('Perizinan')) return 'info';
    
    // 3. Pertanahan & Agraria -> Kuning (Warning/Earth)
    if (divName.includes('Pertanahan') || divName.includes('Agraria')) return 'warning';
    
    // 4. Legal Administratif & Korporasi -> Hijau (Success/Growth)
    if (divName.includes('Korporasi') || divName.includes('Administratif')) return 'success';
    
    // Fallback
    return 'neutral';
  };

  return (
    <Badge 
      variant={getVariant(division)} 
      className={`uppercase tracking-widest text-[10px] font-bold ${className}`}
    >
      {division}
    </Badge>
  );
};
