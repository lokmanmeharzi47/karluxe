'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Brand } from '@/types';
import { Award, Plus, Trash2, Pencil, Check, X, Search, Globe, Sparkles } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { deleteBrandAction, updateBrandAction } from '@/app/actions/adminActions';

const AddBrandModal = dynamic(() => import('./AddBrandModal').then((m) => m.AddBrandModal));

interface BrandsManagerTableProps {
  brands: Brand[];
  onBrandAdded?: (brand: Brand) => void;
  onBrandDeleted?: (brandId: string) => void;
  onBrandUpdated?: (brand: Brand) => void;
}

export const BrandsManagerTable: React.FC<BrandsManagerTableProps> = ({
  brands,
  onBrandAdded,
  onBrandDeleted,
  onBrandUpdated,
}) => {
  const [brandList, setBrandList] = useState<Brand[]>(brands);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Sync state when props change
  useEffect(() => {
    setBrandList(brands);
  }, [brands]);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Edit state (inline)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleBrandAdded = (newBrand: Brand) => {
    setBrandList((prev) => [newBrand, ...prev.filter((b) => b.id !== newBrand.id)]);
    if (onBrandAdded) {
      onBrandAdded(newBrand);
    }
  };

  const startEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setEditName(brand.name);
    setEditCountry(brand.country || 'Italie / Allemagne');
    setEditDesc(brand.description || '');
    setEditLogoUrl(brand.logo_url || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCountry('');
    setEditDesc('');
    setEditLogoUrl('');
  };

  const handleEditSave = async (brandId: string) => {
    setEditLoading(true);
    const res = await updateBrandAction({
      id: brandId,
      name: editName,
      country: editCountry,
      description: editDesc,
      logoUrl: editLogoUrl,
    });
    setEditLoading(false);

    if (res.success && res.brand) {
      const updated = res.brand as Brand;
      setBrandList((prev) => prev.map((b) => (b.id === brandId ? { ...b, ...updated } : b)));
      if (onBrandUpdated) onBrandUpdated(updated);
      cancelEdit();
    } else {
      alert(res.error || 'Échec de la modification de la marque');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await deleteBrandAction(deleteTarget.id);
    setDeleteLoading(false);

    if (res.success) {
      setBrandList((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      if (onBrandDeleted) onBrandDeleted(deleteTarget.id);
      setDeleteTarget(null);
    } else {
      alert(res.error || 'Échec de la suppression');
    }
  };

  // Filtered brands based on search
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brandList;
    const q = searchQuery.toLowerCase().trim();
    return brandList.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.country && b.country.toLowerCase().includes(q)) ||
        b.slug.toLowerCase().includes(q)
    );
  }, [brandList, searchQuery]);

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      {/* Header with Title, Counter & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading uppercase text-white tracking-tight flex items-center gap-2">
              Gestion des Marques Automobiles
            </h3>
            <p className="text-xs text-[#B6B6B6]">
              Catalogue officiel des constructeurs de prestige certifiés KarLuxe
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            {brandList.length} Marques
          </span>
          <LuxuryButton
            variant="gold"
            size="sm"
            onClick={() => setModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Ajouter une Marque
          </LuxuryButton>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B6B6B6]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une marque (ex: Ferrari, Porsche, Royaume-Uni...)"
          className="w-full bg-[#050505] border border-[rgba(212,175,55,0.2)] rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B6B6B6] hover:text-white text-xs"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Logo & Marque</th>
              <th className="py-3 px-4">Pays d'Origine</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {filteredBrands.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#B6B6B6] text-xs">
                  Aucune marque trouvée.
                </td>
              </tr>
            ) : (
              filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-white/5 transition-colors group">
                  {/* Logo & Name */}
                  <td className="py-4 px-4 font-bold text-white">
                    <div className="flex items-center gap-3">
                      {/* Logo Container */}
                      <div className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/15 p-2 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-all">
                        {brand.logo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={brand.logo_url}
                            alt={brand.name}
                            className="w-full h-full object-contain filter invert brightness-125 group-hover:brightness-150 group-hover:scale-105 transition-all drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
                            loading="lazy"
                          />
                        ) : (
                          <Sparkles className="w-4 h-4 text-[#D4AF37]/40" />
                        )}
                      </div>

                      {/* Name — Editable */}
                      {editingId === brand.id ? (
                        <div className="space-y-1 w-full max-w-[200px]">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                            placeholder="Nom"
                            autoFocus
                          />
                          <input
                            value={editLogoUrl}
                            onChange={(e) => setEditLogoUrl(e.target.value)}
                            className="bg-[#050505] border border-[#D4AF37]/20 rounded-lg px-2 py-0.5 text-[#B6B6B6] text-[10px] focus:outline-none focus:border-[#D4AF37] w-full"
                            placeholder="URL du logo ImageKit"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                            {brand.name}
                          </span>
                          <span className="text-[10px] text-[#777] font-mono">
                            ID: {brand.id.slice(0, 8)}...
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Country — Editable */}
                  <td className="py-4 px-4 text-[#B6B6B6]">
                    {editingId === brand.id ? (
                      <input
                        value={editCountry}
                        onChange={(e) => setEditCountry(e.target.value)}
                        className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-28"
                        placeholder="Pays"
                      />
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                        {brand.country || 'Italie / Allemagne'}
                      </span>
                    )}
                  </td>

                  {/* Slug */}
                  <td className="py-4 px-4 font-mono text-[#D4AF37] font-semibold">{brand.slug}</td>

                  {/* Description — Editable */}
                  <td className="py-4 px-4 text-[#B6B6B6] max-w-[220px]">
                    {editingId === brand.id ? (
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                        placeholder="Description"
                      />
                    ) : (
                      <span className="truncate block" title={brand.description || ''}>
                        {brand.description || 'Constructeur automobile de prestige'}
                      </span>
                    )}
                  </td>

                  {/* Statut */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                      Certifié KarLuxe
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === brand.id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(brand.id)}
                            disabled={editLoading}
                            title="Enregistrer"
                            className="p-2 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer"
                          >
                            {editLoading ? (
                              <span className="animate-spin w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full block" />
                            ) : (
                              <Check className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={cancelEdit}
                            title="Annuler"
                            className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-white/30 hover:text-white transition-all cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(brand)}
                            title="Modifier"
                            className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(brand)}
                            title="Supprimer la marque"
                            className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddBrandModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdded={handleBrandAdded}
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Supprimer la Marque"
        message={`Supprimer définitivement la marque "${deleteTarget?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
};
