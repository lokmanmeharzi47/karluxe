"use client";

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('@/utils/supabase/config');
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4 py-12">
      <div className="max-w-lg w-full bg-white p-10 md:p-14 border border-gray-100 shadow-sm">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-black mb-4">Admin Portal</h2>
          <p className="text-[15px] text-[#8A6E3B] font-medium max-w-[280px] mx-auto leading-relaxed">
            Enter your credentials to access the secure administrative dashboard.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-8">
            <div>
              <label className="block text-[11px] font-semibold text-[#8A6E3B] uppercase tracking-[0.15em] mb-2">
                Admin Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-1 py-2 border-b border-gray-200 placeholder-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-semibold text-[#8A6E3B] uppercase tracking-[0.15em] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-1 py-2 border-b border-gray-200 placeholder-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent text-sm"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 text-xs font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none transition-colors disabled:bg-gray-300 uppercase tracking-[0.15em]"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
