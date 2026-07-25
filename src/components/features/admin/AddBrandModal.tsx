'use client';

import React, { useState } from 'react';
import { upload } from '@imagekit/next';
import { Brand } from '@/types';
import { addBrandAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Plus } from 'lucide-react';

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (brand: Brand) => void;
}

export const AddBrandModal: React.FC<AddBrandModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Italie');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let uploadedLogoUrl = '';
      if (imageFile) {
        const authResponse = await fetch('/api/upload-auth');
        const { token, signature, expire } = await authResponse.json();

        const result = await upload({
          file: imageFile,
          fileName: imageFile.name,
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
          signature,
          token,
          expire,
          folder: '/brands',
        });
        uploadedLogoUrl = result.url || '';
      }

      const res = await addBrandAction({ name, country, logoUrl: uploadedLogoUrl });
      setLoading(false);

      if (res.success && res.brand) {
        onAdded(res.brand as Brand);
        setName('');
        setImageFile(null);
        onClose();
      } else {
        setErrorMsg(res.error || 'Échec de la création de la marque');
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.message || 'Error uploading image or adding brand');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Ajouter Une Marque Automobile">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Nom de la Marque
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Porsche, Ferrari, Lamborghini, Rolls-Royce..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Pays d'Origine
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="ex: Italie, Allemagne, Royaume-Uni..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
            Ajoute Image (ImageKit) (Optionnel)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
          {loading ? 'Création...' : 'Créer La Marque'}
        </LuxuryButton>
      </form>
    </LuxuryModal>
  );
};
