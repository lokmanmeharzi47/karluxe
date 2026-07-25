'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Plane, UserCheck, Crown, ShieldCheck, Headphones, Truck } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Plane,
      title: 'Airport VIP Delivery',
      description: 'Direct runway or private jet lounge delivery upon landing with instant key handover.',
    },
    {
      icon: UserCheck,
      title: 'Executive Chauffeur',
      description: 'Licensed multilingual chauffeurs trained in high-security executive transport.',
    },
    {
      icon: Crown,
      title: 'VIP Lifestyle Concierge',
      description: '24/7 access to exclusive hotel reservations, yacht charters, and private dining.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Excess Insurance',
      description: 'Comprehensive Platinum coverage with zero financial deposit liability.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Direct hotline to your personal fleet concierge anytime, anywhere.',
    },
    {
      icon: Truck,
      title: 'Doorstep Enclosed Delivery',
      description: 'Covered transport delivery directly to your villa, hotel, or estate.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="White-Glove Standards"
          title="Bespoke VIP Services"
          subtitle="Designed for discerning clientele who demand absolute perfection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlassCard key={index} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-[#D4AF37] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold uppercase font-heading text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#B6B6B6] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
