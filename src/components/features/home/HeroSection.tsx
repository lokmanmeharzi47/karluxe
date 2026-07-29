'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, ChevronDown, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { GoldBadge } from '@/components/ui/GoldBadge';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]">
      {/* Background Image / Video Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Luxury Cars Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <GoldBadge icon={<Sparkles className="w-3.5 h-3.5" />}>
            Le Sommet de la Mobilité de Luxe
          </GoldBadge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight font-heading leading-tight mb-6"
        >
          Pilotez L'<span className="gold-gradient-text">Extraordinaire</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#B6B6B6] max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Location haut de gamme avec service concierge VIP : Ferrari, Porsche, Rolls-Royce, Lamborghini et Maybach à Alger, Oran.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/fleet">
            <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Découvrir la Flotte
            </LuxuryButton>
          </Link>
          <Link href="/booking">
            <LuxuryButton variant="glass" size="lg" icon={<Shield className="w-5 h-5" />}>
              Réservation Immédiate
            </LuxuryButton>
          </Link>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#D4AF37]"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
