'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { createBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Identifiants invalides');
        setLoading(false);
        return;
      }

      // Successful Supabase Authentication
      if (data?.session) {
        // Session handling is managed by Supabase auth persistence.
        // Avoid storing authentication/user data in cleartext browser storage.
      }

      setLoading(false);
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Une erreur est survenue lors de la connexion');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 selection:bg-[#D4AF37] selection:text-black relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 border border-[rgba(212,175,55,0.3)] bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <Car className="w-6 h-6 text-black" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading uppercase text-white tracking-widest">
              Kar<span className="text-[#D4AF37]">Luxe</span>
            </h1>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mt-1">
              Portail Exécutif Administration Supabase
            </span>
          </div>
          <p className="text-xs text-[#B6B6B6] max-w-xs mx-auto">
            Accès sécurisé réservé aux directeurs de flotte et agents de conciergerie.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
              {errorMsg}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Email Administrateur
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@karluxe.com"
                  className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Mot de Passe Exécutif
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <Lock className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          <LuxuryButton
            variant="gold"
            size="lg"
            className="w-full mt-4"
            type="submit"
            disabled={loading}
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          >
            {loading ? 'Authentification Supabase...' : 'Connexion à l\'Admin'}
          </LuxuryButton>
        </form>

        <div className="pt-4 border-t border-white/10 text-center flex items-center justify-center gap-1.5 text-[10px] text-[#B6B6B6] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authentification Chiffrée Supabase Auth • KarLuxe
        </div>
      </div>
    </div>
  );
}
