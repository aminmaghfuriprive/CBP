
import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import { NotificationToast } from "@cbp/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "CBP SysLegal | Internal Management System",
    template: "%s | CBP SysLegal"
  },
  description: "Sistem Manajemen Terintegrasi untuk CBP Corp Law Firm.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
        <Providers>
          {children}
          <NotificationToast />
        </Providers>
      </body>
    </html>
  );
}
