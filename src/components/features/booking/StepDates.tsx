'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Calendar, Clock, Coins } from 'lucide-react';

export const StepDates: React.FC = () => {
  const { pickupDate, dropoffDate, setDates, selectedCar } = useBookingStore();
  const { formatPrice } = useCurrencyStore();

  const todayStr = new Date().toISOString().split('T')[0];

  const calculateDays = () => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(dropoffDate).getTime();
    const diff = (end - start) / (1000 * 3600 * 24);
    return Math.max(1, Math.round(diff) || 1);
  };

  const handlePickupChange = (newPickup: string) => {
    let newDropoff = dropoffDate;
    if (newDropoff <= newPickup) {
      const nextDay = new Date(new Date(newPickup).getTime() + 24 * 60 * 60 * 1000);
      newDropoff = nextDay.toISOString().split('T')[0];
    }
    setDates(newPickup, newDropoff);
  };

  const handleDropoffChange = (newDropoff: string) => {
    if (newDropoff <= pickupDate) {
      return;
    }
    setDates(pickupDate, newDropoff);
  };

  const days = calculateDays();
  const dailyRate = selectedCar?.daily_rate || 2500;
  const estimatedTotal = dailyRate * days;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white">
            Étape 2: Choisir les Dates de Location
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">
            Sélectionnez vos dates de prise en charge et de restitution du véhicule.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] text-xs font-bold text-[#D4AF37]">
          <Clock className="w-3.5 h-3.5" /> Durée: {days} {days === 1 ? 'Jour' : 'Jours'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 bg-[#050505]/60">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Date de Début (Prise en charge)
          </label>
          <input
            type="date"
            min={todayStr}
            value={pickupDate}
            onChange={(e) => handlePickupChange(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 bg-[#050505]/60">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Date de Fin (Restitution)
          </label>
          <input
            type="date"
            min={pickupDate || todayStr}
            value={dropoffDate}
            onChange={(e) => handleDropoffChange(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Dynamic Rental Price Calculation Box */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#B6B6B6] uppercase tracking-wider font-semibold block">Rental Estimate</span>
            <span className="text-xs text-white font-medium">
              {formatPrice(dailyRate)} x {days} {days === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold font-heading text-[#D4AF37]">{formatPrice(estimatedTotal)}</span>
        </div>
      </div>
    </div>
  );
};
