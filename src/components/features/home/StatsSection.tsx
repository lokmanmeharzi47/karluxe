'use client';

import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlassCard } from '@/components/ui/GlassCard';

export const StatsSection: React.FC = () => {
  const stats = [
    { value: 50, prefix: '€', suffix: 'M+', label: 'Fleet Valuation' },
    { value: 100, suffix: '%', label: 'Satisfied VIP Clients' },
    { value: 24, suffix: '/7', label: 'Dedicated Concierge' },
    { value: 5, suffix: ' Global', label: 'Executive Hubs' },
  ];

  return (
    <section className="py-16 bg-[#050505] border-y border-[rgba(212,175,55,0.15)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="text-center py-8">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
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
