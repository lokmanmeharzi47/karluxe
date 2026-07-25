'use client';

import React from 'react';
import Link from 'next/link';
import { Car, LayoutDashboard, Calendar, MapPin, Tag, DollarSign, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 glass-panel border-r border-[rgba(212,175,55,0.2)] bg-[#0A0A0A]/95 flex flex-col justify-between p-6 shrink-0 z-20 min-h-screen">
      <div className="space-y-8">
        {/* Brand Header */}
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

        {/* Navigation Items */}
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4.5 h-4.5" /> Vue d'ensemble
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'fleet'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Car className="w-4.5 h-4.5" /> Flotte Supercars
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" /> Réservations VIP
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'locations'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-4.5 h-4.5" /> Hubs de Livraison
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag className="w-4.5 h-4.5" /> Codes Promo VIP
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4.5 h-4.5" /> Revenus & Analytics
          </button>
        </nav>
      </div>

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
  );
};
