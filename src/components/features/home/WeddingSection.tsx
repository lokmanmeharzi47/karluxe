'use client';

import React from 'react';
import Link from 'next/link';
import { Image } from '@imagekit/next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Heart, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { MarketingSection } from '@/types';

interface WeddingSectionProps {
  data: MarketingSection | null;
}

export const WeddingSection: React.FC<WeddingSectionProps> = ({ data }) => {
  if (!data) return null;

  // Use type assertion for bullets since it's JSON in DB
  const bullets = (data.bullets as string[]) || [];

  return (
    <section id="wedding" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 items-center">
            <div className="space-y-6">
              {data.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" /> {data.badge}
                </div>
              )}

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading uppercase text-white tracking-tight leading-tight">
                {data.title} <span className="gold-gradient-text">{data.highlighted_title}</span>
              </h2>

              <p className="text-sm text-[#B6B6B6] leading-relaxed">
                {data.description}
              </p>

              {bullets.length > 0 && (
                <ul className="space-y-3 text-xs text-white font-medium">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" /> {bullet}
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-4">
                <Link href={data.button_link || '#'}>
                  <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    {data.button_text}
                  </LuxuryButton>
                </Link>
              </div>
            </div>

            {data.image_url && (
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={data.image_url}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
