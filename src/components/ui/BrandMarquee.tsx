'use client';

import React from 'react';
import Image from 'next/image';
import { defaultLogos } from './CarLogos';

interface BrandMarqueeProps {
  brands: { id: string; name: string; logo_url?: string | null }[];
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands }) => {
  // Duplicate enough for seamless loop
  const displayBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Wide fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-[#060606] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-[#060606] to-transparent pointer-events-none" />

      <div className="flex animate-brand-marquee whitespace-nowrap items-center" style={{ gap: '5rem' }}>
        {displayBrands.map((brand, index) => {
          const brandKey = brand.name.toLowerCase();
          const localLogoPath = defaultLogos[brandKey];
          const logoUrl = localLogoPath || null;

          return (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center justify-center shrink-0 cursor-pointer group"
              style={{ minWidth: '140px' }}
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={brand.name}
                  width={80}
                  height={80}
                  className="object-contain transition-all duration-500 ease-out"
                  style={{
                    height: '80px',
                    width: 'auto',
                    filter: 'grayscale(100%) brightness(1.8)',
                    opacity: 0.45,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(1) drop-shadow(0 0 20px rgba(212,175,55,0.3))';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) brightness(1.8)';
                    e.currentTarget.style.opacity = '0.45';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              ) : (
                <span
                  className="font-bold uppercase whitespace-nowrap transition-all duration-500"
                  style={{
                    fontSize: '1.1rem',
                    letterSpacing: '0.25em',
                    color: 'rgba(255,255,255,0.25)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#D4AF37';
                    e.currentTarget.style.textShadow = '0 0 20px rgba(212,175,55,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes brandMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-brand-marquee {
          display: flex;
          width: max-content;
          animation: brandMarquee 30s linear infinite;
        }
        .animate-brand-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
