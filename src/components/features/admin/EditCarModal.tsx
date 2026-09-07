'use client';

import React, { useState, useRef, useEffect } from 'react';
import { upload } from '@imagekit/next';
import { CarWithDetails, Brand, Category } from '@/types';
import { updateCarAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Loader2, Coins, ImagePlus, X, Gauge, Zap, CheckCircle2, XCircle, Star } from 'lucide-react';

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarWithDetails;
  brands: Brand[];
  categories: Category[];
  locations: any[];
  onCarUpdated: (updatedCar: CarWithDetails) => void;
}

export const EditCarModal: React.FC<EditCarModalProps> = ({
  isOpen,
  onClose,
  car,
  brands,
  categories,
  locations,
  onCarUpdated,
}) => {
  // Identity & Location
  const [title, setTitle] = useState(car.title || '');
  const [brandId, setBrandId] = useState(car.brand_id || brands[0]?.id || '');
  const [categoryId, setCategoryId] = useState(car.category_id || categories[0]?.id || '');
  const [year, setYear] = useState(car.year || 2025);
  const [agentName, setAgentName] = useState(car.agent_name || locations?.[0]?.name || 'Alger');
  const [location, setLocation] = useState(car.location || locations?.[0]?.name || 'Alger');

  // Pricing & Terms (Stored in EUR in DB, displayed in DZD)
  const [dailyRateEur, setDailyRateEur] = useState(car.daily_rate || 100);
  const [depositEur, setDepositEur] = useState(car.security_deposit || 2000);

  // Status
  const [isAvailable, setIsAvailable] = useState<boolean>(car.is_available ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(car.is_featured ?? false);

  // Technical Specs
  const [transmission, setTransmission] = useState<'Automatic' | 'Dual-Clutch' | 'Manual'>(
    (car.transmission as any) || 'Dual-Clutch'
  );
  const [seats, setSeats] = useState(car.seats || 2);
  const [fuelType, setFuelType] = useState(car.fuel_type || 'Gasoline');
  const [horsepower, setHorsepower] = useState(car.horsepower || 0);
  const [acceleration, setAcceleration] = useState(car.acceleration || '3.0s');
  const [topSpeed, setTopSpeed] = useState(car.top_speed || '320 km/h');
  const [engine, setEngine] = useState(car.engine || 'V8 Bi-Turbo');
  const [description, setDescription] = useState(car.description || '');

  // Image Management: Existing Image URLs + New Files
  const initialExistingImages = React.useMemo(() => {
    const list: string[] = [];
    if (car.featured_image) list.push(car.featured_image);
    if (car.vehicle_images && car.vehicle_images.length > 0) {
      car.vehicle_images.forEach((img) => {
        if (img.url && !list.includes(img.url)) {
          list.push(img.url);
        }
      });
    }
    return list;
  }, [car]);

  const [existingImages, setExistingImages] = useState<string[]>(initialExistingImages);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset/sync state when car changes
  useEffect(() => {
    setTitle(car.title || '');
    setBrandId(car.brand_id || brands[0]?.id || '');
    setCategoryId(car.category_id || categories[0]?.id || '');
    setYear(car.year || 2025);
    setAgentName(car.agent_name || locations?.[0]?.name || 'Alger');
    setLocation(car.location || locations?.[0]?.name || 'Alger');
    setDailyRateEur(car.daily_rate || 100);
    setDepositEur(car.security_deposit || 2000);
    setIsAvailable(car.is_available ?? true);
    setIsFeatured(car.is_featured ?? false);
    setTransmission((car.transmission as any) || 'Dual-Clutch');
    setSeats(car.seats || 2);
    setFuelType(car.fuel_type || 'Gasoline');
    setHorsepower(car.horsepower || 0);
    setAcceleration(car.acceleration || '3.0s');
    setTopSpeed(car.top_speed || '320 km/h');
    setEngine(car.engine || 'V8 Bi-Turbo');
    setDescription(car.description || '');
    setExistingImages(initialExistingImages);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setErrorMsg('');
  }, [car, brands, categories, locations, initialExistingImages]);

  // Live currency conversion
  const dailyRateDzd = Math.round(dailyRateEur * 240);
  const dailyRateUsd = Math.round(dailyRateEur * 1.08);

  const totalImageCount = existingImages.length + newImageFiles.length;

  const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
  const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);

  const getSafeImageUrl = (url: string | undefined): string => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (/^blob:[a-zA-Z0-9-.:/]+$/i.test(trimmed) || /^https:\/\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/i.test(trimmed)) {
      return encodeURI(trimmed);
    }
    return '';
  };

  const isAllowedImageFile = (file: File) => {
    const mimeType = (file.type || '').toLowerCase();
    if (ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) return true;
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    return ALLOWED_IMAGE_EXTENSIONS.has(extension);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const remainingSlots = 5 - totalImageCount;
    if (remainingSlots <= 0) return;

    const newFiles = Array.from(e.target.files).filter(isAllowedImageFile).slice(0, remainingSlots);
    setNewImageFiles((prev) => [...prev, ...newFiles]);
    setNewImagePreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeExistingImage = (indexToRemove: number) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const removeNewImage = (indexToRemove: number) => {
    setNewImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setNewImagePreviews((prev) => {
      const toRevoke = prev[indexToRemove];
      if (toRevoke && toRevoke.startsWith('blob:')) {
        URL.revokeObjectURL(toRevoke);
      }
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (existingImages.length === 0 && newImageFiles.length === 0) {
        throw new Error('Veuillez conserver ou ajouter au moins une photo pour le véhicule.');
      }

      // 1. Upload new images to ImageKit if any
      let newlyUploadedUrls: string[] = [];
      if (newImageFiles.length > 0) {
        const uploadPromises = newImageFiles.map(async (file) => {
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
        newlyUploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);
      }

      // 2. Final image list: existing kept + newly uploaded
      const allImages = [...existingImages, ...newlyUploadedUrls];
      const featuredImage = allImages[0];
      const additionalImages = allImages.slice(1);

      // 3. Call updateCarAction
      const res = await updateCarAction({
        id: car.id,
        title,
        brandId: brandId || brands[0]?.id,
        categoryId: categoryId || categories[0]?.id,
        year: Number(year),
        dailyRate: Number(dailyRateEur),
        securityDeposit: Number(depositEur),
        transmission,
        fuelType,
        seats: Number(seats),
        horsepower: Number(horsepower),
        acceleration,
        topSpeed,
        engine,
        location,
        description,
        isFeatured,
        isAvailable,
        agentName,
        featuredImage,
        additionalImages,
      });

      setLoading(false);
      if (res.success && res.car) {
        onCarUpdated(res.car);
        onClose();
      } else {
        setErrorMsg(res.error || 'Échec de la modification du véhicule');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Erreur lors de la mise à jour');
    }
  };

  return (
    <LuxuryModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Modifier Supercar — ${car.title}`}
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* ─── SECTION 1: IDENTITY & AGENCY ─── */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
            Identité du Véhicule &amp; Agence
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Titre du Véhicule
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Porsche 911 GT3 RS"
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Model Year */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Année Modèle
              </label>
              <input
                type="number"
                required
                min={1990}
                max={2030}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Marque Constructeur
              </label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Catégorie
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned Agency */}
            <div className="sm:col-span-2">
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Agence Assignée / Localisation
              </label>
              <select
                required
                value={agentName}
                onChange={(e) => {
                  setAgentName(e.target.value);
                  setLocation(e.target.value);
                }}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name} {loc.city ? `(${loc.city})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ─── SECTION 2: PRICING & STATUS ─── */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
            Tarification &amp; Statut Opérationnel
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <span className="text-[#D4AF37] font-semibold">
                  €{dailyRateEur.toLocaleString('de-DE', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-emerald-400 font-semibold">
                  ${dailyRateUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Caution / Security Deposit */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Caution de Sécurité (DA)
              </label>
              <input
                type="number"
                required
                value={Math.round(depositEur * 240)}
                onChange={(e) => setDepositEur(Number(e.target.value) / 240)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-[#B6B6B6]">
                Équivalent : <span className="ml-1 text-white font-semibold">€{Math.round(depositEur).toLocaleString('de-DE')}</span>
              </div>
            </div>

            {/* Operational Availability Toggle */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-2">
                Disponibilité Flotte
              </label>
              <button
                type="button"
                onClick={() => setIsAvailable((prev) => !prev)}
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isAvailable
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                }`}
              >
                {isAvailable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Véhicule Disponible à la Location
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> En Maintenance / Indisponible
                  </>
                )}
              </button>
            </div>

            {/* Featured Badge Toggle */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-2">
                Mise en Avant (Vedette)
              </label>
              <button
                type="button"
                onClick={() => setIsFeatured((prev) => !prev)}
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  isFeatured
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-white/10 bg-white/5 text-[#B6B6B6]'
                }`}
              >
                <Star className={`w-4 h-4 ${isFeatured ? 'fill-[#D4AF37]' : ''}`} />
                {isFeatured ? 'Supercar en Vedette (VIP Star)' : 'Non mise en avant'}
              </button>
            </div>
          </div>
        </div>

        {/* ─── SECTION 3: TECHNICAL & PERFORMANCE SPECS ─── */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
            <Gauge className="w-4 h-4" /> Spécifications Techniques &amp; Performances
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Transmission */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Boîte de Vitesses
              </label>
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
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Nombre de Places
              </label>
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

            {/* Fuel Type */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Carburant / Énergie
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Gasoline">Essence (Gasoline)</option>
                <option value="Hybrid">Hybride</option>
                <option value="Electric">100% Électrique</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Horsepower */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Puissance (ch / bhp)
              </label>
              <input
                type="number"
                min={0}
                value={horsepower}
                onChange={(e) => setHorsepower(Number(e.target.value))}
                placeholder="ex: 720"
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* 0-100 km/h */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Accélération 0-100 km/h
              </label>
              <input
                type="text"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                placeholder="ex: 2.8s"
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Top Speed */}
            <div>
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Vitesse Max (km/h)
              </label>
              <input
                type="text"
                value={topSpeed}
                onChange={(e) => setTopSpeed(e.target.value)}
                placeholder="ex: 340 km/h"
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Engine */}
            <div className="sm:col-span-3">
              <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
                Motorisation &amp; Cylindrée
              </label>
              <input
                type="text"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                placeholder="ex: V8 4.0L Bi-Turbo ou Flat-6 4.0L Atmosphérique"
                className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* ─── SECTION 4: PHOTO GALLERY (IMAGEKIT) ─── */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <Zap className="w-4 h-4" /> Galerie Photos ({totalImageCount} / 5)
            </h4>
            <span className="text-[10px] text-[#B6B6B6]">
              La 1ère image est la photo de couverture principale
            </span>
          </div>

          {/* Existing Photos Grid */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              {/* Existing Images */}
              {existingImages.map((src, idx) => {
                const safeSrc = getSafeImageUrl(src);
                if (!safeSrc) return null;
                const isCover = idx === 0;

                return (
                  <div
                    key={`existing-${idx}`}
                    className={`relative group rounded-xl overflow-hidden border ${
                      isCover
                        ? 'w-32 h-24 border-[#D4AF37]'
                        : 'w-24 h-20 border-white/10'
                    }`}
                  >
                    <img
                      src={safeSrc}
                      alt={`Photo existante ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      title="Supprimer cette photo"
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {isCover && (
                      <span className="absolute bottom-1 left-1 text-[9px] bg-[#D4AF37] text-black font-extrabold px-1.5 py-0.5 rounded shadow">
                        COUVERTURE
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Newly selected image previews */}
              {newImagePreviews.map((src, idx) => {
                const safeSrc = getSafeImageUrl(src);
                if (!safeSrc) return null;
                const isCover = existingImages.length === 0 && idx === 0;

                return (
                  <div
                    key={`new-${idx}`}
                    className={`relative group rounded-xl overflow-hidden border border-dashed ${
                      isCover
                        ? 'w-32 h-24 border-[#D4AF37]'
                        : 'w-24 h-20 border-emerald-500/50'
                    }`}
                  >
                    <img
                      src={safeSrc}
                      alt={`Nouvelle photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      title="Annuler l'ajout de cette photo"
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 right-1 text-[8px] bg-emerald-500 text-black font-bold px-1 rounded">
                      NOUVEAU
                    </span>
                    {isCover && (
                      <span className="absolute bottom-1 left-1 text-[9px] bg-[#D4AF37] text-black font-extrabold px-1.5 py-0.5 rounded shadow">
                        COUVERTURE
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Add More Photos trigger */}
              {totalImageCount < 5 && (
                <label
                  htmlFor="edit-car-images-upload"
                  className="w-24 h-20 rounded-xl border-2 border-dashed border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#050505] hover:bg-white/5"
                >
                  <ImagePlus className="w-5 h-5 text-[#D4AF37]/60 mb-1" />
                  <span className="text-[10px] text-[#B6B6B6] font-medium">+ Photo</span>
                </label>
              )}
            </div>

            <input
              ref={fileInputRef}
              id="edit-car-images-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* ─── SECTION 5: EDITORIAL DESCRIPTION ─── */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <label className="text-xs uppercase text-[#B6B6B6] font-semibold block">
            Description Détaillée du Véhicule
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Présentation des options, finitions intérieures, mode de conduite..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* ─── MODAL ACTIONS ─── */}
        <div className="pt-2 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a]/95 py-3 border-t border-white/5">
          <LuxuryButton variant="ghost" size="sm" type="button" onClick={onClose} disabled={loading}>
            Annuler
          </LuxuryButton>
          <LuxuryButton
            variant="gold"
            size="sm"
            type="submit"
            disabled={loading}
            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          >
            {loading ? 'Enregistrement des modifications...' : 'Enregistrer les Modifications'}
          </LuxuryButton>
        </div>
      </form>
    </LuxuryModal>
  );
};
