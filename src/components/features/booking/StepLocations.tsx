'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { MapPin } from 'lucide-react';

export const StepLocations: React.FC = () => {
  const { pickupLocation, dropoffLocation, setLocations } = useBookingStore();

  const locations = [
    'Monaco VIP Heliport Hub',
    'Dubai DXB VIP Terminal 3',
    'Paris CDG Private Lounge',
    'LAX Private Jet Lounge',
    'Zurich Helipad & Airport',
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 3: Select Delivery Locations
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Pick-Up Location
          </label>
          <select
            value={pickupLocation}
            onChange={(e) => setLocations(e.target.value, dropoffLocation)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Return Location
          </label>
          <select
            value={dropoffLocation}
            onChange={(e) => setLocations(pickupLocation, e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
