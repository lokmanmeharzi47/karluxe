'use client';

import React from 'react';
import Link from 'next/link';
import { Car, LayoutDashboard, Calendar, MapPin, Tag, DollarSign, LogOut } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Management', icon: Car },
    { id: 'bookings', label: 'Reservations', icon: Calendar },
    { id: 'locations', label: 'Rental Locations', icon: MapPin },
    { id: 'coupons', label: 'Promo Coupons', icon: Tag },
    { id: 'analytics', label: 'Revenue Analytics', icon: DollarSign },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-[rgba(212,175,55,0.2)] bg-[#050505] min-h-screen p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Car className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading tracking-widest text-white uppercase">
              Kar<span className="text-[#D4AF37]">Luxe</span>
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">
              Executive Suite
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'text-[#B6B6B6] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Exit Executive Suite
        </Link>
      </div>
    </aside>
  );
};
