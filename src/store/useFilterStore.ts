import { create } from 'zustand';
import { FilterState } from '@/types';

interface FilterStore extends FilterState {
  setSearchQuery: (query: string) => void;
  setBrandId: (brandId: string | null) => void;
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setTransmission: (transmission: string | null) => void;
  setFuelType: (fuelType: string | null) => void;
  setSeats: (seats: number | null) => void;
  setLocation: (location: string | null) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  resetFilters: () => void;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  brandId: null,
  categoryId: null,
  minPrice: 0,
  maxPrice: 10000,
  transmission: null,
  fuelType: null,
  seats: null,
  location: null,
  sortBy: 'popular',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilterState,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setBrandId: (brandId) => set({ brandId }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setTransmission: (transmission) => set({ transmission }),
  setFuelType: (fuelType) => set({ fuelType }),
  setSeats: (seats) => set({ seats }),
  setLocation: (location) => set({ location }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialFilterState),
}));
