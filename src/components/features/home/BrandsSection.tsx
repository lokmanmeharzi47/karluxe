'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ brands }) => {
  return (
    <section className="relative py-28 bg-[#060606] overflow-hidden">
      {/* Subtle radial glow behind the section */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.25)] to-transparent" />

      {/* Heading */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="text-[11px] uppercase tracking-[0.4em] font-semibold text-[#D4AF37]/80 block mb-4">
          Elite Automotive Partners
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/90">
          Nos Marques Partenaires
        </h2>
        <div className="mt-5 mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <BrandMarquee brands={brands} />
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.25)] to-transparent" />
    </section>
  );
};
