'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-[rgba(212,175,55,0.15)] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=2000&q=80"
          alt="Ferrari Stradale"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-10 sm:p-16 border border-[rgba(212,175,55,0.3)] shadow-[0_0_80px_rgba(212,175,55,0.15)] max-w-4xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold block mb-4">
            Exclusive Reservations
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight mb-6">
            Book Your <span className="gold-gradient-text">Luxury Experience</span>
          </h2>

          <p className="text-base text-[#B6B6B6] max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevate your journey today. Instant confirmation with white-glove concierge tarmac delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking">
              <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Reserve Your Supercar
              </LuxuryButton>
            </Link>
            <Link href="/fleet">
              <LuxuryButton variant="glass" size="lg" icon={<ShieldCheck className="w-5 h-5" />}>
                View All Vehicles
              </LuxuryButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
