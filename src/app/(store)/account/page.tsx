'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails, Profile } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UserReservations } from '@/components/features/account/UserReservations';
import { UserWishlist } from '@/components/features/account/UserWishlist';
import { UserProfileEditor } from '@/components/features/account/UserProfileEditor';
import { Calendar, Heart, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

function AccountPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as 'reservations' | 'wishlist' | 'profile' | null;

  const [activeTab, setActiveTab] = useState<'reservations' | 'wishlist' | 'profile'>(tabParam || 'reservations');
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);
  const [favorites, setFavorites] = useState<CarWithDetails[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    async function loadUserData() {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [{ data: prof }, { data: bks }, { data: favs }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('bookings').select('*, cars(*)').eq('user_id', user.id),
          supabase.from('favorites').select('cars(*)').eq('user_id', user.id),
        ]);

        if (prof) setProfile(prof as Profile);
        if (bks) setBookings(bks as any);
        if (favs) setFavorites(favs.map((f: any) => f.cars).filter(Boolean));
      } else {
        const { data: demoBookings } = await supabase.from('bookings').select('*, cars(*)');
        if (demoBookings) setBookings(demoBookings as any);
      }
    }

    loadUserData();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portail Membre VIP"
          title="Mon Espace Client"
          subtitle="Gérez vos réservations de supercars, votre liste de favoris et vos coordonnées."
        />

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'reservations', label: 'Mes Réservations', icon: Calendar },
            { id: 'wishlist', label: 'Mes Favoris', icon: Heart },
            { id: 'profile', label: 'Mon Profil & Permis', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'glass-panel text-white/80 border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'reservations' && <UserReservations bookings={bookings} />}
          {activeTab === 'wishlist' && <UserWishlist favorites={favorites} />}
          {activeTab === 'profile' && <UserProfileEditor profile={profile} />}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
        Chargement de l'Espace Client...
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  );
}
