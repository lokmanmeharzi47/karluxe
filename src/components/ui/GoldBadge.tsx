import React from 'react';

interface GoldBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const GoldBadge: React.FC<GoldBadgeProps> = ({ children, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.15)] ${className}`}>
      {icon && <span className="text-[#D4AF37]">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
