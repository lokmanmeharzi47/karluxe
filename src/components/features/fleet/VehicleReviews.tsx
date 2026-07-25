'use client';

import React from 'react';
import { Review } from '@/types';
import { Star, ShieldCheck } from 'lucide-react';

interface VehicleReviewsProps {
  reviews: Review[];
}

export const VehicleReviews: React.FC<VehicleReviewsProps> = ({ reviews }) => {
  return (
    <div className="glass-panel rounded-3xl p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white">
          Client Feedback & Reviews
        </h3>
        <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-sm">
          <Star className="w-4 h-4 fill-[#D4AF37]" /> 5.0 / 5.0 Verified Score
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-xs text-[#B6B6B6]">No reviews written for this supercar yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-heading">{rev.author_name}</span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#B6B6B6] italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
