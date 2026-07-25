'use client';

import React from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import { Brand, Category } from '@/types';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';

interface FleetFiltersProps {
  brands: Brand[];
  categories: Category[];
}

export const FleetFilters: React.FC<FleetFiltersProps> = ({ brands, categories }) => {
  const {
    searchQuery,
    brandId,
    categoryId,
    maxPrice,
    transmission,
    fuelType,
    sortBy,
    setSearchQuery,
    setBrandId,
    setCategoryId,
    setPriceRange,
    setTransmission,
    setFuelType,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  return (
    <aside className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h3 className="text-lg font-bold font-heading uppercase text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#D4AF37]" /> Filter Fleet
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-[#B6B6B6] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
          Search Supercar
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Porsche 911, Ferrari..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-[#B6B6B6]/50 focus:outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-[#B6B6B6] absolute left-3 top-3.5" />
        </div>
      </div>

      {/* Brand Selector */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
          Automotive Brand
        </label>
        <select
          value={brandId || ''}
          onChange={(e) => setBrandId(e.target.value || null)}
          className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="">All Brands (Porsche, Ferrari...)</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Selector */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
          Vehicle Category
        </label>
        <select
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value || null)}
          className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="">All Categories (Sports, Luxury...)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Max Daily Rate Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-wider text-[#B6B6B6] font-semibold">Max Daily Rate</span>
          <span className="font-bold text-[#D4AF37]">€{maxPrice.toLocaleString()}/day</span>
        </div>
        <input
          type="range"
          min="1000"
          max="10000"
          step="500"
          value={maxPrice}
          onChange={(e) => setPriceRange(0, Number(e.target.value))}
          className="w-full accent-[#D4AF37] cursor-pointer"
        />
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
          Transmission
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Dual-Clutch', 'Automatic'].map((trans) => (
            <button
              key={trans}
              onClick={() => setTransmission(transmission === trans ? null : trans)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                transmission === trans
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#050505] text-[#B6B6B6] border-white/10 hover:border-[#D4AF37]/40'
              }`}
            >
              {trans}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
          Sort Order
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest Fleet Arrivals</option>
        </select>
      </div>
    </aside>
  );
};
