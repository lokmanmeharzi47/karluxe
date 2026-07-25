'use client';

import React, { useState } from 'react';
import { upload } from '@imagekit/next';
import { Brand, Category } from '@/types';
import { addCarAction } from '@/app/actions/adminActions';
import { LuxuryModal } from '@/components/ui/LuxuryModal';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { Car, Loader2, Coins } from 'lucide-react';

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
  const [fuelType, setFuelType] = useState<'Gasoline' | 'Hybrid' | 'Electric' | 'Twin-Turbo V8' | 'V12'>('Twin-Turbo V8');
  const [seats, setSeats] = useState(2);
  const [acceleration, setAcceleration] = useState('2.8s 0-100 km/h');
  const [topSpeed, setTopSpeed] = useState('330 km/h');
  const [horsepower, setHorsepower] = useState(720);
  const [engine, setEngine] = useState('4.0L Twin-Turbo V8');
  const [location, setLocation] = useState(locations?.[0]?.name || 'Monaco');
  const [description, setDescription] = useState('');
  const [agentName, setAgentName] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Currency Conversions
  const dailyRateDzd = Math.round(dailyRateEur * 240); // 1 EUR = 240 DZD (DA)
  const dailyRateUsd = Math.round(dailyRateEur * 1.08); // 1 EUR = 1.08 USD ($)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file) => {
          const authResponse = await fetch('/api/upload-auth');
          const { token, signature, expire } = await authResponse.json();

          const result = await upload({
            file: file,
            fileName: file.name,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            signature,
            token,
            expire,
            folder: '/fleet',
          });
          return result.url || '';
        });

        const results = await Promise.all(uploadPromises);
        uploadedImageUrls = results.filter(url => url !== '');
      } else {
        throw new Error("Veuillez sélectionner au moins une image.");
      }

      const res = await addCarAction({
        title,
        brandId: brandId || brands[0]?.id,
        categoryId: categoryId || categories[0]?.id,
        year: Number(year),
        dailyRate: Number(dailyRateEur),
        securityDeposit: Number(deposit),
        transmission,
        fuelType,
        seats: Number(seats),
        acceleration,
        topSpeed,
        horsepower: Number(horsepower),
        engine,
        location,
        description,
        featuredImage: uploadedImageUrls[0],
        additionalImages: uploadedImageUrls.slice(1),
        agentName,
      });

      setLoading(false);
      if (res.success && res.car) {
        onCarAdded(res.car);
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to add supercar to fleet');
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.message || 'Error uploading image or adding car');
    }
  };

  return (
    <LuxuryModal isOpen={isOpen} onClose={onClose} title="Add New Supercar to Fleet" maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Supercar Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. McLaren 750S Spider"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Brand
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

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Category
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

          {/* Daily Rate Input with Multi-Currency Live Preview */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1 flex items-center justify-between">
              <span>Daily Rate (DA)</span>
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
            </label>
            <input
              type="number"
              required
              value={dailyRateDzd}
              onChange={(e) => setDailyRateEur(Number(e.target.value) / 240)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
            />

            {/* Converted Currencies Live Badge */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
              <span className="text-[#D4AF37] font-semibold">
                Euro: €{dailyRateEur.toLocaleString('de-DE', { maximumFractionDigits: 0 })}
              </span>
              <span className="text-emerald-400 font-semibold">
                Dollar: ${dailyRateUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Security Deposit (DA)
            </label>
            <input
              type="number"
              required
              value={deposit * 240}
              onChange={(e) => setDeposit(Number(e.target.value) / 240)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Model Year
            </label>
            <input
              type="number"
              required
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Transmission
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as any)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Automatic">Automatic</option>
              <option value="Dual-Clutch">Dual-Clutch</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Fuel / Powertrain
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as any)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
              <option value="Twin-Turbo V8">Twin-Turbo V8</option>
              <option value="V12">V12</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Seating Capacity
            </label>
            <input
              type="number"
              required
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              0-100 km/h (Acceleration)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2.8s"
              value={acceleration}
              onChange={(e) => setAcceleration(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Top Speed
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 330 km/h"
              value={topSpeed}
              onChange={(e) => setTopSpeed(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Engine
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 4.0L Twin-Turbo V8"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Horsepower (HP)
            </label>
            <input
              type="number"
              required
              value={horsepower}
              onChange={(e) => setHorsepower(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Agence Assignée (Sera notifiée sur Telegram & Sheets)
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
              <option value="" disabled>Sélectionner une agence...</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>



          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Ajoute Image (ImageKit) - Max 5
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={(e) => {
                if (e.target.files) {
                  // Limit to 5 files maximum
                  const files = Array.from(e.target.files).slice(0, 5);
                  setImageFiles(files);
                }
              }}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            {imageFiles.length > 0 && (
              <p className="mt-2 text-[10px] text-gray-400">
                {imageFiles.length} fichier(s) sélectionné(s). {imageFiles.length > 5 ? '(Seuls les 5 premiers seront utilisés)' : ''}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Vehicle Description
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State-of-the-art aerodynamics, twin-turbo V8 output..."
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
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
            {loading ? 'Adding Vehicle...' : 'Add Vehicle to Fleet'}
          </LuxuryButton>
        </div>
      </form>
    </LuxuryModal>
  );
};
