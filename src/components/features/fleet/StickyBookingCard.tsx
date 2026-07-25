'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CarWithDetails } from '@/types';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Calendar, MapPin, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface StickyBookingCardProps {
  car: CarWithDetails;
}

export const StickyBookingCard: React.FC<StickyBookingCardProps> = ({ car }) => {
  const [days, setDays] = useState(3);
  const { formatPrice } = useCurrencyStore();
  const totalAmount = car.daily_rate * days;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.3)] bg-[#111111]/95 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] sticky top-28">
      {/* Price Header */}
      <div className="pb-4 border-b border-white/10">
        <span className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">Daily Rate</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-heading text-white">{formatPrice(car.daily_rate)}</span>
          <span className="text-xs text-[#B6B6B6]">/ day</span>
        </div>
      </div>

      {/* Booking Form Inputs */}
      <div className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Rental Duration (Days)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Pick-Up Location
          </label>
          <select className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]">
            <option>Monaco VIP Heliport Hub</option>
            <option>Dubai DXB VIP Terminal</option>
            <option>Paris CDG Lounge</option>
            <option>LAX Private Jet Lounge</option>
            <option>Zurich Helipad</option>
          </select>
        </div>
      </div>

      {/* Itemized Price Summary */}
      <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#B6B6B6]">
        <div className="flex justify-between">
          <span>Rental ({days} days)</span>
          <span className="text-white font-semibold">{formatPrice(totalAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Security Deposit</span>
          <span className="text-white font-semibold">{formatPrice(car.security_deposit)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-[#D4AF37]">
          <span>Estimated Total</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
      </div>

      {/* Features Bullet list */}
      <ul className="space-y-2 text-[11px] text-[#B6B6B6]">
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Free Cancellation up to 48 Hours
        </li>
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> White-Glove Runway / Hotel Delivery
        </li>
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Comprehensive Insurance Included
        </li>
      </ul>

      {/* CTA Button */}
      <Link href={`/booking?carId=${car.id}&days=${days}`} className="block">
        <LuxuryButton variant="gold" size="lg" className="w-full" icon={<ArrowRight className="w-5 h-5" />}>
          Reserve Vehicle Now
        </LuxuryButton>
      </Link>
    </div>
  );
};
