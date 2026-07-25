'use client';

import React, { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { createBookingAction } from '@/app/actions/bookingActions';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { CheckCircle2, Loader2, ArrowRight, DollarSign, CreditCard } from 'lucide-react';

export const StepPayment: React.FC = () => {
  const {
    selectedCar,
    pickupDate,
    dropoffDate,
    customerName,
    customerEmail,
    customerPhone,
    setCustomerInfo,
  } = useBookingStore();

  const { formatPrice } = useCurrencyStore();

  const [wilaya, setWilaya] = useState('16 - Alger');
  const [commune, setCommune] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'check'>('cash');

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

  const wilayasAlgerie = [
    '16 - Alger',
    '31 - Oran',
    '25 - Constantine',
    '23 - Annaba',
    '09 - Blida',
    '19 - Sétif',
    '13 - Tlemcen',
    '15 - Tizi Ouzou',
    '06 - Béjaïa',
    '35 - Boumerdès',
    'Monaco VIP Heliport Hub',
    'Dubai DXB VIP Terminal',
    'Paris CDG Lounge',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) return;

    setLoading(true);
    setErrorMsg('');

    const res = await createBookingAction({
      carId: selectedCar.id,
      customerName,
      customerPhone,
      customerEmail,
      pickupDate,
      dropoffDate,
      wilaya,
      commune,
      notes,
      paymentMethod,
      totalAmount,
    });

    setLoading(false);

    if (res.success && res.bookingCode) {
      setConfirmedCode(res.bookingCode);
    } else {
      setErrorMsg(res.error || 'Échec de la réservation');
    }
  };

  if (confirmedCode) {
    return (
      <div className="glass-panel rounded-3xl p-10 border border-[rgba(212,175,55,0.4)] text-center space-y-6 bg-[#111111]/95 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-heading uppercase text-white">
          Réservation Confirmée !
        </h3>

        <p className="text-sm text-[#B6B6B6] max-w-md mx-auto">
          Votre véhicule de luxe a été réservé avec livraison concierge prioritaire.
        </p>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
          <span className="text-xs text-[#B6B6B6] uppercase tracking-wider block">Code de Référence VIP</span>
          <span className="text-2xl font-bold text-[#D4AF37] tracking-widest">{confirmedCode}</span>
        </div>

        <div className="pt-4">
          <a href="/account">
            <LuxuryButton variant="gold" size="md">
              Voir dans Mon Espace Client
            </LuxuryButton>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Étape 3: Coordonnées & Paiement
      </h3>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Form Fields Matching Algerian Luxury Format */}
      <div className="space-y-4">
        {/* Nom complet */}
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1.5 text-right sm:text-left">
            Nom complet
          </label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerInfo(e.target.value, customerEmail, customerPhone)}
            placeholder="Nom complet"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-2xl py-3.5 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Numéro de téléphone */}
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1.5 text-right sm:text-left">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            required
            value={customerPhone}
            onChange={(e) => setCustomerInfo(customerName, customerEmail, e.target.value)}
            placeholder="0555555555"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-2xl py-3.5 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Commune et Wilaya */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1.5 text-right sm:text-left">
              Commune
            </label>
            <input
              type="text"
              placeholder="Commune"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-2xl py-3.5 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1.5 text-right sm:text-left">
              Wilaya
            </label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-2xl py-3.5 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {wilayasAlgerie.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Remarques supplémentaires (Optionnel) */}
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1.5 text-right sm:text-left">
            Remarques supplémentaires (Optionnel)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Remarques supplémentaires (Optionnel)"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-2xl py-3.5 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Méthode de paiement Cards */}
        <div className="pt-2">
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-2 text-right sm:text-left">
            Méthode de paiement
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                paymentMethod === 'cash'
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'bg-[#050505] border-white/10 text-white/80 hover:border-white/20'
              }`}
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Espèce</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('check')}
              className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                paymentMethod === 'check'
                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'bg-[#050505] border-white/10 text-white/80 hover:border-white/20'
              }`}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Chèque / Carte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <LuxuryButton
        variant="gold"
        size="lg"
        className="w-full mt-6 py-4"
        type="submit"
        disabled={loading}
        icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
      >
        {loading ? 'Traitement de la Réservation...' : `Payer & Confirmer la Réservation (${formatPrice(totalAmount)})`}
      </LuxuryButton>
    </form>
  );
};
