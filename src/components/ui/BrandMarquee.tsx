'use client';

import React from 'react';

interface BrandMarqueeProps {
  brands: { id: string; name: string; logo_url?: string | null }[];
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands }) => {
  const displayBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-[#0A0A0A] border-y border-[rgba(212,175,55,0.15)]">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
        {displayBrands.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-[rgba(212,175,55,0.3)] transition-all duration-300 group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-widest font-heading uppercase text-[#B6B6B6] group-hover:text-[#D4AF37] transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
