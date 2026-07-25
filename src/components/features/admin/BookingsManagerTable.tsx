'use client';

import React, { useState } from 'react';
import { Booking, CarWithDetails } from '@/types';
import { updateBookingStatusAction } from '@/app/actions/adminActions';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { UserCheck, Shield } from 'lucide-react';

interface BookingsManagerTableProps {
  bookings: (Booking & { cars?: CarWithDetails | null })[];
}

export const BookingsManagerTable: React.FC<BookingsManagerTableProps> = ({ bookings }) => {
  const [bookingList, setBookingList] = useState(bookings);
  const [agentAssignments, setAgentAssignments] = useState<Record<string, string>>({
    'demo-1': 'Agent Karim',
    'demo-2': 'Agent Yassine',
  });

  const { formatPrice } = useCurrencyStore();

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const res = await updateBookingStatusAction(bookingId, newStatus);
    if (res.success) {
      setBookingList((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
      );
    }
  };

  const handleAgentChange = (bookingId: string, agentName: string) => {
    setAgentAssignments((prev) => ({ ...prev, [bookingId]: agentName }));
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white">Gestion des Réservations VIP</h3>
        <span className="text-xs text-[#D4AF37] font-semibold bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" /> Notes & Agents Interne Admin
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Code VIP</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Supercar</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4">Prix Total</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-emerald-400">Agent Traitant (Privé Admin)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {bookingList.map((b) => (
              <tr key={b.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-[#D4AF37]">{b.booking_code}</td>
                <td className="py-4 px-4 font-bold text-white">
                  {b.customer_name}
                  <span className="block text-[10px] text-[#B6B6B6] font-normal">{b.customer_phone}</span>
                </td>
                <td className="py-4 px-4 text-white font-semibold">{b.cars?.title || 'Supercar'}</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{b.pickup_date} → {b.dropoff_date}</td>
                <td className="py-4 px-4 font-bold text-[#D4AF37]">{formatPrice(b.total_price)}</td>
                <td className="py-4 px-4">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-lg py-1.5 px-2 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="active">En cours de location</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </td>
                {/* Agent Responsible Field (For Admin eyes only) */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Nom de l'agent (ex: Agent Karim)"
                      value={agentAssignments[b.id] || 'Agent Concierge'}
                      onChange={(e) => handleAgentChange(b.id, e.target.value)}
                      className="bg-[#050505] border border-emerald-500/30 rounded-lg py-1 px-2 text-xs font-semibold text-emerald-300 focus:outline-none focus:border-emerald-400 w-44"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
