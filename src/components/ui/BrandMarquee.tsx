import React from 'react';
import Image from 'next/image';
import { defaultLogos } from './CarLogos';

interface BrandMarqueeProps {
  brands: { id: string; name: string; logo_url?: string | null }[];
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands }) => {
  // The keyframe translates the track by -50%, so exactly two passes are needed
  // for a seamless loop. It used to render four, which both broke the loop point
  // and quadrupled the logo markup.
  const displayBrands = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Wide fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-[#060606] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-[#060606] to-transparent pointer-events-none" />

      <div className="flex animate-brand-marquee whitespace-nowrap items-center" style={{ gap: '5rem' }}>
        {displayBrands.map((brand, index) => {
          const logoUrl = defaultLogos[brand.name.toLowerCase()] || null;

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
                  width={160}
                  height={80}
                  sizes="160px"
                  loading="lazy"
                  className="brand-logo"
                />
              ) : (
                <span className="brand-wordmark font-bold uppercase whitespace-nowrap">
                  {brand.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
