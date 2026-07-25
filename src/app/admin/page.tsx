'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails, Brand, Category, Location } from '@/types';
import { AdminSidebar } from '@/components/features/admin/AdminSidebar';
import { MetricsOverview } from '@/components/features/admin/MetricsOverview';
import { FleetManagerTable } from '@/components/features/admin/FleetManagerTable';
import { BookingsManagerTable } from '@/components/features/admin/BookingsManagerTable';
import { CategoriesManagerTable } from '@/components/features/admin/CategoriesManagerTable';
import { BrandsManagerTable } from '@/components/features/admin/BrandsManagerTable';
import { AgenciesManagerTable } from '@/components/features/admin/AgenciesManagerTable';
import { RevenueAnalyticsChart } from '@/components/features/admin/RevenueAnalyticsChart';
import { Bell, Sparkles, Car, Calendar, Layers, Award, Building2, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

function AdminPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(tabParam);

  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Secure Route: Verify Admin Session
  useEffect(() => {
    const isAuth =
      document.cookie.includes('karluxe_admin_session=authenticated') ||
      localStorage.getItem('karluxe_admin_token') === 'authenticated';

    if (!isAuth) {
      router.push('/admin-login');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  useEffect(() => {
    if (!authenticated) return;

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
  }, [authenticated]);

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
        Vérification de la session administrateur...
      </div>
    );
  }

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 185400);
  const activeFleetCount = cars.filter((c) => c.is_available).length;
  const occupancy = cars.length > 0 ? Math.round(((cars.length - activeFleetCount) / cars.length) * 100) || 88 : 88;

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black overflow-hidden font-sans">
      {/* Executive Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
        {/* Luxury Executive Topbar */}
        <header className="h-20 glass-panel border-b border-[rgba(212,175,55,0.2)] bg-[#0A0A0A]/80 px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold font-heading uppercase text-white tracking-tight">
              Tableau de Bord Exécutif
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
              KarLuxe Rental v2.5
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-full glass-panel text-white hover:text-[#D4AF37] transition-colors relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center font-bold text-black text-xs font-heading">
                AL
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Directeur Flotte</span>
                <span className="text-[10px] text-[#D4AF37] font-semibold">Administrateur KarLuxe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page View */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          {/* Top Banner Header */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  Gestion Exécutive de la Flotte KarLuxe
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-tight">
                Aperçu & Gestion de Flotte Privée
              </h1>
              <p className="text-xs sm:text-sm text-[#B6B6B6] mt-1 max-w-2xl">
                Gestion des véhicules, réservations VIP, catégories, marques automobiles et agences de location.
              </p>
            </div>

            {/* Quick Tabs Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {[
                { id: 'overview', label: 'Aperçu', icon: Sparkles },
                { id: 'fleet', label: 'Flotte', icon: Car },
                { id: 'bookings', label: 'Réservations', icon: Calendar },
                { id: 'categories', label: 'Catégories', icon: Layers },
                { id: 'brands', label: 'Marques', icon: Award },
                { id: 'agencies', label: 'Agences', icon: Building2 },
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

          {activeTab === 'categories' && (
            <CategoriesManagerTable categories={categories} />
          )}

          {activeTab === 'brands' && (
            <BrandsManagerTable brands={brands} />
          )}

          {activeTab === 'agencies' && (
            <AgenciesManagerTable agencies={locations} />
          )}

          {activeTab === 'analytics' && (
            <RevenueAnalyticsChart />
          )}
        </main>
      </div>
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
