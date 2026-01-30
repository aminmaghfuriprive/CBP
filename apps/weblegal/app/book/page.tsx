
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BookRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-cbp-gold" />
        <p>Mengalihkan ke formulir reservasi...</p>
      </div>
    </div>
  );
}
