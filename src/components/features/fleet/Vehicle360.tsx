'use client';

import React, { useState } from 'react';
import { RotateCw, Sparkles } from 'lucide-react';
import { GoldBadge } from '@/components/ui/GoldBadge';

interface Vehicle360Props {
  image: string;
  title: string;
}

export const Vehicle360: React.FC<Vehicle360Props> = ({ image, title }) => {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <GoldBadge icon={<Sparkles className="w-3.5 h-3.5" />}>
          360° Exterior Visualizer
        </GoldBadge>
        <span className="text-xs text-[#B6B6B6] flex items-center gap-1">
          <RotateCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" /> Interactive Rotation
        </span>
      </div>

      <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
        <img
          src={image}
          alt={title}
          style={{ transform: `rotateY(${rotation}deg) scale(1.05)` }}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Rotation Range Controls */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-[#B6B6B6]">
          <span>Front Profile (0°)</span>
          <span>Side View (180°)</span>
          <span>Rear Profile (360°)</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="w-full accent-[#D4AF37] cursor-pointer"
        />
      </div>
    </div>
  );
};
