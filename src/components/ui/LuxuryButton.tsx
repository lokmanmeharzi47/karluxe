import React from 'react';

interface LuxuryButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  // The hover lift / tap press used to come from framer-motion. As CSS they cost
  // nothing at runtime and let this button render on the server.
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-full cursor-pointer select-none overflow-hidden hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none';

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs font-semibold gap-2',
    md: 'px-7 py-3.5 text-sm font-semibold gap-2.5',
    lg: 'px-9 py-4.5 text-base font-bold gap-3',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#D4AF37] via-[#E8C65A] to-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]',
    outline: 'border border-[rgba(212,175,55,0.4)] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]',
    glass: 'bg-[#111111]/70 backdrop-blur-xl border border-[rgba(212,175,55,0.2)] text-white hover:border-[#D4AF37]/60 hover:bg-[#111111]/90',
    ghost: 'text-[#B6B6B6] hover:text-[#D4AF37] hover:bg-white/5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
