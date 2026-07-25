'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrencyStore, Currency } from '@/store/useCurrencyStore';
import { Globe, ChevronDown } from 'lucide-react';

export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'DZD', label: 'DZD (DA)', symbol: 'DA' },
    { code: 'USD', label: 'USD ($)', symbol: '$' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeObj = currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-panel border border-[rgba(212,175,55,0.3)] text-xs font-bold text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>{activeObj.symbol}</span>
        <ChevronDown className="w-3 h-3 text-[#B6B6B6]" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 glass-panel rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#050505]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2 z-50">
          <div className="px-3 py-1 text-[9px] uppercase tracking-widest text-[#B6B6B6] font-bold border-b border-white/10 mb-1">
            Select Currency
          </div>

          {currencies.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                currency === item.code
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              {currency === item.code && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
