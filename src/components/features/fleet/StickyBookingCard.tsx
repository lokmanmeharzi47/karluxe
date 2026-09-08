'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CarWithDetails } from '@/types';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Calendar, ArrowRight, Check, Clock } from 'lucide-react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface StickyBookingCardProps {
  car: CarWithDetails;
}

const formatDateToYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysBetween = (startStr: string, endStr: string): number => {
  if (!startStr || !endStr) return 1;
  const [y1, m1, d1] = startStr.split('-').map(Number);
  const [y2, m2, d2] = endStr.split('-').map(Number);
  const start = new Date(y1, m1 - 1, d1).getTime();
  const end = new Date(y2, m2 - 1, d2).getTime();
  const diff = Math.round((end - start) / (1000 * 3600 * 24));
  return Math.max(1, diff);
};

const formatFrenchDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return dateStr;
    const date = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return dateStr;
  }
};

const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const sanitizeDateInput = (val: string, fallback: string): string => {
  if (typeof val === 'string' && DATE_FORMAT_REGEX.test(val.trim())) {
    return encodeURIComponent(val.trim());
  }
  return encodeURIComponent(fallback);
};

export const StickyBookingCard: React.FC<StickyBookingCardProps> = ({ car }) => {
  const today = new Date();
  const initialPickup = formatDateToYMD(today);
  const initialDropoff = formatDateToYMD(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000));

  const [pickupDate, setPickupDate] = useState<string>(initialPickup);
  const [dropoffDate, setDropoffDate] = useState<string>(initialDropoff);

  const { formatPrice } = useCurrencyStore();

  const handlePickupChange = (newPickup: string) => {
    const sanitized = (newPickup || '').trim();
    if (!DATE_FORMAT_REGEX.test(sanitized)) return;
    setPickupDate(sanitized);
    if (dropoffDate <= sanitized) {
      const [y, m, d] = sanitized.split('-').map(Number);
      const nextDay = new Date(y, m - 1, d + 1);
      setDropoffDate(formatDateToYMD(nextDay));
    }
  };

  const handleDropoffChange = (newDropoff: string) => {
    const sanitized = (newDropoff || '').trim();
    if (!DATE_FORMAT_REGEX.test(sanitized)) return;
    if (sanitized <= pickupDate) {
      return;
    }
    setDropoffDate(sanitized);
  };

  const applyPresetDays = (numDays: number) => {
    const [y, m, d] = pickupDate.split('-').map(Number);
    const newEnd = new Date(y, m - 1, d + numDays);
    setDropoffDate(formatDateToYMD(newEnd));
  };

  const days = getDaysBetween(pickupDate, dropoffDate);
  const totalAmount = car.daily_rate * days;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.3)] bg-[#111111]/95 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:sticky lg:top-28">
      {/* Price Header */}
      <div className="pb-4 border-b border-white/10 flex items-end justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold block">
            Tarif Journalier
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-heading text-white">{formatPrice(car.daily_rate)}</span>
            <span className="text-xs text-[#B6B6B6]">/ jour</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37]">
          <Clock className="w-3.5 h-3.5" />
          <span>{days} {days === 1 ? 'Jour' : 'Jours'}</span>
        </div>
      </div>

      {/* Date Pickers Section */}
      <div className="space-y-4">
        {/* Date de Début */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Date de Début
            </label>
            <span className="text-[11px] text-[#D4AF37] font-medium capitalize">
              {formatFrenchDate(pickupDate)}
            </span>
          </div>
          <input
            type="date"
            min={initialPickup}
            value={pickupDate}
            onChange={(e) => handlePickupChange(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none transition-all cursor-pointer"
          />
        </div>

        {/* Date de Fin */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Date de Fin
            </label>
            <span className="text-[11px] text-[#D4AF37] font-medium capitalize">
              {formatFrenchDate(dropoffDate)}
            </span>
          </div>
          <input
            type="date"
            min={pickupDate || initialPickup}
            value={dropoffDate}
            onChange={(e) => handleDropoffChange(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none transition-all cursor-pointer"
          />
        </div>

        {/* Quick Duration Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => applyPresetDays(3)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
              days === 3
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-white/5 border-white/10 text-[#B6B6B6] hover:text-white hover:border-white/20'
            }`}
          >
            3 Jours
          </button>
          <button
            type="button"
            onClick={() => applyPresetDays(7)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
              days === 7
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-white/5 border-white/10 text-[#B6B6B6] hover:text-white hover:border-white/20'
            }`}
          >
            7 Jours
          </button>
          <button
            type="button"
            onClick={() => applyPresetDays(14)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
              days === 14
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-white/5 border-white/10 text-[#B6B6B6] hover:text-white hover:border-white/20'
            }`}
          >
            14 Jours
          </button>
        </div>
      </div>

      {/* Itemized Price Summary */}
      <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-[#B6B6B6]">
        <div className="flex justify-between">
          <span>Location ({days} {days === 1 ? 'jour' : 'jours'})</span>
          <span className="text-white font-semibold">{formatPrice(totalAmount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            Caution de Garantie
            <span className="text-[10px] text-[#B6B6B6]/70">(restituable)</span>
          </span>
          <span className="text-white font-semibold">{formatPrice(car.security_deposit)}</span>
        </div>
        <div className="flex justify-between pt-2.5 border-t border-white/10 text-sm font-bold text-[#D4AF37]">
          <span>Total Estimé</span>
          <span className="text-base font-extrabold">{formatPrice(totalAmount)}</span>
        </div>
      </div>

      {/* Features Bullet list */}
      <ul className="space-y-2 text-[11px] text-[#B6B6B6]">
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Annulation gratuite jusqu'à 48h
        </li>
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Livraison VIP Aéroport / Hôtel
        </li>
        <li className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Assurance tous risques & Assistance 24/7
        </li>
      </ul>

      {/* CTA Button */}
      {(() => {
        const safeCarId = encodeURIComponent(String(car.id || ''));
        const safePickup = sanitizeDateInput(pickupDate, initialPickup);
        const safeDropoff = sanitizeDateInput(dropoffDate, initialDropoff);
        const bookingHref = `/booking?carId=${safeCarId}&pickup=${safePickup}&dropoff=${safeDropoff}`;

        return (
          <Link
            href={bookingHref}
            className="block"
          >
            <LuxuryButton
              variant="gold"
              size="lg"
              className="w-full uppercase font-bold tracking-wider"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Réserver ce Véhicule
            </LuxuryButton>
          </Link>
        );
      })()}

    </div>
  );
};
