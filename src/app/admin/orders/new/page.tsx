import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewOrderPage() {
  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 border border-outline-variant rounded-md text-secondary hover:text-primary hover:bg-surface-variant transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-headline-md text-headline-md">Créer une commande</h1>
            <p className="text-secondary font-body-sm mt-1">Saisie manuelle d'une nouvelle commande client</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm">
          <Save size={18} />
          Créer la commande
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Détails du client</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom complet</label>
                <input type="text" placeholder="Ex: Amina Benali" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Téléphone</label>
                <input type="tel" placeholder="Ex: 0555 12 34 56" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Adresse complète</label>
              <textarea rows={2} placeholder="Rue, Bâtiment, etc." className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Wilaya</label>
                <select className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                  <option>16 - Alger</option>
                  <option>31 - Oran</option>
                  <option>25 - Constantine</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Commune</label>
                <input type="text" placeholder="Ex: Hydra" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Produits</h2>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Sélectionner un produit</label>
              <select className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option>Choisir un produit...</option>
                <option>Caftan en Soie Brodée - 172,000 DA</option>
                <option>Midnight Velvet Abaya - 285,000 DA</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Logistique</h2>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Mode de livraison</label>
              <select className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option>Livraison à domicile (Yalidine)</option>
                <option>Point relais (Yalidine)</option>
                <option>Retrait en boutique</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Paiement</label>
              <select className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option>Paiement à la livraison</option>
                <option>Virement bancaire (CCP)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
