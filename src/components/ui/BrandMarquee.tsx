import React from 'react';
import { getBrandLogoUrl } from './CarLogos';

interface BrandMarqueeProps {
  brands: { id: string; name: string; logo_url?: string | null }[];
}

const normalizeLogoUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.includes('ik.imagekit.io') && url.includes('.svg') && !url.includes('tr=')) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}tr=orig-true`;
  }
  return url;
};

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands }) => {
  // Seamless loop with exactly two passes
  const displayBrands = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Wide fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-r from-[#060606] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-[#060606] to-transparent pointer-events-none" />

      <div className="flex animate-brand-marquee whitespace-nowrap items-center" style={{ gap: '6rem' }}>
        {displayBrands.map((brand, index) => {
          const rawLogoUrl = brand.logo_url || getBrandLogoUrl(brand.name) || null;
          const logoUrl = normalizeLogoUrl(rawLogoUrl);

          return (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center justify-center shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-110"
              style={{ minWidth: '180px' }}
              title={brand.name}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={brand.name}
                  width={160}
                  height={80}
                  loading="lazy"
                  className="brand-logo"
                />
              ) : (
                <span className="brand-wordmark font-bold uppercase whitespace-nowrap text-lg">
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

