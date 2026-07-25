'use client';

import React, { useState } from 'react';
import { Booking, CarWithDetails } from '@/types';
import { updateBookingStatusAction } from '@/app/actions/adminActions';

interface BookingsManagerTableProps {
  bookings: (Booking & { cars?: CarWithDetails | null })[];
}

export const BookingsManagerTable: React.FC<BookingsManagerTableProps> = ({ bookings }) => {
  const [bookingList, setBookingList] = useState(bookings);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const res = await updateBookingStatusAction(bookingId, newStatus);
    if (res.success) {
      setBookingList((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
      );
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <h3 className="text-xl font-bold font-heading uppercase text-white">Active Reservations Manager</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {bookingList.map((b) => (
              <tr key={b.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-[#D4AF37]">{b.booking_code}</td>
                <td className="py-4 px-4 font-bold text-white">
                  {b.customer_name}
                  <span className="block text-[10px] text-[#B6B6B6] font-normal">{b.customer_email}</span>
                </td>
                <td className="py-4 px-4 text-white font-semibold">{b.cars?.title || 'Supercar'}</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{b.pickup_date} → {b.dropoff_date}</td>
                <td className="py-4 px-4 font-bold text-[#D4AF37]">€{b.total_price.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="bg-[#050505] border border-white/10 rounded-lg py-1 px-2 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="active">Active Rental</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
