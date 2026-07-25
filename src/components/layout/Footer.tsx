'use client';

import React from 'react';
import Link from 'next/link';
import { Car, Mail, Phone, MapPin, ShieldCheck, ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { LuxuryButton } from '../ui/LuxuryButton';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-[rgba(212,175,55,0.2)] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center">
                <Car className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading tracking-widest text-white uppercase">
                  Kar<span className="text-[#D4AF37]">Luxe</span>
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#B6B6B6] -mt-1 font-semibold">
                  Luxury Rentals
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#B6B6B6] leading-relaxed max-w-sm">
              The world’s premier luxury car rental platform. Providing white-glove access to exotic hypercars, grand tourers, and executive chauffeur vehicles.
            </p>

            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#B6B6B6] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest font-heading text-[#D4AF37]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B6B6B6]">
              <li><Link href="/fleet" className="hover:text-white transition-colors">Exotic Fleet</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">VIP Concierge</Link></li>
              <li><Link href="/#wedding" className="hover:text-white transition-colors">Wedding Experiences</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">Customer Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Executive Portal</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest font-heading text-[#D4AF37]">
              VIP Locations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B6B6B6]">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Monaco Heliport</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Dubai DXB VIP</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Paris CDG Terminal</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> LAX Private Jet Lounge</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Zurich Helipad</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest font-heading text-[#D4AF37]">
              VIP Club
            </h4>
            <p className="text-xs text-[#B6B6B6] leading-relaxed">
              Subscribe for private hypercar drops and invitation-only rally events.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter VIP Email"
                  className="w-full bg-[#111111] border border-[rgba(212,175,55,0.2)] rounded-full py-3 px-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 bg-[#D4AF37] text-black rounded-full text-xs font-bold hover:bg-[#E8C65A] transition-colors cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B6B6B6]">
          <p>© 2026 KarLuxe Mobility S.A. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Insurance Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
