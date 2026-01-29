
"use client";

import React, { useState } from 'react';
import { PageHeader, Card } from '@cbp/ui';
import { useAuth } from '@cbp/core';
import { User, Building, ShieldAlert } from 'lucide-react';
import { ProfileSettings } from '../../../src/components/settings/ProfileSettings';
import { BusinessSettings } from '../../../src/components/settings/BusinessSettings';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'business'>('profile');

  // Hanya Admin dan IT yang bisa akses pengaturan bisnis
  const canAccessBusiness = user?.role === 'ADMIN' || user?.role === 'IT';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Pengaturan Sistem" 
        subtitle="Kelola profil akun anda dan informasi firma hukum." 
      />

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'profile' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="h-4 w-4" /> Profil Saya
          {activeTab === 'profile' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        {canAccessBusiness && (
          <button
            onClick={() => setActiveTab('business')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
              activeTab === 'business' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Building className="h-4 w-4" /> Profil Firma
            {activeTab === 'business' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>
        )}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'profile' && <ProfileSettings />}
        
        {activeTab === 'business' && canAccessBusiness && <BusinessSettings />}
        
        {activeTab === 'business' && !canAccessBusiness && (
          <Card className="text-center py-12">
            <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Akses Ditolak</h3>
            <p className="text-slate-500">Anda tidak memiliki izin untuk mengubah profil bisnis.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
