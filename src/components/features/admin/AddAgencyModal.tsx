'use client';

import React, { useState } from 'react';
import { Location } from '@/types';
import { addAgencyAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Plus } from 'lucide-react';

interface AddAgencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (agency: Location) => void;
}

export const AddAgencyModal: React.FC<AddAgencyModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('16 - Alger');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await addAgencyAction({ name, city, address, phone });
    setLoading(false);

    if (res.success && res.agency) {
      onAdded(res.agency as Location);
      setName('');
      setAddress('');
      setPhone('');
      onClose();
    } else {
      setErrorMsg(res.error || 'Échec de la création de l\'agence');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Ajouter Une Agence de Location">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Nom de l'Agence
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Agence Alger Centre, Agence Oran Aéroport..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Ville / Wilaya
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="ex: 16 - Alger, 31 - Oran, 25 - Constantine..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Adresse Complète
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="ex: Boulevard Mohamed V, Alger..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Téléphone Direct Agence (Optionnel)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0555555555"
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <LuxuryButton
          variant="gold"
          size="md"
          className="w-full mt-4"
          type="submit"
          disabled={loading}
          icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        >
          {loading ? 'Création...' : 'Créer L\'Agence'}
        </LuxuryButton>
      </form>
    </LuxuryModal>
  );
};
