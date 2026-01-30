
"use client";

import React from 'react';
import { useAyrshareLogic } from '@cbp/core';
import { ApiKeyForm } from './molecules/ApiKeyForm';
import { AyrshareProfileCard } from './molecules/AyrshareProfileCard';
import { Share2, AlertTriangle } from 'lucide-react';

export const AyrshareIntegrationView: React.FC = () => {
  const { config, profiles, saveApiKey, disconnect } = useAyrshareLogic();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Left Column: Configuration */}
      <div className="space-y-6">
        <ApiKeyForm 
          isConnected={config.isConnected} 
          currentKey={config.apiKey} 
          onSave={saveApiKey} 
          onDisconnect={disconnect} 
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900 text-sm text-blue-800 dark:text-blue-300">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Apa itu Ayrshare?
          </h4>
          <p className="leading-relaxed opacity-90">
            Ayrshare adalah platform API untuk memposting konten ke berbagai media sosial (Instagram, Facebook, Twitter, LinkedIn, dll) secara bersamaan dari satu tempat.
          </p>
        </div>
      </div>

      {/* Right Column: Connected Profiles */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          Profil Terhubung
        </h3>

        {config.isConnected ? (
          profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map((profile) => (
                <AyrshareProfileCard key={profile.refId} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400">Tidak ada profil ditemukan pada akun Ayrshare ini.</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <AlertTriangle className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
            <h4 className="font-bold text-slate-600 dark:text-slate-300">Koneksi Belum Dikonfigurasi</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Silakan masukkan API Key valid di panel sebelah kiri untuk memuat daftar profil sosial media Anda (Prototipe).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
