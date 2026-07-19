import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        if (!state.items.find(i => i.productId === item.productId)) {
          return { items: [...state.items, item] };
        }
        return state;
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      isInWishlist: (productId) => {
        return get().items.some(i => i.productId === productId);
      }
    }),
    {
      name: 'luxury-wishlist-storage',
    }
  )
);
