'use client';

import React, { useState, useRef } from 'react';
import { upload } from '@imagekit/next';
import { Brand, Category } from '@/types';
import { addCarAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Coins, ImagePlus, X } from 'lucide-react';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: Brand[];
  categories: Category[];
  locations: any[];
  onCarAdded: (newCar: any) => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  brands,
  categories,
  locations,
  onCarAdded,
}) => {
  const [title, setTitle] = useState('');
  const [brandId, setBrandId] = useState(brands[0]?.id || '');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [year, setYear] = useState(2025);
  const [dailyRateEur, setDailyRateEur] = useState(3000);
  const [deposit, setDeposit] = useState(6000);
  const [transmission, setTransmission] = useState<'Automatic' | 'Dual-Clutch' | 'Manual'>('Dual-Clutch');
  const [seats, setSeats] = useState(2);
  const [agentName, setAgentName] = useState('');
  const [location, setLocation] = useState(locations?.[0]?.name || 'Alger');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live currency conversion
  const dailyRateDzd = Math.round(dailyRateEur * 240);
  const dailyRateUsd = Math.round(dailyRateEur * 1.08);
  const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
  const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

  const isAllowedImageFile = (file: File) => {
    const mimeType = (file.type || '').toLowerCase();
    if (ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) return true;

    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    return ALLOWED_IMAGE_EXTENSIONS.has(extension);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files)
      .filter(isAllowedImageFile)
      .slice(0, 5);
    setImageFiles(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews(previews);
  };

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setTitle('');
    setBrandId(brands[0]?.id || '');
    setCategoryId(categories[0]?.id || '');
    setYear(2025);
    setDailyRateEur(3000);
    setDeposit(6000);
    setTransmission('Dual-Clutch');
    setSeats(2);
    setAgentName('');
    setLocation(locations?.[0]?.name || 'Alger');
    setDescription('');
    setImageFiles([]);
    setImagePreviews([]);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (imageFiles.length === 0) throw new Error('Veuillez sélectionner au moins une image.');

      const uploadPromises = imageFiles.map(async (file) => {
        const authResponse = await fetch('/api/upload-auth');
        const { token, signature, expire } = await authResponse.json();
        const result = await upload({
          file,
          fileName: file.name,
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
          signature,
          token,
          expire,
          folder: '/fleet',
        });
        return result.url || '';
      });

      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

      const res = await addCarAction({
        title,
        brandId: brandId || brands[0]?.id,
        categoryId: categoryId || categories[0]?.id,
        year: Number(year),
        dailyRate: Number(dailyRateEur),
        securityDeposit: Number(deposit),
        transmission,
        seats: Number(seats),
        location,
        description,
        featuredImage: uploadedUrls[0],
        additionalImages: uploadedUrls.slice(1),
        agentName,
      });

      setLoading(false);
      if (res.success && res.car) {
        onCarAdded(res.car);
        resetForm();
        onClose();
      } else {
        setErrorMsg(res.error || 'Échec de l\'ajout du véhicule');
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.message || 'Erreur lors de l\'upload ou de l\'ajout');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Ajouter un Véhicule à la Flotte" maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Title */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Titre du Véhicule</label>
            <input
              type="text"
              required
              placeholder="ex: McLaren 750S Spider"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Marque</label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Catégorie</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Daily Rate */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold flex items-center justify-between mb-1">
              <span>Tarif Journalier (DA)</span>
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
            </label>
            <input
              type="number"
              required
              value={dailyRateDzd}
              onChange={(e) => setDailyRateEur(Number(e.target.value) / 240)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
              <span className="text-[#D4AF37] font-semibold">€{dailyRateEur.toLocaleString('de-DE', { maximumFractionDigits: 0 })}</span>
              <span className="text-emerald-400 font-semibold">${dailyRateUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          {/* Security Deposit */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Caution (DA)</label>
            <input
              type="number"
              required
              value={deposit * 240}
              onChange={(e) => setDeposit(Number(e.target.value) / 240)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Model Year */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Année Modèle</label>
            <input
              type="number"
              required
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Transmission */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Transmission</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as any)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Automatic">Automatique</option>
              <option value="Dual-Clutch">Double Embrayage</option>
              <option value="Manual">Manuelle</option>
            </select>
          </div>

          {/* Seats */}
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Nombre de Places</label>
            <input
              type="number"
              required
              min={1}
              max={9}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Agency */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Agence Assignée
            </label>
            <select
              required
              value={agentName}
              onChange={(e) => { setAgentName(e.target.value); setLocation(e.target.value); }}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="" disabled>Sélectionner une agence...</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-2">
              Photos du Véhicule (max 5)
            </label>

            {imagePreviews.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-2">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group w-20 h-16">
                    <img src={src} alt="" className="w-20 h-16 object-cover rounded-lg border border-[rgba(212,175,55,0.2)]" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-0.5 left-0.5 text-[8px] bg-[#D4AF37] text-black font-bold rounded px-1">COVER</span>
                    )}
                  </div>
                ))}
                {imagePreviews.length < 5 && (
                  <label htmlFor="car-images-upload" className="w-20 h-16 rounded-lg border-2 border-dashed border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] flex items-center justify-center cursor-pointer transition-colors">
                    <ImagePlus className="w-5 h-5 text-[#D4AF37]/50 hover:text-[#D4AF37]" />
                  </label>
                )}
              </div>
            ) : (
              <label
                htmlFor="car-images-upload"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] rounded-xl cursor-pointer bg-[#050505] hover:bg-[#0a0a0a] transition-all group"
              >
                <ImagePlus className="w-6 h-6 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors mb-1" />
                <span className="text-xs text-[#B6B6B6] group-hover:text-[#D4AF37] transition-colors font-semibold">Cliquer pour ajouter des photos</span>
                <span className="text-[10px] text-[#666] mt-0.5">JPG, PNG, WEBP · Max 5 photos</span>
              </label>
            )}

            <input
              ref={fileInputRef}
              id="car-images-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">Description du Véhicule</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le véhicule, ses équipements, ses caractéristiques..."
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <LuxuryButton variant="ghost" size="sm" type="button" onClick={onClose}>
            Annuler
          </LuxuryButton>
          <LuxuryButton
            variant="gold"
            size="sm"
            type="submit"
            disabled={loading}
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {loading ? 'Ajout en cours...' : 'Ajouter à la Flotte'}
          </LuxuryButton>
        </div>
      </form>
    </LuxuryModal>
  );
};
