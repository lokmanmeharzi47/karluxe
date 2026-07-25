'use client';

import React, { useState } from 'react';
import { addLocationAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2 } from 'lucide-react';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationAdded: (newLoc: any) => void;
}

export const AddLocationModal: React.FC<AddLocationModalProps> = ({
  isOpen,
  onClose,
  onLocationAdded,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [isAirport, setIsAirport] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await addLocationAction({
      name,
      city,
      country,
      address,
      isAirport,
    });

    setLoading(false);
    if (res.success && res.location) {
      onLocationAdded(res.location);
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to add rental location');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Add VIP Delivery Location" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Location Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Monaco VIP Heliport Hub"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                City
              </label>
              <input
                type="text"
                required
                placeholder="Monaco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Country
              </label>
              <input
                type="text"
                required
                placeholder="Monaco"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Full Address
            </label>
            <input
              type="text"
              required
              placeholder="Avenue des Ligures, 98000 Monaco"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="airport"
              checked={isAirport}
              onChange={(e) => setIsAirport(e.target.checked)}
              className="accent-[#D4AF37]"
            />
            <label htmlFor="airport" className="text-xs text-white font-semibold">
              Is Airport / Private Jet Runway Terminal
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <LuxuryButton variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </LuxuryButton>
          <LuxuryButton
            variant="gold"
            size="sm"
            type="submit"
            disabled={loading}
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {loading ? 'Adding...' : 'Save Location'}
          </LuxuryButton>
        </div>
      </form>
    </LuxuryModal>
  );
};
