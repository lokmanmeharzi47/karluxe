'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { createBookingAction } from '@/app/actions/bookingActions';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export const StepPayment: React.FC = () => {
  const {
    selectedCar,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
    insuranceTier,
    selectedExtras,
    customerName,
    customerEmail,
    customerPhone,
    setCustomerInfo,
  } = useBookingStore();

  const { formatPrice } = useCurrencyStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  const calculateDays = () => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(dropoffDate).getTime();
    const diff = (end - start) / (1000 * 3600 * 24);
    return Math.max(1, Math.round(diff) || 1);
  };

  const days = calculateDays();
  const carRate = selectedCar?.daily_rate || 2500;
  const totalAmount = carRate * days;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) return;

    setLoading(true);
    setErrorMsg('');

    const res = await createBookingAction({
      carId: selectedCar.id,
      customerName: customerName || 'VIP Guest',
      customerEmail: customerEmail || 'guest@vip-concierge.com',
      customerPhone: customerPhone || '+377 98 00 11 22',
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation,
      insuranceTier,
      selectedExtras,
      totalAmount,
    });

    setLoading(false);

    if (res.success && res.bookingCode) {
      setConfirmedCode(res.bookingCode);
    } else {
      setErrorMsg(res.error || 'Failed to complete booking');
    }
  };

  if (confirmedCode) {
    return (
      <div className="glass-panel rounded-3xl p-10 border border-[rgba(212,175,55,0.4)] text-center space-y-6 bg-[#111111]/95 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-heading uppercase text-white">
          Reservation Confirmed!
        </h3>

        <p className="text-sm text-[#B6B6B6] max-w-md mx-auto">
          Your luxury vehicle has been secured with white-glove concierge delivery.
        </p>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
          <span className="text-xs text-[#B6B6B6] uppercase tracking-wider block">Booking Reference Code</span>
          <span className="text-2xl font-bold text-[#D4AF37] tracking-widest">{confirmedCode}</span>
        </div>

        <div className="pt-4">
          <a href="/account">
            <LuxuryButton variant="gold" size="md">
              View Reservation in Account Portal
            </LuxuryButton>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Step 6: Guest Details & Payment
      </h3>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Customer Info Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Full Guest Name
          </label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerInfo(e.target.value, customerEmail, customerPhone)}
            placeholder="Lord Alistair Sterling"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            VIP Email Address
          </label>
          <input
            type="email"
            required
            value={customerEmail}
            onChange={(e) => setCustomerInfo(customerName, e.target.value, customerPhone)}
            placeholder="guest@vip-concierge.com"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Contact Mobile Phone
          </label>
          <input
            type="tel"
            required
            value={customerPhone}
            onChange={(e) => setCustomerInfo(customerName, customerEmail, e.target.value)}
            placeholder="+377 98 00 11 22"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Dummy Payment Card Input */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" /> Payment Card Information
          </span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </span>
        </div>

        <input
          type="text"
          placeholder="Card Number: 4000 1234 5678 9010"
          defaultValue="4000 1234 5678 9010"
          className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            defaultValue="12/28"
            className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="CVC"
            defaultValue="888"
            className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <LuxuryButton
        variant="gold"
        size="lg"
        className="w-full"
        type="submit"
        disabled={loading}
        icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {loading ? 'Processing VIP Booking...' : `Pay & Complete Reservation (${formatPrice(totalAmount)})`}
      </LuxuryButton>
    </form>
  );
};
