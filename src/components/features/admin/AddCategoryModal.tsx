'use client';

import React, { useState, useRef } from 'react';
import { upload } from '@imagekit/next';
import { Category } from '@/types';
import { addCategoryAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Plus, ImagePlus, X } from 'lucide-react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: (cat: Category) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let uploadedImageUrl = '';
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
          folder: '/categories',
        });
        uploadedImageUrl = result.url || '';
      }

      const res = await addCategoryAction({ name, description, imageUrl: uploadedImageUrl });
      setLoading(false);

      if (res.success && res.category) {
        onAdded(res.category as Category);
        setName('');
        setDescription('');
        setImageFile(null);
        setImagePreview(null);
        onClose();
      } else {
        setErrorMsg(res.error || 'Échec de la création');
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.message || "Erreur lors de l'upload ou de la création");
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

        {/* Image Upload Field */}
        <div>
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-2">
            Image de la Catégorie (Optionnel)
          </label>

          {imagePreview ? (
            <div className="relative w-full rounded-xl overflow-hidden border border-[rgba(212,175,55,0.3)] group">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-rose-600/80 hover:bg-rose-600 text-white rounded-full p-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="category-image-upload"
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] rounded-xl cursor-pointer bg-[#050505] hover:bg-[#0a0a0a] transition-all group"
            >
              <ImagePlus className="w-6 h-6 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors mb-2" />
              <span className="text-xs text-[#B6B6B6] group-hover:text-[#D4AF37] transition-colors font-semibold">
                Cliquer pour ajouter une image
              </span>
              <span className="text-[10px] text-[#666] mt-1">PNG, JPG, WEBP · Max 10 MB</span>
            </label>
          )}

          <input
            ref={fileInputRef}
            id="category-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
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
