'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Car, LayoutDashboard, Calendar, Layers, Award, Building2, DollarSign, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'karluxe_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('karluxe_admin_token');
    router.push('/admin-login');
  };

  return (
    <aside className="w-64 glass-panel border-r border-[rgba(212,175,55,0.2)] bg-[#0A0A0A]/95 flex flex-col justify-between p-6 shrink-0 z-20 min-h-screen">
      <div className="space-y-8">
        {/* Brand Header */}
        <Link href="/" className="flex items-center justify-center group mb-4">
          <Image
            src="/images/logo.webp"
            alt="Karluxe Logo"
            width={600}
            height={475}
            className="w-40 h-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          />
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
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4.5 h-4.5" /> Catégories
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'brands'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4.5 h-4.5" /> Brands
          </button>

          <button
            onClick={() => setActiveTab('agencies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'agencies'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4.5 h-4.5" /> Agences & Hubs
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8C65A] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4.5 h-4.5" /> Revenus
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            Session Admin Sécurisée
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Déconnexion Admin
        </button>
      </div>
    </aside>
  );
};
