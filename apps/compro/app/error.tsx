'use client'
 
import { useEffect } from 'react'
import { Button } from '@cbp/ui'
import { AlertCircle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 text-center px-4 bg-white dark:bg-slate-950">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900 dark:text-white">Terjadi Kesalahan</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Sistem mengalami kendala saat memuat halaman ini. Silakan coba muat ulang.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="primary"
        >
          Coba Lagi
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Ke Beranda
        </Button>
      </div>
    </div>
  )
}