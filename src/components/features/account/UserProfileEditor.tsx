'use client';

import React, { useState } from 'react';
import { Profile } from '@/types';
import { updateProfileAction } from '@/app/actions/accountActions';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { User, Mail, Phone, FileText, CheckCircle2, Loader2 } from 'lucide-react';

interface UserProfileEditorProps {
  profile: Profile | null;
}

export const UserProfileEditor: React.FC<UserProfileEditorProps> = ({ profile }) => {
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [license, setLicense] = useState(profile?.driver_license_number || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');

    const res = await updateProfileAction({
      fullName,
      phone,
      driverLicenseNumber: license,
    });

    setLoading(false);
    if (res.success) {
      setSuccess(true);
    } else {
      setErrorMsg(res.error || 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <h3 className="text-xl font-bold font-heading uppercase text-white">
        Profile Settings & Verification
      </h3>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Driver's License Number
          </label>
          <input
            type="text"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder="DL-98214-MC"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="pt-2">
        <LuxuryButton
          variant="gold"
          size="md"
          type="submit"
          disabled={loading}
          icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
        >
          {loading ? 'Saving Changes...' : 'Save Profile Changes'}
        </LuxuryButton>
      </div>
    </form>
  );
};
