'use client';

import React, { useState } from 'react';
import { CarWithDetails } from '@/types';
import { toggleCarAvailabilityAction } from '@/app/actions/adminActions';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface FleetManagerTableProps {
  cars: CarWithDetails[];
}

export const FleetManagerTable: React.FC<FleetManagerTableProps> = ({ cars }) => {
  const [carList, setCarList] = useState(cars);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggle = async (carId: string, currentStatus: boolean) => {
    setLoadingId(carId);
    const newStatus = !currentStatus;
    const res = await toggleCarAvailabilityAction(carId, newStatus);
    setLoadingId(null);

    if (res.success) {
      setCarList((prev) =>
        prev.map((c) => (c.id === carId ? { ...c, is_available: newStatus } : c))
      );
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <h3 className="text-xl font-bold font-heading uppercase text-white">Fleet Availability Management</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Supercar</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Daily Rate</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {carList.map((car) => (
              <tr key={car.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                  <img src={car.featured_image} alt={car.title} className="w-12 h-9 rounded-lg object-cover" />
                  {car.title}
                </td>
                <td className="py-4 px-4 text-[#D4AF37] font-semibold">{car.brands?.name}</td>
                <td className="py-4 px-4 font-bold text-white">€{car.daily_rate}/day</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{car.location}</td>
                <td className="py-4 px-4">
                  {car.is_available ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                      <XCircle className="w-3 h-3" /> In Maintenance
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    disabled={loadingId === car.id}
                    onClick={() => handleToggle(car.id, car.is_available)}
                    className="px-3 py-1.5 rounded-xl border border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {loadingId === car.id ? 'Updating...' : car.is_available ? 'Set Maintenance' : 'Set Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
