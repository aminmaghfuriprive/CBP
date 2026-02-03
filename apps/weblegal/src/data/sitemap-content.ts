
export interface SitemapLinkItem {
  label: string;
  href: string;
}

export interface SitemapCategoryData {
  title: string;
  links: SitemapLinkItem[];
}

export const SITEMAP_CONTENT: SitemapCategoryData[] = [
  {
    title: "Menu Utama",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang Kami", href: "/about" },
      { label: "Tim & Profil", href: "/about#team" },
      { label: "Karir", href: "/careers" },
      { label: "Hubungi Kami", href: "/contact" }
    ]
  },
  {
    title: "Layanan Hukum",
    links: [
      { label: "Katalog Layanan", href: "/services" },
      { label: "Hukum Umum & Litigasi", href: "/services#litigasi" },
      { label: "Perizinan & Bisnis", href: "/services#perizinan" },
      { label: "Pertanahan & Agraria", href: "/services#agraria" },
      { label: "Legal Administratif & Korporasi", href: "/services#korporasi" }
    ]
  },
  {
    title: "Pusat Informasi",
    links: [
      { label: "Wawasan & Artikel", href: "/insights" },
      { label: "Portofolio & Studi Kasus", href: "/portfolio" },
      { label: "Pertanyaan Umum (FAQ)", href: "/legal/faq" },
      { label: "Kebijakan Privasi", href: "/legal/privacy" },
      { label: "Syarat & Ketentuan", href: "/legal/terms" },
      { label: "Kebijakan Cookie", href: "/legal/cookies" }
    ]
  },
  {
    title: "Akun & Portal",
    links: [
      { label: "Login Klien", href: "/auth/login" },
      { label: "Registrasi Klien Baru", href: "/auth/register" },
      { label: "Dashboard Portal", href: "/portal/dashboard" },
      { label: "Login Staff (Internal)", href: process.env.NEXT_PUBLIC_SYSLEGAL_URL || '/syslegal' }
    ]
  }
];
