
import { PortfolioItem } from '../types';

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'pf_01',
    title: 'Penyelesaian Sengketa Lahan Kawasan Industri',
    category: 'Hukum Umum & Litigasi',
    clientIndustry: 'Manufaktur & Properti',
    year: '2023',
    challenge: 'Klien menghadapi klaim tumpang tindih kepemilikan lahan seluas 5 hektar di kawasan industri Karawang yang menghambat proses perluasan pabrik. Pihak lawan mengklaim memiliki girik lama.',
    solution: 'Tim litigasi kami melakukan penelusuran riwayat tanah (Warkah) di BPN dan Kelurahan. Kami mengajukan gugatan intervensi dan membuktikan bahwa sertifikat HGB klien memiliki dasar hukum yang kuat (inkracht).',
    result: 'Pengadilan memenangkan klien kami. Klaim lawan ditolak, dan proses konstruksi pabrik dapat dilanjutkan tanpa hambatan hukum.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true
  },
  {
    id: 'pf_02',
    title: 'Restrukturisasi Korporasi & Merger',
    category: 'Legal Administratif & Korporasi',
    clientIndustry: 'Teknologi & Start-up',
    year: '2022',
    challenge: 'Dua perusahaan rintisan (Start-up) ingin melakukan merger untuk efisiensi operasional, namun terkendala struktur kepemilikan saham yang kompleks dan perizinan OSS yang berbeda KBLI.',
    solution: 'Divisi Korporasi menyusun skema merger yang efisien pajak, melakukan audit legal (Due Diligence), serta mengurus penyesuaian NIB di sistem OSS RBA pasca penggabungan.',
    result: 'Merger legal selesai dalam 3 bulan. Entitas baru kini beroperasi dengan valuasi gabungan yang meningkat 200%.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true
  },
  {
    id: 'pf_03',
    title: 'Pendaftaran Merek Dagang Global',
    category: 'Perizinan & Bisnis',
    clientIndustry: 'F&B (Makanan Minuman)',
    year: '2023',
    challenge: 'Sebuah brand kopi lokal ingin ekspansi ekspor ke Singapura dan Malaysia namun khawatir mereknya dibajak kompetitor luar negeri.',
    solution: 'Kami mendaftarkan merek melalui Protokol Madrid untuk perlindungan internasional sekaligus mengamankan sertifikasi Halal dan izin edar BPOM untuk produk ekspor.',
    result: 'Merek terdaftar resmi di WIPO. Klien berhasil melakukan ekspor perdana tanpa sengketa HAKI.',
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false
  },
  {
    id: 'pf_04',
    title: 'Konversi Status Tanah Hak Milik',
    category: 'Pertanahan & Agraria',
    clientIndustry: 'Individual (High Net Worth)',
    year: '2023',
    challenge: 'Klien membeli aset berupa tanah eks-HGU yang statusnya tidak jelas selama 20 tahun, ingin ditingkatkan menjadi SHM.',
    solution: 'Divisi Agraria melakukan pemetaan ulang, mediasi dengan warga sekitar, dan pengurusan SK Hak di Kantor Pertanahan setempat sesuai prosedur reforma agraria.',
    result: 'Sertifikat Hak Milik (SHM) berhasil diterbitkan atas nama klien, meningkatkan nilai aset sebesar 300%.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    isFeatured: false
  },
  {
    id: 'pf_05',
    title: 'Pendampingan Hukum Pidana Korupsi',
    category: 'Hukum Umum & Litigasi',
    clientIndustry: 'Pejabat Publik',
    year: '2021',
    challenge: 'Klien dituduh melakukan penyalahgunaan wewenang. Kasus membutuhkan pembelaan yang jeli terhadap detail administrasi negara.',
    solution: 'Kami menyusun eksepsi yang membuktikan bahwa kesalahan tersebut adalah mal-administrasi, bukan tindak pidana korupsi, dengan menghadirkan saksi ahli hukum tata negara.',
    result: 'Klien divonis bebas murni pada tingkat pertama dan dikuatkan di tingkat kasasi.',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000',
    isFeatured: true
  }
];
