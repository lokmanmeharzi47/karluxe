'use client';

import React, { useState } from 'react';
import { Location } from '@/types';
import { deleteAgencyAction, updateAgencyAction } from '@/app/actions/adminActions';
import { MapPin, Plus, Building2, Trash2, Pencil, Check, X } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { AddAgencyModal } from './AddAgencyModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AgenciesManagerTableProps {
  agencies: Location[];
  onAgencyAdded?: (agency: Location) => void;
}

export const AgenciesManagerTable: React.FC<AgenciesManagerTableProps> = ({ agencies, onAgencyAdded }) => {
  const [agencyList, setAgencyList] = useState(agencies);
  const [modalOpen, setModalOpen] = useState(false);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Location | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Edit state (inline)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleAgencyAdded = (newAgency: Location) => {
    setAgencyList((prev) => [newAgency, ...prev]);
    if (onAgencyAdded) onAgencyAdded(newAgency);
  };

  const startEdit = (ag: Location) => {
    setEditingId(ag.id);
    setEditName(ag.name);
    setEditCity(ag.city || '');
    setEditAddress(ag.address || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCity('');
    setEditAddress('');
  };

  const handleEditSave = async (agId: string) => {
    setEditLoading(true);
    const res = await updateAgencyAction({ id: agId, name: editName, city: editCity, address: editAddress });
    setEditLoading(false);

    if (res.success && res.agency) {
      setAgencyList((prev) =>
        prev.map((a) =>
          a.id === agId ? { ...a, name: editName, city: editCity, address: editAddress } : a
        )
      );
      cancelEdit();
    } else {
      alert(res.error || 'Échec de la modification');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await deleteAgencyAction(deleteTarget.id);
    setDeleteLoading(false);

    if (res.success) {
      setAgencyList((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      alert(res.error || 'Échec de la suppression');
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#D4AF37]" /> Agences &amp; Points de Prise en Charge
        </h3>
        <LuxuryButton
          variant="gold"
          size="sm"
          onClick={() => setModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Ajouter une Agence
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Nom de l'Agence</th>
              <th className="py-3 px-4">Ville / Wilaya</th>
              <th className="py-3 px-4">Adresse</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {agencyList.map((ag) => (
              <tr key={ag.id} className="hover:bg-white/5 transition-colors">
                {/* Name */}
                <td className="py-4 px-4 font-bold text-white">
                  {editingId === ag.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                      autoFocus
                    />
                  ) : (
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> {ag.name}
                    </span>
                  )}
                </td>

                {/* City */}
                <td className="py-4 px-4 font-semibold text-[#D4AF37]">
                  {editingId === ag.id ? (
                    <input
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                    />
                  ) : (
                    ag.city
                  )}
                </td>

                {/* Address */}
                <td className="py-4 px-4 text-[#B6B6B6] max-w-[200px]">
                  {editingId === ag.id ? (
                    <input
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="bg-[#050505] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-[#D4AF37] w-full"
                    />
                  ) : (
                    <span className="truncate block">{ag.address}</span>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Ouvert 24/7
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === ag.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(ag.id)}
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
                          onClick={() => startEdit(ag)}
                          title="Modifier"
                          className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(ag)}
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

      <AddAgencyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={handleAgencyAdded}
      />

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Supprimer l'Agence"
        message={`Supprimer définitivement "${deleteTarget?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
};
