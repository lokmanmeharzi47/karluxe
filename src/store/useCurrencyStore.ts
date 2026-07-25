'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'EUR' | 'DZD' | 'USD';

interface CurrencyStore {
  currency: Currency;
  rates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInEur: number) => string;
  convertPrice: (amountInEur: number, targetCurrency?: Currency) => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'EUR',
      // Conversion rates relative to 1 EUR
      rates: {
        EUR: 1,
        DZD: 240, // 1 EUR = 240 DZD (DA)
        USD: 1.08, // 1 EUR = 1.08 USD ($)
      },

      setCurrency: (currency) => set({ currency }),

      convertPrice: (amountInEur, targetCurrency) => {
        const curr = targetCurrency || get().currency;
        const rate = get().rates[curr] || 1;
        return Math.round(amountInEur * rate);
      },

      formatPrice: (amountInEur) => {
        const curr = get().currency;
        const rate = get().rates[curr] || 1;
        const converted = Math.round(amountInEur * rate);

        switch (curr) {
          case 'DZD':
            return `${converted.toLocaleString('fr-DZ')} DA`;
          case 'USD':
            return `$${converted.toLocaleString('en-US')}`;
          case 'EUR':
          default:
            return `€${converted.toLocaleString('de-DE')}`;
        }
      },
    }),
    {
      name: 'karluxe-currency-storage',
    }
  )
);
