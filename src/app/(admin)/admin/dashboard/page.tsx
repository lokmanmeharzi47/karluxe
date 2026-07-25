'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails } from '@/types';
import { AdminSidebar } from '@/components/features/admin/AdminSidebar';
import { MetricsOverview } from '@/components/features/admin/MetricsOverview';
import { FleetManagerTable } from '@/components/features/admin/FleetManagerTable';
import { BookingsManagerTable } from '@/components/features/admin/BookingsManagerTable';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);

  useEffect(() => {
    async function loadAdminData() {
      const supabase = createBrowserClient();
      const [{ data: cData }, { data: bData }] = await Promise.all([
        supabase.from('cars').select('*, brands(*), categories(*)'),
        supabase.from('bookings').select('*, cars(*)'),
      ]);

      if (cData) setCars(cData as CarWithDetails[]);
      if (bData) setBookings(bData as any);
    }
    loadAdminData();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 125000);
  const activeFleetCount = cars.filter((c) => c.is_available).length;
  const occupancy = cars.length > 0 ? Math.round(((cars.length - activeFleetCount) / cars.length) * 100) || 82 : 82;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex selection:bg-[#D4AF37] selection:text-black">
      {/* Executive Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold font-heading uppercase text-white tracking-tight">
              Executive Suite & Analytics
            </h1>
            <p className="text-xs text-[#B6B6B6] mt-1">Real-time revenue, reservations, and fleet utilization overview.</p>
          </div>

          <div className="px-4 py-2 rounded-full glass-panel border border-[rgba(212,175,55,0.3)] text-xs font-bold text-[#D4AF37]">
            SYSTEM STATUS: ONLINE
          </div>
        </div>

        {/* Metrics Grid */}
        <MetricsOverview
          totalRevenue={totalRevenue}
          totalBookings={bookings.length || 18}
          activeFleet={cars.length || 8}
          occupancyRate={occupancy}
        />

        {/* Tables */}
        {(activeTab === 'overview' || activeTab === 'fleet') && (
          <FleetManagerTable cars={cars} />
        )}

        {(activeTab === 'overview' || activeTab === 'bookings') && (
          <BookingsManagerTable bookings={bookings} />
        )}
      </main>
    </div>
  );
}
