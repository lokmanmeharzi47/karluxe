'use client';

import React from 'react';
import { Booking, CarWithDetails } from '@/types';
import { Calendar, MapPin, ShieldCheck, Tag } from 'lucide-react';
import { GoldBadge } from '@/components/ui/GoldBadge';

interface UserReservationsProps {
  bookings: (Booking & { cars?: CarWithDetails | null })[];
}

export const UserReservations: React.FC<UserReservationsProps> = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center border border-white/10">
        <h3 className="text-lg font-bold font-heading uppercase text-white">No Active Reservations</h3>
        <p className="text-xs text-[#B6B6B6] mt-2">
          Your upcoming luxury supercar bookings will appear here once reserved.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 flex flex-col md:flex-row gap-6 items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {b.cars?.featured_image && (
              <img
                src={b.cars.featured_image}
                alt={b.cars.title}
                className="w-28 h-20 rounded-2xl object-cover"
              />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GoldBadge className="text-[9px] py-0.5">{b.booking_code}</GoldBadge>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {b.status}
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-white">{b.cars?.title || 'Supercar Rental'}</h4>
              <div className="flex items-center gap-4 text-xs text-[#B6B6B6] mt-1">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {b.pickup_date} to {b.dropoff_date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {b.pickup_location}</span>
              </div>
            </div>
          </div>

          <div className="text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <span className="text-[10px] uppercase text-[#B6B6B6] block">Total Amount</span>
            <span className="text-xl font-bold font-heading text-[#D4AF37]">€{b.total_price.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
