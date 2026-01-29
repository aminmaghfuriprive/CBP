import Link from 'next/link'
import { Button } from '@cbp/ui'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
      <h1 className="text-8xl font-serif font-bold text-cbp-navy dark:text-cbp-gold mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md text-lg">
        Maaf, halaman yang Anda cari tidak tersedia, telah dipindahkan, atau Anda tidak memiliki akses.
      </p>
      <Link href="/">
        <Button size="lg">Kembali ke Beranda</Button>
      </Link>
    </div>
  )
}