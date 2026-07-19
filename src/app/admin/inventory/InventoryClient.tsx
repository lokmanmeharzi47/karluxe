"use client";

import { Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCw, Download } from "lucide-react";

export type InventoryItem = {
  sku: string;
  name: string;
  variant: string;
  inStock: number;
  reserved: number;
  incoming: number;
  status: string;
};

export default function InventoryClient({ inventory, summary }: { inventory: InventoryItem[], summary: any }) {
  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Gestion des stocks</h1>
          <p className="text-secondary font-body-sm mt-1">Suivez les niveaux de stock, les réservations et les arrivages</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert("L'exportation de l'inventaire en CSV commencera sous peu.")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-on-surface font-body-md rounded-md hover:bg-surface-variant transition-colors"
          >
            <Download size={18} />
            Exporter le stock
          </button>
          <button 
            onClick={() => alert("Synchronisation de l'inventaire avec la base de données réussie.")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm"
          >
            <RefreshCw size={18} />
            Mettre à jour le stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Total en stock</p>
            <p className="font-headline-md text-body-lg">{summary.totalInStock.toLocaleString('en-US')} Unités</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Articles en stock faible</p>
            <p className="font-headline-md text-body-lg text-orange-600">{summary.lowStockCount} articles</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <ArrowDownRight size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Rupture de stock</p>
            <p className="font-headline-md text-body-lg text-red-600">{summary.outOfStockCount} articles</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-variant/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par SKU ou nom de produit..." 
              className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="border border-outline-variant rounded-md px-3 py-2 text-sm bg-white focus:outline-none">
              <option>Tout l'inventaire</option>
              <option>Stock faible</option>
              <option>Rupture de stock</option>
              <option>Arrivages</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md text-sm hover:bg-surface-variant transition-colors bg-white">
              <Filter size={16} />
              Filtres
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm whitespace-nowrap">
            <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4">SKU / Variante</th>
                <th className="px-4 py-4">Nom du produit</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4 text-right">En stock</th>
                <th className="px-4 py-4 text-right text-orange-600">Réservé</th>
                <th className="px-4 py-4 text-right text-blue-600">Arrivages</th>
                <th className="px-4 py-4 text-right">Disponible</th>
                <th className="px-4 py-4 text-center">Ajuster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {inventory.map((item, i) => {
                const available = item.inStock - item.reserved;
                return (
                  <tr key={i} className="hover:bg-surface-variant/30 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-mono text-primary font-bold">{item.sku}</p>
                      <p className="text-secondary text-xs">{item.variant}</p>
                    </td>
                    <td className="px-4 py-4 font-medium text-on-surface">{item.name}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                        ${item.status === 'En stock' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Stock faible' ? 'bg-orange-100 text-orange-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">{item.inStock}</td>
                    <td className="px-4 py-4 text-right text-orange-600">{item.reserved}</td>
                    <td className="px-4 py-4 text-right text-blue-600">{item.incoming}</td>
                    <td className={`px-4 py-4 text-right font-bold ${available <= 0 ? 'text-red-600' : available <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                      {available}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => alert(`Ajustement du stock pour: ${item.name}`)}
                        className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant transition-colors text-xs font-medium"
                      >
                        Mettre à jour
                      </button>
                    </td>
                  </tr>
                );
              })}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-secondary">
                    Aucun produit trouvé dans l'inventaire.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant flex items-center justify-between text-sm text-secondary">
          <p>Affichage de 1 à {Math.min(inventory.length, 50)} sur {summary.totalVariants} variantes</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant" disabled>Préc</button>
            <button className="px-3 py-1 bg-primary text-on-primary rounded">1</button>
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant">2</button>
            <span className="px-2 py-1">...</span>
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant">Suiv</button>
          </div>
        </div>
      </div>
    </div>
  );
}
