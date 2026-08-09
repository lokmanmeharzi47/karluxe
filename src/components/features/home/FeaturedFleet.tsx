import React from 'react';
import Link from 'next/link';
import { CarWithDetails } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FleetCard } from './FleetCard';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ArrowRight } from 'lucide-react';

interface FeaturedFleetProps {
  cars: CarWithDetails[];
}

export const FeaturedFleet: React.FC<FeaturedFleetProps> = ({ cars }) => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Flotte d'Exception"
          title="Supercars & Véhicules de Prestige"
          subtitle="Découvrez notre collection exclusive de véhicules de luxe récents préparés pour une expérience d'exception."
        />

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.slice(0, 6).map((car) => (
            <FleetCard key={car.id} car={car} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/fleet">
            <LuxuryButton variant="gold" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Voir Toute La Flotte VIP
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
