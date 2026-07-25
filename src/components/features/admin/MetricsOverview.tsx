'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { DollarSign, Calendar, Car, TrendingUp } from 'lucide-react';

interface MetricsOverviewProps {
  totalRevenue: number;
  totalBookings: number;
  activeFleet: number;
  occupancyRate: number;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  totalRevenue,
  totalBookings,
  activeFleet,
  occupancyRate,
}) => {
  const metrics = [
    { label: 'Gross Revenue', value: totalRevenue, prefix: '€', icon: DollarSign },
    { label: 'Total Reservations', value: totalBookings, icon: Calendar },
    { label: 'Active Fleet Vehicles', value: activeFleet, icon: Car },
    { label: 'Fleet Occupancy Rate', value: occupancyRate, suffix: '%', icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, index) => {
        const Icon = m.icon;
        return (
          <GlassCard key={index} className="p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase text-[#B6B6B6] font-semibold">{m.label}</span>
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <AnimatedCounter
              value={m.value}
              prefix={m.prefix}
              suffix={m.suffix}
              className="text-3xl font-extrabold font-heading text-white"
            />
          </GlassCard>
        );
      })}
    </div>
  );
};
