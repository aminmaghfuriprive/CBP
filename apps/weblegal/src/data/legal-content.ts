
export type LegalSectionType = 'privacy' | 'terms' | 'cookies' | 'faq';

export interface LegalSection {
  id: LegalSectionType;
  title: string;
  content: {
    heading: string;
    body: string; // HTML string to allow paragraphs, lists, and bold text
  }[];
}

export const LEGAL_CONTENT: LegalSection[] = [
  {
    id: 'privacy',
    title: 'Kebijakan Privasi',
    content: [
      {
        heading: '1. Pengumpulan Informasi Klien',
        body: '<p>CBP Corp ("Kami") mengumpulkan informasi pribadi Anda semata-mata untuk kepentingan pemberian jasa hukum, verifikasi identitas (KYC), dan administrasi perkara. Informasi ini meliputi namun tidak terbatas pada: Nama Lengkap, Nomor Identitas (KTP/Paspor), Alamat, dan Dokumen terkait kasus.</p>'
      },
      {
        heading: '2. Prinsip Kerahasiaan (Attorney-Client Privilege)',
        body: '<p>Sesuai dengan Kode Etik Advokat Indonesia dan Undang-Undang Advokat No. 18 Tahun 2003, kami menjamin kerahasiaan mutlak atas segala informasi, dokumen, dan rahasia yang Anda sampaikan kepada kami dalam hubungan profesional Advokat-Klien. Kewajiban ini berlaku selamanya, bahkan setelah hubungan kerja berakhir.</p>'
      },
      {
        heading: '3. Penggunaan Data Digital',
        body: '<p>Data yang Anda masukkan melalui formulir "Hubungi Kami" atau "Portal Klien" dienkripsi menggunakan protokol keamanan standar industri (SSL/TLS). Akses terhadap data digital dibatasi secara ketat hanya kepada tim hukum dan staf administrasi yang menangani perkara Anda secara langsung.</p>'
      },
      {
        heading: '4. Penyimpanan & Penghapusan Data',
        body: '<p>Dokumen fisik dan digital terkait perkara akan disimpan selama masa retensi 5 (lima) tahun setelah kasus dinyatakan selesai atau ditutup (closed), kecuali peraturan perundang-undangan menentukan lain. Setelah masa retensi berakhir, dokumen akan dimusnahkan atau dikembalikan kepada Klien sesuai permintaan.</p>'
      }
    ]
  },
  {
    id: 'terms',
    title: 'Syarat & Ketentuan',
    content: [
      {
        heading: '1. Lingkup Layanan',
        body: '<p>Website ini disediakan sebagai sarana informasi profil firma dan portal manajemen klien. Informasi yang terdapat di website ini tidak dapat dianggap sebagai nasihat hukum formal yang mengikat sebelum adanya perjanjian jasa hukum (Engagement Letter) yang ditandatangani.</p>'
      },
      {
        heading: '2. Penyangkalan (Disclaimer)',
        body: '<p>Segala artikel, berita, atau wawasan hukum yang dipublikasikan di website ini bertujuan untuk edukasi umum. CBP Corp tidak bertanggung jawab atas kerugian yang timbul akibat tindakan yang diambil semata-mata berdasarkan informasi di website ini tanpa konsultasi profesional.</p>'
      },
      {
        heading: '3. Hak Kekayaan Intelektual',
        body: '<p>Seluruh konten dalam website ini, termasuk namun tidak terbatas pada logo, teks, desain, dan kode sumber, adalah kekayaan intelektual CBP Corp dan dilindungi oleh Undang-Undang Hak Cipta. Dilarang menyalin atau mendistribusikan ulang tanpa izin tertulis.</p>'
      }
    ]
  },
  {
    id: 'cookies',
    title: 'Kebijakan Cookie',
    content: [
      {
        heading: '1. Apa itu Cookie?',
        body: '<p>Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website kami. Cookie membantu kami mengenali perangkat Anda dan meningkatkan pengalaman pengguna.</p>'
      },
      {
        heading: '2. Jenis Cookie yang Kami Gunakan',
        body: '<ul class="list-disc pl-5 mt-2 space-y-1"><li><strong>Essential Cookies:</strong> Diperlukan agar fitur dasar website (seperti login Portal Klien) dapat berfungsi.</li><li><strong>Analytics Cookies:</strong> Membantu kami memahami statistik kunjungan secara anonim untuk perbaikan performa website.</li></ul>'
      },
      {
        heading: '3. Pengelolaan Cookie',
        body: '<p>Anda dapat mengatur browser Anda untuk menolak semua atau sebagian cookie. Namun, harap dicatat bahwa menonaktifkan cookie dapat mempengaruhi fungsionalitas fitur tertentu pada website ini (terutama Portal Klien).</p>'
      }
    ]
  },
  {
    id: 'faq',
    title: 'FAQ (Pertanyaan Umum)',
    content: [
      {
        heading: 'Bagaimana cara menjadwalkan konsultasi?',
        body: '<p>Anda dapat menggunakan menu "Hubungi Kami" di website ini atau langsung menghubungi nomor WhatsApp resmi kami. Staf kami akan mengatur jadwal pertemuan dengan lawyer yang sesuai dengan bidang kasus Anda.</p>'
      },
      {
        heading: 'Apakah konsultasi awal dikenakan biaya?',
        body: '<p>Untuk pemetaan masalah awal via telepon (maks. 15 menit), kami tidak mengenakan biaya. Namun, konsultasi mendalam, review dokumen, dan pertemuan tatap muka dikenakan biaya profesional (Consultation Fee) sesuai tarif per jam yang berlaku.</p>'
      },
      {
        heading: 'Apakah CBP Corp menangani kasus Pro Bono?',
        body: '<p>Ya, kami menyediakan kuota layanan bantuan hukum cuma-cuma (Pro Bono) bagi masyarakat tidak mampu yang memenuhi syarat, sesuai dengan komitmen sosial profesi kami. Silakan ajukan permohonan dengan melampirkan Surat Keterangan Tidak Mampu (SKTM).</p>'
      }
    ]
  }
];
