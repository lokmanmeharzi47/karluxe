'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'EUR' | 'DZD' | 'USD';

/**
 * Formats a DZD amount into Algerian millions notation.
 * 1 DA = 100 centimes => 10,000 DA = 1,000,000 centimes = 1 million.
 * E.g.:
 * - 19,000 DA (1,900,000 cts) => "1,9 million"
 * - 20,000 DA (2,000,000 cts) => "2 millions"
 * - 14,000 DA (1,400,000 cts) => "1,4 million"
 */
export function formatDzdInMillions(amountInDzd: number): string {
  const millions = amountInDzd / 10000;

  if (millions < 0.1) {
    if (millions <= 0) return '0 DA';
    return `${Math.round(amountInDzd).toLocaleString('fr-DZ')} DA`;
  }

  const formatted = millions.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const unit = millions >= 2 ? 'millions' : 'million';
  return `${formatted} ${unit}`;
}

interface CurrencyStore {
  currency: Currency;
  rates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInEur: number) => string;
  formatDzdPrice: (amountInDzd: number) => string;
  convertPrice: (amountInEur: number, targetCurrency?: Currency) => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'DZD',
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
            return formatDzdInMillions(converted);
          case 'USD':
            return `$${converted.toLocaleString('en-US')}`;
          case 'EUR':
          default:
            return `€${converted.toLocaleString('de-DE')}`;
        }
      },

      formatDzdPrice: (amountInDzd) => {
        const curr = get().currency;
        if (curr === 'DZD') {
          return formatDzdInMillions(amountInDzd);
        }
        const amountInEur = amountInDzd / (get().rates['DZD'] || 240);
        const rate = get().rates[curr] || 1;
        const converted = Math.round(amountInEur * rate);

        if (curr === 'USD') {
          return `$${converted.toLocaleString('en-US')}`;
        }
        return `€${converted.toLocaleString('de-DE')}`;
      },
    }),
    {
      name: 'karluxe-currency-storage',
    }
  )
);
