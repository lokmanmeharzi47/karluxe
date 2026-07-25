'use client';

import React from 'react';
import { CarWithDetails } from '@/types';
import { FleetCard } from '../home/FleetCard';

interface UserWishlistProps {
  favorites: CarWithDetails[];
}

export const UserWishlist: React.FC<UserWishlistProps> = ({ favorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center border border-white/10">
        <h3 className="text-lg font-bold font-heading uppercase text-white">Your Wishlist is Empty</h3>
        <p className="text-xs text-[#B6B6B6] mt-2">
          Save your favorite supercars by clicking the heart icon on any vehicle card.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {favorites.map((car) => (
        <FleetCard key={car.id} car={car} />
      ))}
    </div>
  );
};
