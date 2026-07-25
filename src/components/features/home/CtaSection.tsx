'use client';

import React from 'react';
import Link from 'next/link';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-10 sm:p-16 border border-[rgba(212,175,55,0.4)] bg-gradient-to-r from-[#111111] via-[#161616] to-[#111111] text-center space-y-8 relative overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Réservation Privée VIP
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Prêt à Prendre le Volant de Votre <span className="gold-gradient-text">Supercar d'Exception</span> ?
          </h2>

          <p className="text-sm sm:text-base text-[#B6B6B6] max-w-2xl mx-auto leading-relaxed">
            Réservez en quelques clics votre véhicule d'exception avec garantie de livraison prioritaire et assistance concierge 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/booking">
              <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Réserver Maintenant
              </LuxuryButton>
            </Link>
            <Link href="/fleet">
              <LuxuryButton variant="glass" size="lg" icon={<Shield className="w-5 h-5" />}>
                Consulter le Catalogue
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
