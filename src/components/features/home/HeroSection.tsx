import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { GoldBadge } from '@/components/ui/GoldBadge';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505]">
      {/* Background Image / Video Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.webp"
          alt="Luxury Cars Background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
      </div>

      {/*
        These entry animations are CSS rather than framer-motion: this is the
        LCP block, and an animation library can only start it after hydration,
        which left the headline invisible until the JS bundle arrived.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Luxury Badge */}
        <div className="inline-block mb-6 animate-fade-up">
          <GoldBadge icon={<Sparkles className="w-3.5 h-3.5" />}>
            Le Sommet de la Mobilité de Luxe
          </GoldBadge>
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight font-heading leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          Pilotez L'<span className="gold-gradient-text">Extraordinaire</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl text-[#B6B6B6] max-w-3xl mx-auto mb-10 font-normal leading-relaxed animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          Location voiture partout en Algérie – Alger, Oran, Constantine, Annaba et toutes les wilayas. Service fiable avec livraison nationale.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: '400ms' }}
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
        </div>

      </div>

      {/* Scroll Down Indicator — the float animates an inner element so its
          transform doesn't overwrite the -translate-x-1/2 centering. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#D4AF37]">
        <div className="animate-float-y">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
