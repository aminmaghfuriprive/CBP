
import { CertificateItem } from '../types';

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert_cla',
    title: 'Certified Legal Auditor (CLA)',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    year: '2018',
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-4a8b74c03385?auto=format&fit=crop&q=80&w=800',
    displayOrder: 1
  },
  {
    id: 'cert_ccd',
    title: 'Certified Contract Drafter (CCD)',
    issuer: 'Asosiasi Pengacara Pengadaan Indonesia (APPI)',
    year: '2019',
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
    displayOrder: 2
  },
  {
    id: 'cert_med',
    title: 'Certified Mediator (C.Med)',
    issuer: 'Mahkamah Agung Republik Indonesia',
    year: '2020',
    imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=800',
    displayOrder: 3
  },
  {
    id: 'cert_haki',
    title: 'Konsultan Hak Kekayaan Intelektual',
    issuer: 'Direktorat Jenderal Kekayaan Intelektual (DJKI)',
    year: '2021',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    displayOrder: 4
  },
  {
    id: 'cert_liq',
    title: 'Certified Liquidator (C.Li)',
    issuer: 'Perkumpulan Profesi Likuidator Indonesia',
    year: '2022',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    displayOrder: 5
  },
  {
    id: 'cert_tax',
    title: 'Brevet Pajak A & B',
    issuer: 'Ikatan Akuntan Indonesia (IAI)',
    year: '2017',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-260327c0d148?auto=format&fit=crop&q=80&w=800',
    displayOrder: 6
  }
];
