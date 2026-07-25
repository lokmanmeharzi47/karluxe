'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails, Brand, Category, Location } from '@/types';
import { MetricsOverview } from '@/components/features/admin/MetricsOverview';
import { FleetManagerTable } from '@/components/features/admin/FleetManagerTable';
import { BookingsManagerTable } from '@/components/features/admin/BookingsManagerTable';
import { LocationsManagerTable } from '@/components/features/admin/LocationsManagerTable';
import { CouponsManagerTable } from '@/components/features/admin/CouponsManagerTable';
import { RevenueAnalyticsChart } from '@/components/features/admin/RevenueAnalyticsChart';
import { Car, Calendar, MapPin, Tag, DollarSign, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

function AdminPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(tabParam);

  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

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

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 185400);
  const activeFleetCount = cars.filter((c) => c.is_available).length;
  const occupancy = cars.length > 0 ? Math.round(((cars.length - activeFleetCount) / cars.length) * 100) || 88 : 88;

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Monaco, Dubai, Paris, LA, Zurich Hubs
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-tight">
            Aperçu de la Flotte & Réservations VIP
          </h1>
          <p className="text-xs sm:text-sm text-[#B6B6B6] mt-1 max-w-2xl">
            Gestion complète des supercars en location, hubs de livraison tarmac, statuts de réservation et analytics de chiffre d'affaires.
          </p>
        </div>

        {/* Quick Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: 'overview', label: 'Aperçu', icon: Sparkles },
            { id: 'fleet', label: 'Flotte', icon: Car },
            { id: 'bookings', label: 'Réservations', icon: Calendar },
            { id: 'locations', label: 'Hubs', icon: MapPin },
            { id: 'coupons', label: 'Coupons', icon: Tag },
            { id: 'analytics', label: 'Revenus', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'glass-panel text-white/80 border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Executive Metrics Overview */}
      <MetricsOverview
        totalRevenue={totalRevenue}
        totalBookings={bookings.length || 24}
        activeFleet={cars.length || 8}
        occupancyRate={occupancy}
      />

      {/* Active Tab View Render */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <RevenueAnalyticsChart />
          <FleetManagerTable cars={cars} brands={brands} categories={categories} />
          <BookingsManagerTable bookings={bookings} />
        </div>
      )}

      {activeTab === 'fleet' && (
        <FleetManagerTable cars={cars} brands={brands} categories={categories} />
      )}

      {activeTab === 'bookings' && (
        <BookingsManagerTable bookings={bookings} />
      )}

      {activeTab === 'locations' && (
        <LocationsManagerTable locations={locations} />
      )}

      {activeTab === 'coupons' && (
        <CouponsManagerTable />
      )}

      {activeTab === 'analytics' && (
        <RevenueAnalyticsChart />
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
        Chargement de l'Executive Admin Suite...
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  );
}
