'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Heart, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const WeddingSection: React.FC = () => {
  return (
    <section id="wedding" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" /> Mariage & Cortège de Prestige
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight">
                Sublimez Votre <span className="gold-gradient-text">Jour Unique</span>
              </h2>

              <p className="text-sm text-[#B6B6B6] leading-relaxed">
                Faites une entrée inoubliable lors de votre mariage avec nos convois de supercars et berlines cérémoniales préparées avec soin (Rolls-Royce Phantom, Bentley Continental, Maybach S-Class, Ferrari SF90).
              </p>

              <ul className="space-y-3 text-xs text-white font-medium">
                <li className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Décoration florale et rubans cérémoniaux inclus
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Chauffeur privé en tenue cérémoniale dédiée
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Horaires sur-mesure et prise en charge du cortège
                </li>
              </ul>

              <div className="pt-4">
                <Link href="/booking">
                  <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Réserver un Cortège de Mariage
                  </LuxuryButton>
                </Link>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
                alt="Mariage Rolls-Royce Luxury"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
