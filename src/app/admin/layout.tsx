'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Car, 
  LayoutDashboard, 
  Calendar, 
  MapPin, 
  Tag, 
  DollarSign, 
  Users, 
  Wrench, 
  LogOut,
  ShieldCheck,
  Bell,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const links = [
    { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
    { name: 'Flotte Supercars', href: '/admin?tab=fleet', icon: Car },
    { name: 'Réservations VIP', href: '/admin?tab=bookings', icon: Calendar },
    { name: 'Points de Livraison', href: '/admin?tab=locations', icon: MapPin },
    { name: 'Codes Promo VIP', href: '/admin?tab=coupons', icon: Tag },
    { name: 'Revenus & Analytics', href: '/admin?tab=analytics', icon: DollarSign },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black overflow-hidden font-sans">
      {/* Executive Sidebar */}
      <aside className="w-64 glass-panel border-r border-[rgba(212,175,55,0.2)] bg-[#0A0A0A]/95 flex flex-col justify-between p-6 shrink-0 z-20">
        <div className="space-y-8">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-heading tracking-widest text-white uppercase">
                Kar<span className="text-[#D4AF37]">Luxe</span>
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold -mt-0.5">
                Executive Suite
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (pathname === '/admin' && link.href === '/admin');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar info */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              Monaco Hub Active
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Quitter l'Admin
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
        {/* Luxury Executive Topbar */}
        <header className="h-20 glass-panel border-b border-[rgba(212,175,55,0.2)] bg-[#0A0A0A]/80 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold font-heading uppercase text-white tracking-tight">
              Tableau de Bord Exécutif
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
              KarLuxe Rental v2.5
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-full glass-panel text-white hover:text-[#D4AF37] transition-colors relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center font-bold text-black text-xs font-heading">
                AL
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Directeur Flotte</span>
                <span className="text-[10px] text-[#D4AF37] font-semibold">Concierge Monaco</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page View */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
