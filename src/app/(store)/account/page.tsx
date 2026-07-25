'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { Booking, CarWithDetails, Profile } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UserReservations } from '@/components/features/account/UserReservations';
import { UserWishlist } from '@/components/features/account/UserWishlist';
import { UserProfileEditor } from '@/components/features/account/UserProfileEditor';
import { Calendar, Heart, User, ShieldCheck } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'wishlist' | 'profile'>('reservations');
  const [bookings, setBookings] = useState<(Booking & { cars?: CarWithDetails | null })[]>([]);
  const [favorites, setFavorites] = useState<CarWithDetails[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

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
        // Fallback demo user bookings
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
          badge="VIP Membership Portal"
          title="Customer Dashboard"
          subtitle="Manage your supercar reservations, saved wishlist, and driver verification."
        />

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'reservations', label: 'My Reservations', icon: Calendar },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart },
            { id: 'profile', label: 'Profile Settings', icon: User },
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
