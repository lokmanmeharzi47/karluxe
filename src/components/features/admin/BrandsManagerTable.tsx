'use client';

import React, { useState } from 'react';
import { Brand } from '@/types';
import { ShieldCheck, Plus, Award } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { AddBrandModal } from './AddBrandModal';

interface BrandsManagerTableProps {
  brands: Brand[];
}

export const BrandsManagerTable: React.FC<BrandsManagerTableProps> = ({ brands }) => {
  const [brandList, setBrandList] = useState(brands);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBrandAdded = (newBrand: Brand) => {
    setBrandList((prev) => [newBrand, ...prev]);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4AF37]" /> Gestion des Marques Automobiles
        </h3>
        <LuxuryButton
          variant="gold"
          size="sm"
          onClick={() => setModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Ajouter une Marque
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Marque</th>
              <th className="py-3 px-4">Pays d'Origine</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {brandList.map((brand) => (
              <tr key={brand.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                  {brand.logo_url && (
                    <img src={brand.logo_url} alt={brand.name} className="w-6 h-6 object-contain rounded-md" />
                  )}
                  {brand.name}
                </td>
                <td className="py-4 px-4 text-[#B6B6B6]">{brand.country || 'Italie / Allemagne'}</td>
                <td className="py-4 px-4 font-mono text-[#D4AF37]">{brand.slug}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Certifié KarLuxe
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddBrandModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={handleBrandAdded}
      />
    </div>
  );
};
