'use client';

import React, { useState } from 'react';
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
  onCarAdded: (newCar: any) => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({
  isOpen,
  onClose,
  brands,
  categories,
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
  const [location, setLocation] = useState('Monaco');
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Currency Conversions
  const dailyRateDzd = Math.round(dailyRateEur * 240); // 1 EUR = 240 DZD (DA)
  const dailyRateUsd = Math.round(dailyRateEur * 1.08); // 1 EUR = 1.08 USD ($)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

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
      featuredImage,
    });

    setLoading(false);
    if (res.success && res.car) {
      onCarAdded(res.car);
      onClose();
    } else {
      setErrorMsg(res.error || 'Failed to add supercar to fleet');
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
              <span>Daily Rate (€ EUR)</span>
              <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
            </label>
            <input
              type="number"
              required
              value={dailyRateEur}
              onChange={(e) => setDailyRateEur(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
            />

            {/* Converted Currencies Live Badge */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
              <span className="text-[#D4AF37] font-semibold">
                Dinar: {dailyRateDzd.toLocaleString('fr-DZ')} DA
              </span>
              <span className="text-emerald-400 font-semibold">
                Dollar: ${dailyRateUsd.toLocaleString('en-US')}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Security Deposit (€)
            </label>
            <input
              type="number"
              required
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Location Hub
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Monaco">Monaco</option>
              <option value="Dubai">Dubai</option>
              <option value="Paris">Paris</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Zurich">Zurich</option>
            </select>
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

          <div>
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              0-100 km/h Acceleration
            </label>
            <input
              type="text"
              required
              value={acceleration}
              onChange={(e) => setAcceleration(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs uppercase text-[#B6B6B6] font-semibold block mb-1">
              Featured Image Unsplash URL
            </label>
            <input
              type="url"
              required
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
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
