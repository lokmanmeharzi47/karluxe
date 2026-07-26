'use client';

import React from 'react';
import { CarWithDetails } from '@/types';
import { Shield, Users, CheckCircle2, CalendarDays, MapPin } from 'lucide-react';

interface VehicleSpecsProps {
  car: CarWithDetails;
}

export const VehicleSpecs: React.FC<VehicleSpecsProps> = ({ car }) => {
  const specs = [
    { icon: Shield, label: 'Transmission', value: car.transmission },
    { icon: Users, label: 'Capacité', value: `${car.seats} Places` },
    { icon: CalendarDays, label: 'Année Modèle', value: car.year.toString() },
    { icon: MapPin, label: 'Agence', value: car.location },
  ];

  return (
    <div className="space-y-8">
      {/* Essentials Grid */}
      <div className="glass-panel rounded-3xl p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90">
        <h3 className="text-xl font-bold font-heading uppercase text-white mb-6">
          Informations Clés
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <Icon className="w-5 h-5 text-[#D4AF37]" />
                <span className="block text-[10px] uppercase tracking-wider text-[#B6B6B6] font-semibold">
                  {spec.label}
                </span>
                <span className="text-sm font-bold text-white block">
                  {spec.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features List */}
      {car.vehicle_features && car.vehicle_features.length > 0 && (
        <div className="glass-panel rounded-3xl p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90">
          <h3 className="text-xl font-bold font-heading uppercase text-white mb-6">
            Équipements & Services
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {car.vehicle_features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-semibold text-white/90">{feature.feature_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
