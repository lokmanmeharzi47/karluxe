import React from 'react';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { CarWithDetails } from '@/types';
import { VehicleGallery } from '@/components/features/fleet/VehicleGallery';
import { VehicleSpecs } from '@/components/features/fleet/VehicleSpecs';
import { StickyBookingCard } from '@/components/features/fleet/StickyBookingCard';
import { VehicleReviews } from '@/components/features/fleet/VehicleReviews';
import { GoldBadge } from '@/components/ui/GoldBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createServerClient();

  const { data: carData } = await supabase
    .from('cars')
    .select('*, brands(*), categories(*), vehicle_images(*), vehicle_features(*), reviews(*)')
    .eq('slug', slug)
    .single();

  if (!carData) {
    notFound();
  }

  const car = carData as CarWithDetails;

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Header Info */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <GoldBadge>{car.brands?.name || 'Supercar'}</GoldBadge>
            <GoldBadge className="bg-white/5 border-white/10 text-white/80">
              {car.categories?.name || 'Luxury'}
            </GoldBadge>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading uppercase text-white tracking-tight">
            {car.title}
          </h1>
          <p className="text-sm sm:text-base text-[#B6B6B6] max-w-3xl leading-relaxed">
            {car.description}
          </p>
        </div>

        {/* Main Grid: Gallery/Specs vs Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <VehicleGallery
              images={car.vehicle_images?.map(img => ({ ...img, is_primary: img.is_primary ?? undefined })) || []}
              featuredImage={car.featured_image}
              title={car.title}
            />
            <VehicleSpecs car={car} />
            <VehicleReviews reviews={car.reviews || []} />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <StickyBookingCard car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}
