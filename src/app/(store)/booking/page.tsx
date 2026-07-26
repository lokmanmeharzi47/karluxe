'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { createBrowserClient } from '@/lib/supabase/client';
import { CarWithDetails } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StepCarSelect } from '@/components/features/booking/StepCarSelect';
import { StepDates } from '@/components/features/booking/StepDates';
import { StepPayment } from '@/components/features/booking/StepPayment';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get('carId');
  const daysParam = searchParams.get('days');
  const [cars, setCars] = useState<CarWithDetails[]>([]);

  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    selectedCar,
    setSelectedCar,
    pickupDate,
    dropoffDate,
    setDates,
  } = useBookingStore();

  const { formatPrice } = useCurrencyStore();

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
            setStep(2);
          }
        } else if (carList.length > 0 && !selectedCar) {
          setSelectedCar(carList[0]);
        }
      }
    }
    loadCars();
  }, [carIdParam, selectedCar, setSelectedCar, setStep]);

  useEffect(() => {
    if (daysParam) {
      const numDays = Math.max(1, parseInt(daysParam, 10) || 3);
      const start = new Date();
      const end = new Date(Date.now() + numDays * 24 * 60 * 60 * 1000);
      setDates(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
    }
  }, [daysParam, setDates]);

  const calculateDays = () => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(dropoffDate).getTime();
    const diff = (end - start) / (1000 * 3600 * 24);
    return Math.max(1, Math.round(diff) || 1);
  };

  const rentalDays = calculateDays();
  const estimatedTotal = selectedCar ? selectedCar.daily_rate * rentalDays : 0;

  const steps = [
    { number: 1, title: 'Véhicule' },
    { number: 2, title: 'Dates' },
    { number: 3, title: 'Coordonnées & Paiement' },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="VIP Booking Flow"
          title="Réservez Votre Expérience"
          subtitle="Formulaire de réservation rapide et sécurisé en 3 étapes."
        />

        {/* Wizard Step Progress Indicator */}
        <div className="mb-8 flex items-center justify-between relative max-w-xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                onClick={() => (isCompleted || step.number < currentStep) && setStep(step.number)}
                className={`relative z-10 flex flex-col items-center gap-1.5 cursor-pointer ${
                  isCompleted || isCurrent ? 'text-[#D4AF37]' : 'text-[#B6B6B6]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : isCurrent
                      ? 'bg-[#111111] border-2 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#111111] border border-white/20 text-[#B6B6B6]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-black" /> : step.number}
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Vehicle Banner Preview (Shown if a vehicle is active) */}
        {selectedCar && currentStep > 1 && (
          <div className="mb-6 glass-panel rounded-2xl p-4 border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={selectedCar.featured_image}
                alt={selectedCar.title}
                width={64}
                height={48}
                className="w-16 h-12 rounded-xl object-cover"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                  {selectedCar.brands?.name || 'Supercar'}
                </span>
                <h4 className="text-sm font-bold font-heading uppercase text-white">
                  {selectedCar.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-[#B6B6B6] mt-0.5">
                  <span>{formatPrice(selectedCar.daily_rate)}/jour</span>
                  <span>•</span>
                  <span>{rentalDays} {rentalDays === 1 ? 'Jour' : 'Jours'} ({formatPrice(estimatedTotal)})</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Changer de véhicule
            </button>
          </div>
        )}

        {/* Step Content Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {currentStep === 1 && <StepCarSelect cars={cars} />}
          {currentStep === 2 && <StepDates />}
          {currentStep === 3 && <StepPayment />}

          {/* Navigation Controls */}
          {currentStep < 3 && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
              <LuxuryButton
                variant="ghost"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={<ChevronLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Étape Précédente
              </LuxuryButton>

              <LuxuryButton
                variant="gold"
                size="md"
                onClick={nextStep}
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Continuer vers Étape {currentStep + 1}
              </LuxuryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] text-[#D4AF37] flex items-center justify-center font-heading text-lg">
        Chargement du Formulaire de Réservation...
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
