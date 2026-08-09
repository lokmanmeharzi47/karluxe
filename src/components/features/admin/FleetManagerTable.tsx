'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Image } from '@imagekit/next';
import { CarWithDetails, Brand, Category } from '@/types';
import { toggleCarAvailabilityAction, deleteCarAction } from '@/app/actions/adminActions';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

const AddCarModal = dynamic(() => import('./AddCarModal').then((m) => m.AddCarModal));
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { CheckCircle2, XCircle, Plus, Car, Trash2, Pencil } from 'lucide-react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface FleetManagerTableProps {
  cars: CarWithDetails[];
  brands?: Brand[];
  categories?: Category[];
  locations?: any[];
  onCarAdded?: (car: CarWithDetails) => void;
}

export const FleetManagerTable: React.FC<FleetManagerTableProps> = ({
  cars,
  brands = [],
  categories = [],
  locations = [],
  onCarAdded,
}) => {
  const [carList, setCarList] = useState(cars);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CarWithDetails | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { formatPrice } = useCurrencyStore();

  const handleToggle = async (carId: string, currentStatus: boolean) => {
    setLoadingId(carId);
    const newStatus = !currentStatus;
    const res = await toggleCarAvailabilityAction(carId, newStatus);
    setLoadingId(null);

    if (res.success) {
      setCarList((prev) =>
        prev.map((c) => (c.id === carId ? { ...c, is_available: newStatus } : c))
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await deleteCarAction(deleteTarget.id);
    setDeleteLoading(false);

    if (res.success) {
      setCarList((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } else {
      alert(res.error || 'Échec de la suppression');
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.2)] bg-[#111111]/90 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-[#D4AF37]" /> Fleet Availability &amp; Supercar Controls
          </h3>
          <p className="text-xs text-[#B6B6B6] mt-1">Manage supercar status, location hubs, daily rates, and maintenance.</p>
        </div>

        <LuxuryButton variant="gold" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Add Supercar
        </LuxuryButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="uppercase text-[#B6B6B6] border-b border-white/10 font-semibold">
            <tr>
              <th className="py-3 px-4">Supercar</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Daily Rate</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {carList.map((car) => (
              <tr key={car.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                  <Image src={car.featured_image} alt={car.title} width={96} height={72} className="w-12 h-9 rounded-lg object-cover" />
                  {car.title}
                </td>
                <td className="py-4 px-4 text-[#D4AF37] font-semibold">{car.brands?.name || 'Supercar'}</td>
                <td className="py-4 px-4 font-bold text-white">{formatPrice(car.daily_rate)}/day</td>
                <td className="py-4 px-4 text-[#B6B6B6]">{car.location}</td>
                <td className="py-4 px-4">
                  {car.is_available ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                      <XCircle className="w-3 h-3" /> In Maintenance
                    </span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* Toggle availability */}
                    <button
                      disabled={loadingId === car.id}
                      onClick={() => handleToggle(car.id, car.is_available ?? false)}
                      className="px-3 py-1.5 rounded-xl border border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer text-[10px] font-semibold uppercase"
                    >
                      {loadingId === car.id ? '...' : car.is_available ? 'Maintenance' : 'Disponible'}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteTarget(car)}
                      title="Supprimer"
                      className="p-2 rounded-xl border border-white/10 text-[#B6B6B6] hover:border-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddCarModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          brands={brands}
          categories={categories}
          locations={locations}
          onCarAdded={(newCar) => {
            setCarList((prev) => [newCar, ...prev]);
            if (onCarAdded) onCarAdded(newCar);
          }}
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Supprimer le Véhicule"
        message={`Supprimer définitivement "${deleteTarget?.title}" ? Cette action est irréversible.`}
      />
    </div>
  );
};
