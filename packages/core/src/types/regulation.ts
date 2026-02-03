
export type RegulationStatus = 'Berlaku' | 'Dicabut' | 'Diubah';

export interface RegulationItem {
  id: string;
  title: string;
  type: string; // UU, PP, Perpres, Permen, Putusan MK
  number: string;
  year: number;
  category: string; // Pajak, Pidana, Ketenagakerjaan, Korporasi
  status: RegulationStatus;
  fileUrl: string;
  summary: string;
  downloadCount: number;
  uploadedAt: string;
}
