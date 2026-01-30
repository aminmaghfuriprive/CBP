
type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Memetakan Tipe Agenda (Sidang, Meeting, dll) ke warna Badge
 */
export const getEventTypeVariant = (type: string): BadgeVariant => {
  switch(type) {
    case 'Sidang': return 'danger';     // Merah: Penting/Urgent
    case 'Meeting': return 'info';      // Biru: Informatif
    case 'Konsultasi': return 'success'; // Hijau: Revenue/Client
    case 'Deadline': return 'warning';   // Kuning: Peringatan
    default: return 'neutral';
  }
};

/**
 * Memetakan Status Umum (Booking, Invoice, Case) ke warna Badge
 */
export const getStatusVariant = (status: string): BadgeVariant => {
  const s = status.toLowerCase();
  if (['paid', 'aktif', 'selesai', 'confirmed', 'success', 'lunas', 'done'].includes(s)) return 'success';
  if (['pending', 'menunggu', 'unpaid', 'warning', 'proses'].includes(s)) return 'warning';
  if (['overdue', 'rejected', 'error', 'danger', 'batal'].includes(s)) return 'danger';
  if (['info', 'meeting', 'sidang'].includes(s)) return 'info';
  return 'neutral';
};
