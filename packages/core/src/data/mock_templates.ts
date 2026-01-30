
import { DocumentTemplate } from '../types';
import { COMPANY_NAME, TAGLINE } from '../constants';

export const MOCK_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'tpl_kop_1',
    type: 'LETTERHEAD',
    name: 'Kop Surat Formal (Center)',
    companyName: COMPANY_NAME,
    addressLine1: 'Equity Tower Lt. 35, SCBD Lot 9, Jl. Jend. Sudirman Kav. 52-53',
    addressLine2: 'Jakarta Selatan 12190 - Indonesia',
    contactInfo: 'Telp: +62 21 5555 8888 | Email: info@cbpcorp.id',
    website: 'www.cbpcorp.id',
    layout: 'center',
    designStyle: 'SIMPLE',
    isActive: true,
    accentColor: '#d4af37', // Gold
    logoUrl: '' // Empty string will use default icon in UI
  },
  {
    id: 'tpl_env_1',
    type: 'ENVELOPE',
    name: 'Amplop DL Standar',
    companyName: COMPANY_NAME,
    addressLine1: 'Equity Tower Lt. 35, SCBD Lot 9',
    addressLine2: 'Jakarta Selatan 12190',
    contactInfo: '',
    website: '',
    layout: 'left',
    designStyle: 'SIMPLE',
    isActive: true,
    accentColor: '#0f172a', // Navy
    logoUrl: ''
  }
];
