
import { CaseData } from '../types';

export const MOCK_CASES: CaseData[] = [
  {
    id: 'case_001',
    clientName: 'PT. Maju Sejahtera',
    caseType: 'Pendirian PT Perorangan',
    division: 'Legal Administratif & Korporasi',
    status: 'Aktif',
    lifecycle: 'PRODUCTION',
    currentStage: '8_produksi',
    lastUpdate: '2023-10-25',
    description: 'Proses input data ke sistem AHU dan persiapan draft Akta Pendirian.'
  },
  {
    id: 'case_002',
    clientName: 'Bpk. Hartono',
    caseType: 'Sengketa Tanah Waris',
    division: 'Hukum Umum & Litigasi',
    status: 'Aktif',
    lifecycle: 'PRE_PRODUCTION',
    currentStage: '4_penawaran',
    lastUpdate: '2023-10-24',
    description: 'Menunggu konfirmasi pembayaran retainer fee dari klien setelah proposal dikirim.'
  },
  {
    id: 'case_003',
    clientName: 'CV. Kuliner Nusantara',
    caseType: 'Pendaftaran Merek',
    division: 'Perizinan & Bisnis',
    status: 'Selesai',
    lifecycle: 'ARCHIVED',
    currentStage: '14_pengarsipan',
    lastUpdate: '2023-10-20',
    description: 'Sertifikat merek telah terbit dan diserahkan. Dokumen masuk arsip.'
  },
  {
    id: 'case_004',
    clientName: 'Ibu Ratna Sari',
    caseType: 'Penaikan HGB ke HM',
    division: 'Pertanahan & Agraria',
    status: 'Aktif',
    lifecycle: 'POST_PRODUCTION',
    currentStage: '10_monitoring',
    lastUpdate: '2023-10-26',
    description: 'Berkas sudah masuk BPN, menunggu jadwal pengukuran ulang.'
  }
];
