import React from 'react';
import { Reveal } from './Reveal';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <Reveal>
      <div
        className={`glass-panel rounded-2xl p-6 ${hoverEffect ? 'glass-panel-hover' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    </Reveal>
  );
};
