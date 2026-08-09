'use client';

import React, { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms before the element animates in once it enters the viewport. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span';
}

/**
 * Fade/slide-in-on-scroll wrapper.
 *
 * Stands in for framer-motion's `whileInView` at roughly a thousandth of the
 * bundle cost. Children are passed through untouched, so a server component can
 * wrap server-rendered markup in this without pulling that markup into the
 * client bundle.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Older browsers get the content immediately rather than a blank box.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};
