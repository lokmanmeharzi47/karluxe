'use client';

import React, { useState } from 'react';
import { addCouponAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2 } from 'lucide-react';

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCouponAdded: (newCoupon: any) => void;
}

export const AddCouponModal: React.FC<AddCouponModalProps> = ({
  isOpen,
  onClose,
  onCouponAdded,
}) => {
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [maxUses, setMaxUses] = useState(100);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await addCouponAction({
      code,
      discountPercent: Number(discountPercent),
      validUntil: new Date(validUntil).toISOString(),
      maxUses: Number(maxUses),
    });

    setLoading(false);
    if (res.success && res.coupon) {
      onCouponAdded(res.coupon);
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to add promo coupon');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Create VIP Promo Code" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIP2026"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] uppercase font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Max Uses
              </label>
              <input
                type="number"
                min="1"
                required
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Valid Until Date
            </label>
            <input
              type="date"
              required
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <LuxuryButton variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </LuxuryButton>
          <LuxuryButton
            variant="gold"
            size="sm"
            type="submit"
            disabled={loading}
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {loading ? 'Creating...' : 'Create Promo Code'}
          </LuxuryButton>
        </div>
      </form>
    </LuxuryModal>
  );
};
