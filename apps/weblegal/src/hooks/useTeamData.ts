
import { TEAM } from '@cbp/core';

export const useTeamData = () => {
  // 1. Ambil Data Founder
  const founder = TEAM.find(m => m.id === 'team_founder');

  // 2. Filter Tim Ahli (Lawyers & Production Staff)
  // Logic: Role mengandung kata 'produksi' ATAU Specialty mengandung kata 'Divisi'
  const expertStaff = TEAM.filter(m => 
    m.role.toLowerCase().includes('produksi') || 
    m.specialty.includes('Divisi')
  );

  // 3. Filter Tim Pendukung (Management, IT, Finance, Field)
  // Logic: Bukan bagian produksi/divisi hukum dan bukan founder
  const supportStaff = TEAM.filter(m => 
    !m.role.toLowerCase().includes('produksi') && 
    !m.specialty.includes('Divisi') && 
    m.id !== 'team_founder'
  );

  return {
    founder,
    expertStaff,
    supportStaff
  };
};
