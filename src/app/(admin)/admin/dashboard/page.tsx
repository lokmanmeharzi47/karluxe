'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
      Redirection vers le Tableau de Bord Exécutif KarLuxe...
    </div>
  );
}
