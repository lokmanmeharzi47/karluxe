'use client';

import React, { useState } from 'react';
import { Location } from '@/types';
import { AddLocationModal } from './AddLocationModal';
import { MapPin, Plus, Plane, Building } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';

interface LocationsManagerTableProps {
  locations: Location[];
}

export const LocationsManagerTable: React.FC<LocationsManagerTableProps> = ({ locations }) => {
  const [locList, setLocList] = useState(locations);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D4AF37]" /> Rental Delivery Locations
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">Manage private jet heliports, airport hubs, and luxury hotel delivery points.</p>
        </div>

        <LuxuryButton variant="gold" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Add Delivery Location
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Location Name</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Country</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {locList.map((loc) => (
              <tr key={loc.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> {loc.name}
                </td>
                <td className="py-4 px-4 text-[#D4AF37] font-semibold">{loc.city}</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{loc.country}</td>
                <td className="py-4 px-4 text-white/80">{loc.address}</td>
                <td className="py-4 px-4">
                  {loc.is_airport ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30">
                      <Plane className="w-3 h-3" /> Airport / Runway
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                      <Building className="w-3 h-3" /> Heliport / Hub
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddLocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLocationAdded={(newLoc) => setLocList((prev) => [newLoc, ...prev])}
      />
    </div>
  );
};
