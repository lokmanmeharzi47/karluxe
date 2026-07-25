'use client';

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
          badge="Featured Fleet"
          title="The Crown Jewels"
          subtitle="Handcrafted performance, timeless prestige, and unmatched driving dynamics."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(0, 6).map((car) => (
            <FleetCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/fleet">
            <LuxuryButton variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              View Full Fleet Collection
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
