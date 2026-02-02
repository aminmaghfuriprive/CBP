
import React from 'react';
import { QrCode } from 'lucide-react';
import { BankOption } from '../../data/types';
import { QRIS_OPTION } from '../../data/constants';
import { SectionLabel, GroupHeader, QrisListItem } from '../atoms';
import { BankListContainer } from '../fragments';

interface MethodSelectionViewProps {
  onSelectBank: (bank: BankOption) => void;
}

export const MethodSelectionView: React.FC<MethodSelectionViewProps> = ({ onSelectBank }) => (
  <div className="space-y-4 animate-in slide-in-from-right-4">
    <SectionLabel>Select Method</SectionLabel>
    
    {/* Micro-Molecule: Bank List */}
    <BankListContainer onSelect={onSelectBank} />

    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <GroupHeader icon={QrCode} label="QRIS" />
      <QrisListItem onClick={() => onSelectBank(QRIS_OPTION)} />
    </div>
  </div>
);
