'use client';

import React, { useState } from 'react';
import { Location } from '@/types';
import { MapPin, Plus, Building2 } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { AddAgencyModal } from './AddAgencyModal';

interface AgenciesManagerTableProps {
  agencies: Location[];
  onAgencyAdded?: (agency: Location) => void;
}

export const AgenciesManagerTable: React.FC<AgenciesManagerTableProps> = ({ agencies, onAgencyAdded }) => {
  const [agencyList, setAgencyList] = useState(agencies);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAgencyAdded = (newAgency: Location) => {
    setAgencyList((prev) => [newAgency, ...prev]);
    if (onAgencyAdded) {
      onAgencyAdded(newAgency);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#D4AF37]" /> Agences & Points de Prise en Charge
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
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {agencyList.map((ag) => (
              <tr key={ag.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {ag.name}
                </td>
                <td className="py-4 px-4 font-semibold text-[#D4AF37]">{ag.city}</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{ag.address}</td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Ouvert 24/7
                  </span>
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
    </div>
  );
};
