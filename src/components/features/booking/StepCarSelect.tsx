'use client';

import React from 'react';
import { Image } from '@imagekit/next';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { CarWithDetails } from '@/types';
import { Check } from 'lucide-react';

interface StepCarSelectProps {
  cars: CarWithDetails[];
}

export const StepCarSelect: React.FC<StepCarSelectProps> = ({ cars }) => {
  const { selectedCar, setSelectedCar, nextStep } = useBookingStore();
  const { formatPrice } = useCurrencyStore();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 1: Select Your Supercar
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cars.map((car) => {
          const isSelected = selectedCar?.id === car.id;
          return (
            <div
              key={car.id}
              onClick={() => {
                setSelectedCar(car);
              }}
              className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all flex items-center gap-4 ${
                isSelected
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                  : 'border-white/10 hover:border-white/30 bg-[#111111]/80'
              }`}
            >
              <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={car.featured_image}
                  alt={car.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold font-heading text-white">{car.title}</h4>
                <span className="text-xs text-[#D4AF37] font-semibold">{formatPrice(car.daily_rate)}/day</span>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/20'
                }`}
              >
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
