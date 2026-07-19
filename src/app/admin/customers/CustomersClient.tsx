'use client';

import { Search, Filter, Download, Mail, Phone, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  total: string;
  lastOrder: string;
  status: string;
};

export default function CustomersClient({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Clients</h1>
          <p className="text-secondary font-body-sm mt-1">Gérer les profils clients, l'historique des achats et l'engagement</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-on-surface font-body-md rounded-md hover:bg-surface-variant transition-colors">
          <Download size={18} />
          Exporter CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-variant/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par nom, email ou téléphone..." 
              className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="border border-outline-variant rounded-md px-3 py-2 text-sm bg-white focus:outline-none">
              <option>Tous les clients</option>
              <option>VIP (5+ Commandes)</option>
              <option>Actif</option>
              <option>Inactif</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md text-sm hover:bg-surface-variant transition-colors bg-white">
              <Filter size={16} />
              Filtres
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left font-body-sm whitespace-nowrap">
            <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                </th>
                <th className="px-4 py-4">Nom du client</th>
                <th className="px-4 py-4">Coordonnées</th>
                <th className="px-4 py-4 text-center">Commandes</th>
                <th className="px-4 py-4 text-right">Total dépensé</th>
                <th className="px-4 py-4">Dernière commande</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {customers.map((customer, i) => (
                <tr key={i} className="hover:bg-surface-variant/30 transition-colors group">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                        {customer.name ? customer.name.split(' ').map(n => n[0]).join('').substring(0,2) : '?'}
                      </div>
                      <div>
                        <p className="font-medium text-on-surface">{customer.name || 'Sans Nom'}</p>
                        <p className="text-secondary text-[10px] font-mono">{customer.id.substring(0,8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-on-surface">
                        <Mail size={12} className="text-secondary" /> {customer.email || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-on-surface">
                        <Phone size={12} className="text-secondary" /> {customer.phone || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingBag size={14} className="text-secondary" />
                      <span className="font-medium">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-bold">{customer.total}</td>
                  <td className="px-4 py-4 text-secondary">{customer.lastOrder}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' : 
                        customer.status === 'Actif' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="p-1.5 text-primary hover:bg-surface-variant rounded transition-colors opacity-0 group-hover:opacity-100" title="Voir le profil">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-secondary">
                    Aucun client trouvé.
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
