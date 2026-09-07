'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { createBrowserClient } from '@/lib/supabase/client';
import { CarWithDetails } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StepPayment } from '@/components/features/booking/StepPayment';
import { Calendar, Clock, RefreshCw, Check, X } from 'lucide-react';

export const dynamic = 'force-dynamic';

const formatDateToYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
};

function BookingPageContent() {
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get('carId');
  const daysParam = searchParams.get('days');
  const pickupParam = searchParams.get('pickup');
  const dropoffParam = searchParams.get('dropoff');

  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);

  const {
    selectedCar,
    setSelectedCar,
    pickupDate,
    dropoffDate,
    setDates,
  } = useBookingStore();

  const { formatPrice } = useCurrencyStore();

  const todayStr = formatDateToYMD(new Date());

  useEffect(() => {
    async function loadCars() {
      const supabase = createBrowserClient();
      const { data } = await supabase.from('cars').select('*, brands(*), categories(*)');
      if (data) {
        const carList = data as CarWithDetails[];
        setCars(carList);

        if (carIdParam) {
          const matched = carList.find((c) => c.id === carIdParam);
          if (matched) {
            setSelectedCar(matched);
            return;
          }
        }

        const currentCar = useBookingStore.getState().selectedCar;
        if (!currentCar && carList.length > 0) {
          setSelectedCar(carList[0]);
        }
      }
    }
    loadCars();
  }, [carIdParam, setSelectedCar]);

  useEffect(() => {
    if (pickupParam && dropoffParam) {
      setDates(pickupParam, dropoffParam);
    } else if (daysParam) {
      const numDays = Math.max(1, parseInt(daysParam, 10) || 3);
      const start = new Date();
      const end = new Date(Date.now() + numDays * 24 * 60 * 60 * 1000);
      setDates(formatDateToYMD(start), formatDateToYMD(end));
    }
  }, [pickupParam, dropoffParam, daysParam, setDates]);

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    const [y1, m1, d1] = pickupDate.split('-').map(Number);
    const [y2, m2, d2] = dropoffDate.split('-').map(Number);
    const start = new Date(y1, m1 - 1, d1).getTime();
    const end = new Date(y2, m2 - 1, d2).getTime();
    const diff = Math.round((end - start) / (1000 * 3600 * 24));
    return Math.max(1, diff);
  };

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

  const rentalDays = calculateDays();
  const estimatedTotal = selectedCar ? selectedCar.daily_rate * rentalDays : 0;

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Réservation Directe VIP"
          title="Finaliser Votre Réservation"
          subtitle="Vérifiez votre véhicule et vos dates, puis complétez vos coordonnées pour la livraison concierge."
        />

        {/* 2-Column Direct Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Left Column: Coordinates & Payment Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-[rgba(212,175,55,0.25)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <StepPayment />
          </div>

          {/* Right Column: Selected Vehicle & Dates Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.3)] bg-[#111111]/95 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Vehicle Header & Thumbnail */}
              {selectedCar && (
                <div className="space-y-4 pb-5 border-b border-white/10">
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                    <Image
                      src={selectedCar.featured_image}
                      alt={selectedCar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#D4AF37] text-black shadow-lg">
                      {selectedCar.brands?.name || 'Supercar'}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold font-heading uppercase text-white tracking-wide">
                        {selectedCar.title}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xl font-extrabold text-[#D4AF37]">
                          {formatPrice(selectedCar.daily_rate)}
                        </span>
                        <span className="text-xs text-[#B6B6B6]">/ jour</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCarModalOpen(true)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:underline px-3 py-1.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Changer
                    </button>
                  </div>
                </div>
              )}

              {/* Dates & Duration Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Dates de Location
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rentalDays} {rentalDays === 1 ? 'Jour' : 'Jours'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Prise en charge */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#B6B6B6] font-semibold block">
                      Prise en charge
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={pickupDate}
                      onChange={(e) => handlePickupChange(e.target.value)}
                      className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-xs font-bold text-white focus:outline-none transition-all cursor-pointer"
                    />
                    <span className="text-[10px] text-[#D4AF37] block font-medium capitalize truncate">
                      {formatFrenchDate(pickupDate)}
                    </span>
                  </div>

                  {/* Restitution */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-[#B6B6B6] font-semibold block">
                      Restitution
                    </label>
                    <input
                      type="date"
                      min={pickupDate || todayStr}
                      value={dropoffDate}
                      onChange={(e) => handleDropoffChange(e.target.value)}
                      className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-xs font-bold text-white focus:outline-none transition-all cursor-pointer"
                    />
                    <span className="text-[10px] text-[#D4AF37] block font-medium capitalize truncate">
                      {formatFrenchDate(dropoffDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-[#B6B6B6]">
                <div className="flex justify-between">
                  <span>Location ({rentalDays} {rentalDays === 1 ? 'jour' : 'jours'})</span>
                  <span className="text-white font-semibold">{formatPrice(estimatedTotal)}</span>
                </div>

                {selectedCar && selectedCar.security_deposit > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Caution de Garantie
                      <span className="text-[10px] text-[#B6B6B6]/70">(restituable)</span>
                    </span>
                    <span className="text-white font-semibold">
                      {formatPrice(selectedCar.security_deposit)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-2.5 border-t border-white/10 text-sm font-bold text-[#D4AF37]">
                  <span>Total Estimé</span>
                  <span className="text-base font-extrabold">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              {/* VIP Guarantees */}
              <ul className="space-y-2 text-[11px] text-[#B6B6B6] pt-1 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Annulation sans frais jusqu'à 48h
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Livraison VIP Aéroport / Hôtel
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> Assurance tous risques & Assistance 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Changer de Véhicule */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 border border-[rgba(212,175,55,0.4)] bg-[#0d0d0d] shadow-[0_0_60px_rgba(212,175,55,0.2)] flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold font-heading uppercase text-white">
                  Sélectionner un Véhicule de Prestige
                </h3>
                <p className="text-xs text-[#B6B6B6]">
                  Cliquez sur un modèle pour l'appliquer instantanément à votre réservation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 max-h-[60vh]">
              {cars.map((car) => {
                const isCurrent = selectedCar?.id === car.id;
                return (
                  <div
                    key={car.id}
                    onClick={() => {
                      setSelectedCar(car);
                      setIsCarModalOpen(false);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      isCurrent
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                        : 'bg-[#050505] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-black">
                      <Image
                        src={car.featured_image}
                        alt={car.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37]">
                        {car.brands?.name || 'Supercar'}
                      </span>
                      <h4 className="text-sm font-bold font-heading text-white">{car.title}</h4>
                      <span className="text-xs font-semibold text-white/90">
                        {formatPrice(car.daily_rate)}/jour
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isCurrent ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/20'
                      }`}
                    >
                      {isCurrent && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
          Chargement du Formulaire de Réservation...
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
