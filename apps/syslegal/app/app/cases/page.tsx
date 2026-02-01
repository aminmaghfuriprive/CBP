
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RedirectCases() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the centralized Client DB page with 'cases' tab active
    router.replace('/app/clients?view=cases');
  }, [router]);

  return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>;
}
