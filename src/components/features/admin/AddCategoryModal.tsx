'use client';

import React, { useState } from 'react';
import { Category } from '@/types';
import { addCategoryAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Plus } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (cat: Category) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await addCategoryAction({ name, description });
    setLoading(false);

    if (res.success && res.category) {
      onAdded(res.category as Category);
      setName('');
      setDescription('');
      onClose();
    } else {
      setErrorMsg(res.error || 'Échec de la création');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Ajouter Une Catégorie de Prestige">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Nom de la Catégorie
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: SUV de Luxe, Supercars Sportives, Cabriolets..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de la catégorie..."
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
          {loading ? 'Création...' : 'Créer La Catégorie'}
        </LuxuryButton>
      </form>
    </LuxuryModal>
  );
};
