'use client';

import React from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { ShieldCheck, Check } from 'lucide-react';

export const StepInsurance: React.FC = () => {
  const { insuranceTier, setInsuranceTier } = useBookingStore();
  const { formatPrice } = useCurrencyStore();

  const tiers = [
    {
      name: 'Standard',
      price: 'Included',
      deposit: 5000,
      features: ['Standard Comprehensive Risk', 'Roadside Assistance', '24/7 Hotline'],
    },
    {
      name: 'Premium VIP',
      price: 150,
      deposit: 2500,
      features: ['Reduced Security Deposit', 'Tire & Glass Coverage', 'Replacement Supercar'],
    },
    {
      name: 'Zero Excess Platinum',
      price: 350,
      deposit: 0,
      features: ['Zero Excess Financial Liability', 'Full Tarmac Protection', 'Personal Concierge'],
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 4: Select Protection Tier
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const isSelected = insuranceTier === tier.name;
          return (
            <div
              key={tier.name}
              onClick={() => setInsuranceTier(tier.name as any)}
              className={`glass-panel rounded-3xl p-6 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                  : 'border-white/10 hover:border-white/30 bg-[#111111]/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <ShieldCheck className={`w-6 h-6 ${isSelected ? 'text-[#D4AF37]' : 'text-[#B6B6B6]'}`} />
                  <span className="text-xs font-bold text-[#D4AF37]">
                    {tier.price === 'Included' ? 'Included' : `+${formatPrice(tier.price as number)}/day`}
                  </span>
                </div>
                <h4 className="text-lg font-bold font-heading text-white">{tier.name}</h4>
                <span className="text-xs text-[#B6B6B6] block mt-1">
                  {tier.deposit === 0 ? 'No Deposit (Waived)' : `${formatPrice(tier.deposit as number)} Deposit`}
                </span>

                <ul className="space-y-2 mt-4 pt-4 border-t border-white/10 text-xs text-white/90">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 text-center border-t border-white/10">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#D4AF37]' : 'text-[#B6B6B6]'}`}>
                  {isSelected ? 'Selected Plan' : 'Select Plan'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
