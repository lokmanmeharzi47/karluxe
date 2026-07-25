'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Plane, UserCheck, ConciergeBell, ShieldCheck, Clock, Truck } from 'lucide-react';
import { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
}

const IconMap: Record<string, React.ElementType> = {
  Plane,
  UserCheck,
  ConciergeBell,
  ShieldCheck,
  Clock,
  Truck,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section id="services" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Services d'Exception"
          title="Expérience Concierge Sur-Mesure"
          subtitle="Une gamme complète de prestations haut de gamme adaptées aux exigences de notre clientèle VIP."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, index) => {
            const Icon = s.icon && IconMap[s.icon] ? IconMap[s.icon] : Plane; // Fallback to Plane
            return (
              <GlassCard key={s.id || index} className="p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/80 hover:border-[#D4AF37]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center mb-6 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading uppercase text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-xs text-[#B6B6B6] leading-relaxed">
                  {s.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
