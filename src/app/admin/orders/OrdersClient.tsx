'use client';

import { Plus, Search, Filter, Download, MoreVertical } from "lucide-react";
import Link from "next/link";
import { updateOrderStatus } from "@/app/actions/orders";
import { useState } from "react";

type Order = {
  id: string;
  order_number: string;
  customer: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  delivery: string;
  payment: string;
  status: string;
  total: number;
  tracking: string;
};

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmée': return 'bg-purple-100 text-purple-800';
      case 'Confirmed': return 'bg-purple-100 text-purple-800';
      case 'En préparation': return 'bg-orange-100 text-orange-800';
      case 'Preparing': return 'bg-orange-100 text-orange-800';
      case 'Expédiée': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Livrée': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Annulée': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const originalStatus = orders.find(o => o.id === orderId)?.status;
    
    // Optimistic update
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    
    const result = await updateOrderStatus(orderId, newStatus);
    
    if (!result.success) {
      alert("Erreur: " + result.error);
      // Revert on error
      if (originalStatus) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: originalStatus } : o));
      }
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Gestion des commandes</h1>
          <p className="text-secondary font-body-sm mt-1">Gérer et suivre toutes les commandes clients</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert("L'exportation CSV commencera sous peu.")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-on-surface font-body-md rounded-md hover:bg-surface-variant transition-colors"
          >
            <Download size={18} />
            Exporter CSV
          </button>
          <Link 
            href="/admin/orders/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm"
          >
            <Plus size={18} />
            Créer une commande
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-t-xl border border-outline-variant border-b-0 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par ID de commande, Client, Téléphone..." 
            className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-surface-variant/50"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select className="border border-outline-variant rounded-md px-3 py-2 text-sm bg-white focus:outline-none">
            <option>Tous les statuts</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md text-sm hover:bg-surface-variant transition-colors">
            <Filter size={16} />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm whitespace-nowrap">
            <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4">ID de commande</th>
                <th className="px-4 py-4">Infos du client</th>
                <th className="px-4 py-4">Adresse de livraison</th>
                <th className="px-4 py-4">Méthode et Paiement</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-surface-variant/30 transition-colors">
                  <td className="px-4 py-4 font-bold text-primary">{order.order_number}</td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-on-surface">{order.customer}</p>
                    <p className="text-secondary text-xs">{order.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-on-surface">{order.wilaya}, {order.commune}</p>
                    <p className="text-secondary text-xs truncate max-w-[150px]">{order.address}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-on-surface text-xs font-medium">{order.delivery}</p>
                    <p className="text-secondary text-xs">{order.payment}</p>
                    {order.tracking && order.tracking !== "-" && <p className="text-blue-600 text-[10px] mt-1 font-mono">Trk: {order.tracking}</p>}
                  </td>
                  <td className="px-4 py-4 font-bold">{order.total} DA</td>
                  <td className="px-4 py-4">
                    <select 
                      className={`px-2 py-1 ${getStatusColor(order.status)} rounded-full text-xs font-bold border-0 focus:ring-0 cursor-pointer appearance-none outline-none`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending" className="bg-white text-black">En attente</option>
                      <option value="Confirmed" className="bg-white text-black">Confirmée</option>
                      <option value="Preparing" className="bg-white text-black">En préparation</option>
                      <option value="Shipped" className="bg-white text-black">Expédiée</option>
                      <option value="Delivered" className="bg-white text-black">Livrée</option>
                      <option value="Cancelled" className="bg-white text-black">Annulée</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="p-1 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface-variant">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-secondary">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
