'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Image } from '@imagekit/next';
import { Category } from '@/types';
import { deleteCategoryAction, updateCategoryAction } from '@/app/actions/adminActions';
import { Layers, Plus, Sparkles, Trash2, Pencil, Check, X } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

const AddCategoryModal = dynamic(() => import('./AddCategoryModal').then((m) => m.AddCategoryModal));

interface CategoriesManagerTableProps {
  categories: Category[];
  onCategoryAdded?: (category: Category) => void;
}

export const CategoriesManagerTable: React.FC<CategoriesManagerTableProps> = ({ categories, onCategoryAdded }) => {
  const [categoryList, setCategoryList] = useState(categories);
  const [modalOpen, setModalOpen] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Edit state (inline)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleCategoryAdded = (newCat: Category) => {
    setCategoryList((prev) => [newCat, ...prev]);
    if (onCategoryAdded) onCategoryAdded(newCat);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditDesc('');
  };

  const handleEditSave = async (catId: string) => {
    setEditLoading(true);
    const res = await updateCategoryAction({ id: catId, name: editName, description: editDesc });
    setEditLoading(false);

    if (res.success && res.category) {
      setCategoryList((prev) =>
        prev.map((c) => (c.id === catId ? { ...c, name: editName, description: editDesc } : c))
      );
      cancelEdit();
    } else {
      alert(res.error || 'Échec de la modification');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await deleteCategoryAction(deleteTarget.id);
    setDeleteLoading(false);

    if (res.success) {
      setCategoryList((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      alert(res.error || 'Échec de la suppression');
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
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Nom de la Catégorie</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {categoryList.map((cat) => (
              <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                {/* Image */}
                <td className="py-4 px-4">
                  {(cat as any).image_url ? (
                    <Image
                      src={(cat as any).image_url}
                      alt={cat.name}
                      width={96}
                      height={80}
                      className="w-12 h-10 object-cover rounded-lg border border-[rgba(212,175,55,0.2)]"
                    />
                  ) : (
                    <div className="w-12 h-10 rounded-lg border border-[rgba(212,175,55,0.1)] bg-[#0a0a0a] flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]/30" />
                    </div>
                  )}
                </td>

                {/* Name — editable */}
                <td className="py-4 px-4 font-bold text-white">
                  {editingId === cat.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                      autoFocus
                    />
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> {cat.name}
                    </span>
                  )}
                </td>

                {/* Slug */}
                <td className="py-4 px-4 font-mono text-[#D4AF37]">{cat.slug}</td>

                {/* Description — editable */}
                <td className="py-4 px-4 text-[#B6B6B6] max-w-[180px]">
                  {editingId === cat.id ? (
                    <input
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                    />
                  ) : (
                    <span className="truncate block">{cat.description || 'Collection exclusive'}</span>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === cat.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(cat.id)}
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
                          onClick={() => startEdit(cat)}
                          title="Modifier"
                          className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          title="Supprimer"
                          className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddCategoryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdded={handleCategoryAdded}
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Supprimer la Catégorie"
        message={`Supprimer définitivement "${deleteTarget?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
};
