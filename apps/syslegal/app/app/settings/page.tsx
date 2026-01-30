
"use client";

import React, { useState } from 'react';
import { PageHeader, Card } from '@cbp/ui';
import { useAuth } from '@cbp/core';
import { User, Building, ShieldAlert, FileText } from 'lucide-react';
import { ProfileSettings } from '../../../src/components/settings/ProfileSettings';
import { BusinessSettings } from '../../../src/components/settings/BusinessSettings';
import { TemplateSettings } from '../../../src/components/settings/organisms/TemplateSettings';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'templates'>('profile');

  // Hanya Admin dan IT yang bisa akses pengaturan bisnis & template
  const canAccessBusiness = user?.role === 'ADMIN' || user?.role === 'IT';

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-full flex flex-col">
      <PageHeader 
        title="Pengaturan Sistem" 
        subtitle="Kelola profil akun, informasi firma, dan template dokumen." 
      />

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
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
          <>
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

            <button
              onClick={() => setActiveTab('templates')}
              className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
                activeTab === 'templates' 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="h-4 w-4" /> Template Dokumen
              {activeTab === 'templates' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
            </button>
          </>
        )}
      </div>

      <div className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-0">
        {activeTab === 'profile' && <ProfileSettings />}
        
        {activeTab === 'business' && canAccessBusiness && <BusinessSettings />}
        
        {activeTab === 'templates' && canAccessBusiness && <TemplateSettings />}
        
        {(activeTab === 'business' || activeTab === 'templates') && !canAccessBusiness && (
          <Card className="text-center py-12">
            <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Akses Ditolak</h3>
            <p className="text-slate-500">Anda tidak memiliki izin untuk mengubah konfigurasi firma.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
