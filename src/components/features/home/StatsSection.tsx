'use client';

import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlassCard } from '@/components/ui/GlassCard';
import { SiteStat } from '@/types';

interface StatsSectionProps {
  stats: SiteStat[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-16 bg-[#050505] border-y border-[rgba(212,175,55,0.15)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="text-center py-8">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix ?? undefined}
                suffix={stat.suffix ?? undefined}
                className="text-4xl sm:text-5xl font-extrabold gold-gradient-text"
              />
              <span className="block text-xs uppercase tracking-widest text-[#B6B6B6] font-semibold mt-2">
                {stat.label}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
