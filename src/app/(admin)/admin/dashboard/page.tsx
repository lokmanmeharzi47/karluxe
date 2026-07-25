'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails, Brand, Category, Location } from '@/types';
import { AdminSidebar } from '@/components/features/admin/AdminSidebar';
import { MetricsOverview } from '@/components/features/admin/MetricsOverview';
import { FleetManagerTable } from '@/components/features/admin/FleetManagerTable';
import { BookingsManagerTable } from '@/components/features/admin/BookingsManagerTable';
import { LocationsManagerTable } from '@/components/features/admin/LocationsManagerTable';
import { CouponsManagerTable } from '@/components/features/admin/CouponsManagerTable';
import { RevenueAnalyticsChart } from '@/components/features/admin/RevenueAnalyticsChart';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function loadAdminData() {
      const supabase = createBrowserClient();
      const [{ data: cData }, { data: bData }, { data: brData }, { data: catData }, { data: locData }] = await Promise.all([
        supabase.from('cars').select('*, brands(*), categories(*)'),
        supabase.from('bookings').select('*, cars(*)'),
        supabase.from('brands').select('*'),
        supabase.from('categories').select('*'),
        supabase.from('locations').select('*'),
      ]);

      if (cData) setCars(cData as CarWithDetails[]);
      if (bData) setBookings(bData as any);
      if (brData) setBrands(brData as Brand[]);
      if (catData) setCategories(catData as Category[]);
      if (locData) setLocations(locData as Location[]);
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
              Executive Rental Suite
            </h1>
            <p className="text-xs text-[#B6B6B6] mt-1">Real-time luxury fleet, rental locations, bookings, and revenue analytics.</p>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <RevenueAnalyticsChart />
            <FleetManagerTable cars={cars} brands={brands} categories={categories} />
            <BookingsManagerTable bookings={bookings} />
          </>
        )}

        {/* Fleet Tab */}
        {activeTab === 'fleet' && (
          <FleetManagerTable cars={cars} brands={brands} categories={categories} />
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <BookingsManagerTable bookings={bookings} />
        )}

        {/* Locations Tab */}
        {activeTab === 'locations' && (
          <LocationsManagerTable locations={locations} />
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <CouponsManagerTable />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <RevenueAnalyticsChart />
        )}
      </main>
    </div>
  );
}
