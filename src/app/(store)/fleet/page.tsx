import React from 'react';
import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { CarWithDetails, Brand, Category } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FleetFilters } from '@/components/features/fleet/FleetFilters';
import { FleetGrid } from '@/components/features/fleet/FleetGrid';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Notre Flotte de Supercars',
  description: "Découvrez notre flotte de voitures de luxe : Ferrari, Porsche, Lamborghini, Rolls-Royce et Mercedes-Maybach. Filtrez par marque, catégorie et tarif pour trouver votre supercar idéale en Algérie.",
};

export default async function FleetPage() {
  const supabase = await createServerClient();

  const [{ data: cars }, { data: brands }, { data: categories }] = await Promise.all([
    supabase.from('cars').select('*, brands(*), categories(*)').order('created_at', { ascending: false }),
    supabase.from('brands').select('*').order('name'),
    supabase.from('categories').select('*').order('name'),
  ]);

  const carList = (cars as CarWithDetails[]) || [];
  const brandList = (brands as Brand[]) || [];
  const categoryList = (categories as Category[]) || [];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Flotte d'Exception"
          title="La Collection Suprême"
          subtitle="Filtrez et sélectionnez votre supercar idéale pour une livraison à Alger, Oran, Monaco, Dubaï ou Paris."
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-28">
            <FleetFilters brands={brandList} categories={categoryList} />
          </div>

          <div className="lg:col-span-3">
            <FleetGrid cars={carList} />
          </div>
        </div>
      </div>
    </div>
  );
}
