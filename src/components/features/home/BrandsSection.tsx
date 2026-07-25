'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BrandMarquee } from '@/components/ui/BrandMarquee';
import { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ brands }) => {
  return (
    <section className="py-20 bg-[#0A0A0A] border-t border-[rgba(212,175,55,0.15)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#D4AF37]">
          Elite Automotive Partners
        </span>
      </div>
      <BrandMarquee brands={brands} />
    </section>
  );
};
