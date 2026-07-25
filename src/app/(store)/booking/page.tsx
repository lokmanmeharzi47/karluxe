'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/store/useBookingStore';
import { createBrowserClient } from '@/lib/supabase/client';
import { CarWithDetails } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StepCarSelect } from '@/components/features/booking/StepCarSelect';
import { StepDates } from '@/components/features/booking/StepDates';
import { StepLocations } from '@/components/features/booking/StepLocations';
import { StepInsurance } from '@/components/features/booking/StepInsurance';
import { StepExtras } from '@/components/features/booking/StepExtras';
import { StepPayment } from '@/components/features/booking/StepPayment';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const carIdParam = searchParams.get('carId');
  const [cars, setCars] = useState<CarWithDetails[]>([]);

  const { currentStep, setStep, nextStep, prevStep, selectedCar, setSelectedCar } = useBookingStore();

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
  }, [carIdParam, setSelectedCar, setStep, selectedCar]);

  const steps = [
    { number: 1, title: 'Vehicle' },
    { number: 2, title: 'Dates' },
    { number: 3, title: 'Location' },
    { number: 4, title: 'Protection' },
    { number: 5, title: 'Extras' },
    { number: 6, title: 'Payment' },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="VIP Booking Flow"
          title="Reserve Your Experience"
          subtitle="Complete your 6-step guided luxury reservation."
        />

        {/* Wizard Step Progress Indicator */}
        <div className="mb-10 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                onClick={() => isCompleted && setStep(step.number)}
                className={`relative z-10 flex flex-col items-center gap-1.5 cursor-pointer ${
                  isCompleted || isCurrent ? 'text-[#D4AF37]' : 'text-[#B6B6B6]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : isCurrent
                      ? 'bg-[#111111] border-2 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#111111] border border-white/20 text-[#B6B6B6]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-black" /> : step.number}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold hidden sm:block">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {currentStep === 1 && <StepCarSelect cars={cars} />}
          {currentStep === 2 && <StepDates />}
          {currentStep === 3 && <StepLocations />}
          {currentStep === 4 && <StepInsurance />}
          {currentStep === 5 && <StepExtras />}
          {currentStep === 6 && <StepPayment />}

          {/* Navigation Controls */}
          {currentStep < 6 && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
              <LuxuryButton
                variant="ghost"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={<ChevronLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Previous Step
              </LuxuryButton>

              <LuxuryButton
                variant="gold"
                size="md"
                onClick={nextStep}
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Continue Step {currentStep + 1}
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
        Loading Luxury Booking Suite...
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}
