'use client';

import React, { useState, useMemo } from 'react';
import { useFilterStore } from '@/store/useFilterStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Brand, Category } from '@/types';
import { Search, RotateCcw, Filter, ChevronDown, Check } from 'lucide-react';

interface FleetFiltersProps {
  brands: Brand[];
  categories: Category[];
}

export const FleetFilters: React.FC<FleetFiltersProps> = ({ brands, categories }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const {
    searchQuery,
    brandId,
    categoryId,
    maxPrice,
    transmission,
    sortBy,
    setSearchQuery,
    setBrandId,
    setCategoryId,
    setPriceRange,
    setTransmission,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  const { formatPrice } = useCurrencyStore();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (brandId) count++;
    if (categoryId) count++;
    if (transmission) count++;
    if (maxPrice < 10000) count++;
    if (sortBy !== 'popular') count++;
    return count;
  }, [searchQuery, brandId, categoryId, transmission, maxPrice, sortBy]);

  return (
    <aside className="glass-panel rounded-3xl p-4 sm:p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90">
      {/* Header / Mobile Toggle Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="text-base sm:text-lg font-bold font-heading uppercase text-white flex items-center gap-2 cursor-pointer lg:cursor-default"
          aria-expanded={isMobileOpen}
        >
          <Filter className="w-4 h-4 text-[#D4AF37]" />
          <span>Filtrer La Flotte</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D4AF37] text-black rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[#B6B6B6] lg:hidden transition-transform duration-300 ${
              isMobileOpen ? 'rotate-180 text-[#D4AF37]' : ''
            }`}
          />
        </button>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#B6B6B6] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="text-xs text-[#D4AF37] font-semibold lg:hidden px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 cursor-pointer transition-colors"
          >
            {isMobileOpen ? 'Masquer' : activeFilterCount > 0 ? 'Modifier' : 'Afficher'}
          </button>
        </div>
      </div>

      {/* Filter Body (collapsible on mobile, always visible on desktop) */}
      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-6 pt-5 lg:pt-6`}>
        {/* Search Bar */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
            Rechercher un Modèle
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ex. Porsche 911, Ferrari..."
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 pl-10 pr-4 text-base sm:text-xs text-white placeholder-[#B6B6B6]/50 focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-4 h-4 text-[#B6B6B6] absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Brand Selector */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
            Marque Automobile
          </label>
          <select
            value={brandId || ''}
            onChange={(e) => setBrandId(e.target.value || null)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-base sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Toutes les Marques (Porsche, Ferrari...)</option>
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
            Catégorie de Véhicule
          </label>
          <select
            value={categoryId || ''}
            onChange={(e) => setCategoryId(e.target.value || null)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-base sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">Toutes les Catégories (Sport, Luxe...)</option>
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
            <span className="uppercase tracking-wider text-[#B6B6B6] font-semibold">Tarif Max / Jour</span>
            <span className="font-bold text-[#D4AF37]">{formatPrice(maxPrice)}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={maxPrice}
            onChange={(e) => setPriceRange(0, Number(e.target.value))}
            className="w-full accent-[#D4AF37] cursor-pointer touch-pan-y"
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
                type="button"
                onClick={() => setTransmission(transmission === trans ? null : trans)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
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
            Ordre d'Affichage
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-3 px-4 text-base sm:text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="popular">Plus Populaires</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
            <option value="newest">Nouveautés Flotte</option>
          </select>
        </div>

        {/* Mobile Close / Apply Button */}
        <div className="pt-2 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="w-full py-3 rounded-xl bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#E8C65A] transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Appliquer & Voir les Véhicules</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
