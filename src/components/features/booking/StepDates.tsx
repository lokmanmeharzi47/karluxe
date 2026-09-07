'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import {
  Calendar,
  Clock,
  Coins,
  MapPin,
  Check,
  Sparkles,
  Plane,
  Building,
  Key
} from 'lucide-react';

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

const formatFrenchLongDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (!y || !m || !d) return dateStr;
    const date = new Date(y, m - 1, d);
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

const TIME_OPTIONS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

const LOCATION_OPTIONS = [
  {
    id: 'airport',
    title: 'Aéroport d’Alger - Houari Boumediene',
    subtitle: 'Accueil personnalisé au terminal avec pancarte VIP & bagagiste',
    icon: Plane,
  },
  {
    id: 'hotel',
    title: 'Livraison Concierge VIP',
    subtitle: 'Mise à disposition directe à votre hôtel ou résidence privée',
    icon: Building,
  },
  {
    id: 'agency',
    title: 'Agence Principale KarLuxe',
    subtitle: 'Retrait rapide en salon lounge d’affaires KarLuxe Alger',
    icon: Key,
  },
];

export const StepDates: React.FC = () => {
  const {
    pickupDate,
    dropoffDate,
    setDates,
    selectedCar,
    pickupLocation,
    setLocations,
  } = useBookingStore();

  const { formatPrice } = useCurrencyStore();

  const todayStr = formatDateToYMD(new Date());

  const [pickupTime, setPickupTime] = useState<string>('10:00');
  const [dropoffTime, setDropoffTime] = useState<string>('18:00');

  const handlePickupChange = (newPickup: string) => {
    let newDropoff = dropoffDate;
    if (newDropoff <= newPickup) {
      const [y, m, d] = newPickup.split('-').map(Number);
      const nextDay = new Date(y, m - 1, d + 1);
      newDropoff = formatDateToYMD(nextDay);
    }
    setDates(newPickup, newDropoff);
  };

  const handleDropoffChange = (newDropoff: string) => {
    if (newDropoff <= pickupDate) {
      return;
    }
    setDates(pickupDate, newDropoff);
  };

  const applyPresetDuration = (daysToAdd: number) => {
    const [y, m, d] = pickupDate.split('-').map(Number);
    const newEnd = new Date(y, m - 1, d + daysToAdd);
    setDates(pickupDate, formatDateToYMD(newEnd));
  };

  const days = getDaysBetween(pickupDate, dropoffDate);
  const dailyRate = selectedCar?.daily_rate || 2500;
  const estimatedTotal = dailyRate * days;
  const securityDeposit = selectedCar?.security_deposit || 0;

  return (
    <div className="space-y-8">
      {/* Header with Title and Live Duration Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              Étape 2 sur 3 • Calendrier VIP
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white tracking-wide">
            Choisir les Dates de Location
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">
            Sélectionnez vos dates et créneaux de mise à disposition du véhicule.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] self-start sm:self-center">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <div className="text-right">
            <span className="text-[10px] text-[#B6B6B6] uppercase block font-semibold">Durée Totale</span>
            <span className="text-sm font-extrabold text-[#D4AF37]">
              {days} {days === 1 ? 'Jour de Location' : 'Jours de Location'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Duration Shortcuts */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Durées Prédéfinies
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { label: '3 Jours', sub: 'Week-end VIP', count: 3 },
            { label: '5 Jours', sub: 'Court Séjour', count: 5 },
            { label: '7 Jours', sub: 'Semaine VIP', count: 7 },
            { label: '14 Jours', sub: 'Longue Durée', count: 14 },
          ].map((preset) => {
            const isActive = days === preset.count;
            return (
              <button
                key={preset.count}
                type="button"
                onClick={() => applyPresetDuration(preset.count)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#050505] border-white/10 hover:border-white/25 text-[#B6B6B6]'
                }`}
              >
                <span
                  className={`text-xs font-bold block ${
                    isActive ? 'text-[#D4AF37]' : 'text-white'
                  }`}
                >
                  {preset.label}
                </span>
                <span className="text-[10px] text-[#B6B6B6] block mt-0.5">
                  {preset.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Main Date & Time Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Prise en Charge */}
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-[rgba(212,175,55,0.25)] bg-[#0a0a0a]/95 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Prise en Charge
                </span>
                <span className="text-[10px] text-[#B6B6B6]">Début de la location</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Départ
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold block">
              Date de début
            </label>
            <input
              type="date"
              min={todayStr}
              value={pickupDate}
              onChange={(e) => handlePickupChange(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none transition-all cursor-pointer"
            />
            {/* Formatted Date Preview */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-[#D4AF37] capitalize flex items-center gap-1.5">
                📅 {formatFrenchLongDate(pickupDate)}
              </span>
            </div>
          </div>

          {/* Time Picker */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <label className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Heure estimée de prise en charge
            </label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full bg-[#050505] border border-white/15 focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs font-semibold text-white focus:outline-none transition-all"
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time} ({parseInt(time, 10) < 12 ? 'Matinée' : parseInt(time, 10) < 18 ? 'Après-midi' : 'Soirée'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card 2: Restitution */}
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-[rgba(212,175,55,0.25)] bg-[#0a0a0a]/95 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Restitution
                </span>
                <span className="text-[10px] text-[#B6B6B6]">Fin de la location</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Retour
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold block">
              Date de fin
            </label>
            <input
              type="date"
              min={pickupDate || todayStr}
              value={dropoffDate}
              onChange={(e) => handleDropoffChange(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none transition-all cursor-pointer"
            />
            {/* Formatted Date Preview */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-[#D4AF37] capitalize flex items-center gap-1.5">
                📅 {formatFrenchLongDate(dropoffDate)}
              </span>
            </div>
          </div>

          {/* Time Picker */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <label className="text-[11px] uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Heure estimée de restitution
            </label>
            <select
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
              className="w-full bg-[#050505] border border-white/15 focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs font-semibold text-white focus:outline-none transition-all"
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time} ({parseInt(time, 10) < 12 ? 'Matinée' : parseInt(time, 10) < 18 ? 'Après-midi' : 'Soirée'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lieu de Mise à disposition */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#D4AF37]" /> Lieu de Prise en Charge / Restitution
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LOCATION_OPTIONS.map((loc) => {
            const isSelected = pickupLocation === loc.title;
            const Icon = loc.icon;
            return (
              <div
                key={loc.id}
                onClick={() => setLocations(loc.title, loc.title)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#050505]/70 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase font-heading">
                    {loc.title.split('-')[0]}
                  </h4>
                </div>
                <p className="text-[11px] text-[#B6B6B6] leading-relaxed">
                  {loc.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luxury Financial Summary & Guarantees Card */}
      <div className="glass-panel rounded-2xl p-6 border border-[rgba(212,175,55,0.35)] bg-gradient-to-br from-[#141414] to-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.8)] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase font-heading tracking-wider text-white">
                Détail de la Tarification & Devis
              </h4>
              <span className="text-[10px] text-[#B6B6B6]">
                Calculé selon vos dates pour {selectedCar?.title || 'le véhicule choisi'}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Tarification Transparente
          </span>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center text-[#B6B6B6]">
            <span>Tarif journalier du véhicule</span>
            <span className="text-white font-semibold">{formatPrice(dailyRate)} / jour</span>
          </div>

          <div className="flex justify-between items-center text-[#B6B6B6]">
            <span>Durée de location sélectionnée</span>
            <span className="text-white font-semibold">
              {days} {days === 1 ? 'jour' : 'jours'}
            </span>
          </div>

          <div className="flex justify-between items-center text-[#B6B6B6]">
            <span>Sous-total location ({days} {days === 1 ? 'jour' : 'jours'})</span>
            <span className="text-white font-semibold">{formatPrice(estimatedTotal)}</span>
          </div>

          {securityDeposit > 0 && (
            <div className="flex justify-between items-center text-[#B6B6B6] pt-1">
              <span className="flex items-center gap-1.5">
                Caution de garantie
                <span className="text-[10px] text-emerald-400 font-medium">(restituable au retour)</span>
              </span>
              <span className="text-white font-semibold">{formatPrice(securityDeposit)}</span>
            </div>
          )}

          {/* Divider */}
          <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-white block">
                Total Estimé de la Location
              </span>
              <span className="text-[11px] text-[#B6B6B6]">
                TTC • Aucun frais caché supplémentaire
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#D4AF37]">
              {formatPrice(estimatedTotal)}
            </span>
          </div>
        </div>

        {/* Included VIP Benefits */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#B6B6B6]">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Kilométrage illimité</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Assurance tous risques</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Annulation 48h gratuite</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Assistance VIP 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
