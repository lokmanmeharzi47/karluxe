'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { LuxuryButton } from '../ui/LuxuryButton';
import { CurrencySwitcher } from './CurrencySwitcher';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Flotte Supercars', href: '/fleet' },
    { name: 'Services VIP', href: '/#services' },
    { name: 'Mariages', href: '/#wedding' },
    { name: 'Avis Clients', href: '/#testimonials' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
        ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[rgba(212,175,55,0.2)] py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-2 lg:px-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/logoheader.png"
              alt="Karluxe Logo"
              className="w-16 h-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 glass-panel px-8 py-2.5 rounded-full border border-[rgba(212,175,55,0.2)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 ${isActive ? 'text-[#D4AF37]' : 'text-white/80 hover:text-[#D4AF37]'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Currency Switcher Dropdown */}
            <CurrencySwitcher />

            <Link href="/booking">
              <LuxuryButton variant="gold" size="sm" icon={<Shield className="w-4 h-4" />}>
                Réserver
              </LuxuryButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <CurrencySwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl glass-panel text-white hover:text-[#D4AF37] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[rgba(212,175,55,0.2)] mt-4 px-6 py-6 bg-[#050505]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-white/90 hover:text-[#D4AF37] py-2 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}



              <div className="pt-2">
                <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                  <LuxuryButton variant="gold" size="md" className="w-full">
                    Réserver un Véhicule
                  </LuxuryButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
