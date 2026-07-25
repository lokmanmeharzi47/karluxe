'use client';

import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';
import { AddCouponModal } from './AddCouponModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';

export const CouponsManagerTable: React.FC = () => {
  const [coupons, setCoupons] = useState([
    { id: 'c1', code: 'VIPMONACO', discount_percent: 15, valid_until: '2026-12-31', max_uses: 100, used_count: 24, is_active: true },
    { id: 'c2', code: 'ROYAL20', discount_percent: 20, valid_until: '2026-11-30', max_uses: 50, used_count: 12, is_active: true },
    { id: 'c3', code: 'FIRSTLUXE', discount_percent: 10, valid_until: '2026-12-31', max_uses: 500, used_count: 142, is_active: true },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#D4AF37]" /> Promo Codes & Discounts
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">Manage executive discount coupons and promotional campaigns.</p>
        </div>

        <LuxuryButton variant="gold" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Create Promo Code
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Usage</th>
              <th className="py-3 px-4">Valid Until</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-[#D4AF37] font-heading text-sm">{c.code}</td>
                <td className="py-4 px-4 font-bold text-white">{c.discount_percent}% Off</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{c.used_count} / {c.max_uses} Uses</td>
                <td className="py-4 px-4 text-white/80">{c.valid_until}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCouponModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCouponAdded={(newC) => setCoupons((prev) => [newC, ...prev])}
      />
    </div>
  );
};
