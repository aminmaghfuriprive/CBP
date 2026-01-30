
import React from 'react';
import { ClientData } from '@cbp/core';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { InfoLabel } from '../atoms/InfoLabel';

interface ClientContactInfoProps {
  client: ClientData;
}

export const ClientContactInfo: React.FC<ClientContactInfoProps> = ({ client }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
      <div>
        <InfoLabel label="Person In Charge (PIC)" icon={User} />
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{client.contact}</p>
      </div>
      
      <div>
        <InfoLabel label="Email Resmi" icon={Mail} />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{client.email || '-'}</p>
      </div>

      <div>
        <InfoLabel label="Nomor Telepon" icon={Phone} />
        <p className="text-sm font-mono text-slate-700 dark:text-slate-300">{client.contact}</p>
      </div>

      <div>
        <InfoLabel label="Alamat Kantor" icon={MapPin} />
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {client.address || 'Alamat belum dilengkapi.'}
        </p>
      </div>
    </div>
  );
};
