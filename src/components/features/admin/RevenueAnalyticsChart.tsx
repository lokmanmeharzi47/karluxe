'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export const RevenueAnalyticsChart: React.FC = () => {
  const months = [
    { month: 'Jan', revenue: 95000, height: '55%' },
    { month: 'Feb', revenue: 110000, height: '65%' },
    { month: 'Mar', revenue: 125000, height: '75%' },
    { month: 'Apr', revenue: 140000, height: '82%' },
    { month: 'May', revenue: 165000, height: '92%' },
    { month: 'Jun', revenue: 180000, height: '100%' },
  ];

  return (
    <GlassCard className="p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" /> Revenue & Booking Analytics
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">Monthly gross rental revenue performance growth (DA).</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#D4AF37]">
          <Calendar className="w-3.5 h-3.5" /> 2026 Fiscal Year
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-white/10">
        {months.map((m) => (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
            <span className="text-[10px] font-bold text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
              {(m.revenue / 1000).toFixed(0)}k DA
            </span>
            <div
              style={{ height: m.height }}
              className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#D4AF37]/20 via-[#D4AF37] to-[#E8C65A] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B6B6B6] mt-2">{m.month}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
