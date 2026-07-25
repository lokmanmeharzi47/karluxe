'use client';

import React from 'react';
import Link from 'next/link';
import { Car, Mail, Share2, Globe, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-[rgba(212,175,55,0.2)] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <img 
                src="/images/logo.png" 
                alt="Karluxe Logo" 
                className="w-36 h-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              />
            </Link>

            <p className="text-sm text-[#B6B6B6] leading-relaxed max-w-sm">
              La référence en Algérie pour la location de supercars d'exception, berlines de prestige et véhicules avec chauffeur privé.
            </p>

            <div className="flex items-center gap-4">
              {[Globe, Share2, Shield, Mail].map((Icon, i) => (
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
              <li><Link href="/fleet" className="hover:text-white transition-colors">Flotte Supercars</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Services VIP</Link></li>
              <li><Link href="/#wedding" className="hover:text-white transition-colors">Mariages & Cortèges</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Portail Exécutif</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B6B6B6]">
          <p>© 2026 KarLuxe Mobility. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions Générales</a>
            <a href="#" className="hover:text-white transition-colors">Assurance Tout-Risque</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
