'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Check, User, Plane, Sparkles, Shield } from 'lucide-react';

export const StepExtras: React.FC = () => {
  const { selectedExtras, toggleExtra } = useBookingStore();
  const { formatPrice } = useCurrencyStore();

  const extras = [
    {
      title: 'Executive Chauffeur Service',
      priceAmount: 600,
      description: 'Multilingual licensed security-trained driver.',
      icon: User,
    },
    {
      title: 'Tarmac Private Jet Delivery',
      priceAmount: 250,
      description: 'Direct tarmac transfer upon flight touchdown.',
      icon: Plane,
    },
    {
      title: 'Child Safety Luxury Seat',
      priceAmount: 50,
      description: 'Hand-sewn leather ISOFIX child safety seat.',
      icon: Shield,
    },
    {
      title: 'Unlimited Kilometers Package',
      priceAmount: 300,
      description: 'Drive without daily mileage restrictions.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 5: Select VIP Extras & Services
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {extras.map((extra) => {
          const Icon = extra.icon;
          const isSelected = selectedExtras.includes(extra.title);
          return (
            <div
              key={extra.title}
              onClick={() => toggleExtra(extra.title)}
              className={`glass-panel rounded-3xl p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                isSelected
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'border-white/10 hover:border-white/30 bg-[#111111]/80'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-heading text-white">{extra.title}</h4>
                  <span className="text-xs font-bold text-[#D4AF37]">
                    {formatPrice(extra.priceAmount)}/day
                  </span>
                </div>
                <p className="text-xs text-[#B6B6B6] mt-1">{extra.description}</p>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                  isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/20'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
