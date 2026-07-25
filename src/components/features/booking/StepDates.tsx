'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { Calendar } from 'lucide-react';

export const StepDates: React.FC = () => {
  const { pickupDate, dropoffDate, setDates } = useBookingStore();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 2: Choose Rental Dates
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
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

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
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
    </div>
  );
};
