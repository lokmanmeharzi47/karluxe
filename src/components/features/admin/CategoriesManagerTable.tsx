'use client';

import React, { useState } from 'react';
import { Category } from '@/types';
import { Layers, Plus, Sparkles } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { AddCategoryModal } from './AddCategoryModal';

interface CategoriesManagerTableProps {
  categories: Category[];
  onCategoryAdded?: (category: Category) => void;
}

export const CategoriesManagerTable: React.FC<CategoriesManagerTableProps> = ({ categories, onCategoryAdded }) => {
  const [categoryList, setCategoryList] = useState(categories);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategoryAdded = (newCat: Category) => {
    setCategoryList((prev) => [newCat, ...prev]);
    if (onCategoryAdded) {
      onCategoryAdded(newCat);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" /> Gestion des Catégories
        </h3>
        <LuxuryButton
          variant="gold"
          size="sm"
          onClick={() => setModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Ajouter une Catégorie
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Nom de la Catégorie</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {categoryList.map((cat) => (
              <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {cat.name}
                </td>
                <td className="py-4 px-4 font-mono text-[#D4AF37]">{cat.slug}</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{cat.description || 'Collection exclusive'}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={handleCategoryAdded}
      />
    </div>
  );
};
