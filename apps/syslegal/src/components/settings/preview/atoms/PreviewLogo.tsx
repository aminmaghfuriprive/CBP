import React from 'react';
import { Shield } from 'lucide-react';

interface PreviewLogoProps {
  logoUrl?: string;
  accentColor?: string;
  className?: string;
}

export const PreviewLogo: React.FC<PreviewLogoProps> = ({ 
  logoUrl, 
  accentColor = '#0f172a',
  className = 'h-16 w-16' 
}) => {
  if (logoUrl) {
    return <img src={logoUrl} alt="Logo" className={`${className} object-contain`} />;
  }

  return (
    <div 
      className={`${className} rounded-lg flex items-center justify-center text-white transition-colors`} 
      style={{ backgroundColor: accentColor }}
    >
      <Shield className="h-1/2 w-1/2 text-white" />
    </div>
  );
};