import React from 'react';
import { Reveal } from './Reveal';
import { GoldBadge } from './GoldBadge';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignStyles[align]} ${className}`}>
      {badge && (
        <Reveal className="mb-4">
          <GoldBadge>{badge}</GoldBadge>
        </Reveal>
      )}

      <Reveal delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight font-heading gold-gradient-text">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={200}>
          <p className="mt-4 text-base sm:text-lg text-[#B6B6B6] max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};
