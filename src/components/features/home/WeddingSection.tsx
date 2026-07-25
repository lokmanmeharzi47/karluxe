'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GoldBadge } from '@/components/ui/GoldBadge';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Heart, ArrowRight } from 'lucide-react';

export const WeddingSection: React.FC = () => {
  return (
    <section id="wedding" className="py-24 bg-[#0A0A0A] border-t border-[rgba(212,175,55,0.15)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <GoldBadge icon={<Heart className="w-3.5 h-3.5" />}>
              Special Occasions
            </GoldBadge>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase tracking-tight text-white leading-tight">
              Unforgettable <span className="gold-gradient-text">Wedding Experience</span>
            </h2>

            <p className="text-base text-[#B6B6B6] leading-relaxed">
              Arrive at your dream ceremony in ultimate splendor. From pristine white Rolls-Royce Phantoms with silk interior accents to vintage convertible classic cars and uniformed chauffeur processionals.
            </p>

            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Floral Arrangement & Red Carpet Arrival Service
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Champagne Toast Package with Chrystal Flutes
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                Dedicated Event Logistics Coordination Manager
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/booking">
                <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Book Wedding Processional
                </LuxuryButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[480px] rounded-3xl overflow-hidden glass-panel border border-[rgba(212,175,55,0.3)] shadow-[0_0_50px_rgba(212,175,55,0.15)]"
          >
            <img
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Wedding Car"
              className="w-full h-full object-cover object-center filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
