'use client';

import React, { useMemo } from 'react';
import { CarWithDetails } from '@/types';
import { useFilterStore } from '@/store/useFilterStore';
import { FleetCard } from '../home/FleetCard';
import { Car } from 'lucide-react';

interface FleetGridProps {
  cars: CarWithDetails[];
}

export const FleetGrid: React.FC<FleetGridProps> = ({ cars }) => {
  const { searchQuery, brandId, categoryId, maxPrice, transmission, sortBy } = useFilterStore();

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        if (searchQuery && !car.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        if (brandId && car.brand_id !== brandId) {
          return false;
        }
        if (categoryId && car.category_id !== categoryId) {
          return false;
        }
        if (car.daily_rate > maxPrice) {
          return false;
        }
        if (transmission && car.transmission !== transmission) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.daily_rate - b.daily_rate;
        if (sortBy === 'price-desc') return b.daily_rate - a.daily_rate;
        if (sortBy === 'newest') return b.year - a.year;
        return 0;
      });
  }, [cars, searchQuery, brandId, categoryId, maxPrice, transmission, sortBy]);

  if (filteredCars.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-[rgba(212,175,55,0.2)]">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
          <Car className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-heading text-white uppercase">No Vehicles Match Criteria</h3>
        <p className="text-sm text-[#B6B6B6] mt-2 max-w-md mx-auto">
          Try clearing your search filters or selecting all brands to view available luxury supercars.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-[#B6B6B6] uppercase tracking-wider font-semibold">
        <span>Showing {filteredCars.length} Luxury Vehicles</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCars.map((car) => (
          <FleetCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};
