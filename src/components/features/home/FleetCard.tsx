'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Gauge, Flame, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import { CarWithDetails } from '@/types';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { GoldBadge } from '@/components/ui/GoldBadge';

interface FleetCardProps {
  car: CarWithDetails;
}

export const FleetCard: React.FC<FleetCardProps> = ({ car }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-3xl overflow-hidden glass-panel-hover flex flex-col group border border-[rgba(212,175,55,0.2)] bg-[#111111]/80"
    >
      {/* Vehicle Image Container */}
      <div className="relative h-64 overflow-hidden bg-black">
        <img
          src={car.featured_image}
          alt={car.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/40" />

        {/* Brand Badge */}
        <div className="absolute top-4 left-4 z-10">
          <GoldBadge>{car.brands?.name || 'Supercar'}</GoldBadge>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
          <CheckCircle2 className="w-3 h-3" /> Available
        </div>

        {/* Daily Rate Floating Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-xs uppercase text-[#B6B6B6] tracking-wider block font-semibold">Daily Rate</span>
          <span className="text-2xl font-extrabold font-heading text-white">
            €{car.daily_rate.toLocaleString()}
            <span className="text-xs font-normal text-[#B6B6B6]"> /day</span>
          </span>
        </div>
      </div>

      {/* Vehicle Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white group-hover:text-[#D4AF37] transition-colors">
            {car.title}
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-2 line-clamp-2 leading-relaxed">
            {car.description}
          </p>
        </div>

        {/* Specifications Metrics */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
          <div className="flex flex-col items-center">
            <Zap className="w-4 h-4 text-[#D4AF37] mb-1" />
            <span className="text-[10px] uppercase text-[#B6B6B6]">0-100 km/h</span>
            <span className="text-xs font-bold text-white mt-0.5">{car.acceleration}</span>
          </div>

          <div className="flex flex-col items-center border-x border-white/10">
            <Flame className="w-4 h-4 text-[#D4AF37] mb-1" />
            <span className="text-[10px] uppercase text-[#B6B6B6]">Horsepower</span>
            <span className="text-xs font-bold text-white mt-0.5">{car.horsepower} HP</span>
          </div>

          <div className="flex flex-col items-center">
            <Gauge className="w-4 h-4 text-[#D4AF37] mb-1" />
            <span className="text-[10px] uppercase text-[#B6B6B6]">Top Speed</span>
            <span className="text-xs font-bold text-white mt-0.5">{car.top_speed}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Link href={`/fleet/${car.slug}`} className="flex-1">
            <LuxuryButton variant="gold" size="sm" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
              Reserve Vehicle
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
