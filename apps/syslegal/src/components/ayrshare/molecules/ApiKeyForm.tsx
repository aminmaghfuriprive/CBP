
import React, { useState } from 'react';
import { Button, Card } from '@cbp/ui';
import { Key, Link2, Unplug, Eye, EyeOff } from 'lucide-react';
import { ConnectionStatus } from '../atoms/ConnectionStatus';

interface ApiKeyFormProps {
  isConnected: boolean;
  currentKey: string;
  onSave: (key: string) => void;
  onDisconnect: () => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ isConnected, currentKey, onSave, onDisconnect }) => {
  const [keyInput, setKeyInput] = useState(currentKey);
  const [showKey, setShowKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(keyInput);
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-cbp-navy dark:text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-cbp-gold" /> Konfigurasi API
          </h3>
          <p className="text-sm text-slate-500">Masukkan API Key dari dashboard Ayrshare.</p>
        </div>
        <ConnectionStatus isConnected={isConnected} />
      </div>

      {!isConnected ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type={showKey ? "text" : "password"}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cbp-navy outline-none text-slate-900 dark:text-white font-mono text-sm"
              placeholder="Paste Ayrshare API Key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              required
            />
            <button 
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
            {isSubmitting ? 'Memverifikasi...' : <><Link2 className="h-4 w-4" /> Simpan & Hubungkan</>}
          </Button>
        </form>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">
            Akun terhubung menggunakan Key: <span className="font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">••••••••{currentKey.slice(-4)}</span>
          </p>
          <Button variant="outline" onClick={onDisconnect} className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10 gap-2">
            <Unplug className="h-4 w-4" /> Putuskan Koneksi
          </Button>
        </div>
      )}
    </Card>
  );
};
