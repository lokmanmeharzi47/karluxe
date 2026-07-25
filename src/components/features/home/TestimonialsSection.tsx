'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Star, ShieldCheck } from 'lucide-react';
import { Review } from '@/types';

interface TestimonialsSectionProps {
  reviews: Review[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  return (
    <section id="testimonials" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Endorsements"
          title="What VIP Clients Say"
          subtitle="Real reviews from world leaders, executives, and high-net-worth drivers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <GlassCard key={review.id} className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-sm text-white/90 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-bold uppercase font-heading text-white">
                    {review.author_name}
                  </h4>
                  <span className="text-[10px] text-[#B6B6B6] uppercase tracking-wider block">
                    Verified VIP Member
                  </span>
                </div>
                {review.is_verified && (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Verified
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
