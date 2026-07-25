'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Calendar, Clock, Coins } from 'lucide-react';

export const StepDates: React.FC = () => {
  const { pickupDate, dropoffDate, setDates, selectedCar } = useBookingStore();
  const { formatPrice } = useCurrencyStore();

  const calculateDays = () => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(dropoffDate).getTime();
    const diff = (end - start) / (1000 * 3600 * 24);
    return Math.max(1, Math.round(diff) || 1);
  };

  const days = calculateDays();
  const dailyRate = selectedCar?.daily_rate || 2500;
  const estimatedTotal = dailyRate * days;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white">
            Step 2: Choose Rental Dates
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">
            Select your preferred pick-up and drop-off dates for your supercar rental.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] text-xs font-bold text-[#D4AF37]">
          <Clock className="w-3.5 h-3.5" /> Duration: {days} {days === 1 ? 'Day' : 'Days'}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 bg-[#050505]/60">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Pick-Up Date
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setDates(e.target.value, dropoffDate)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3 bg-[#050505]/60">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Drop-Off Date
          </label>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDates(pickupDate, e.target.value)}
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
