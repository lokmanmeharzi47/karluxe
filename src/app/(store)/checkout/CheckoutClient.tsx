"use client";

import { Phone, MessageCircle, Mail, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { submitCheckout } from "@/app/actions/store";
import Link from "next/link";
import { StoreSettings } from "@/lib/storeSettings";
import wilayaCommunes from "@/data/wilaya_communes.json";
import { pricingData } from "@/lib/shippingData";

export default function CheckoutClient({ storeSettings }: { storeSettings: StoreSettings }) {
  const [selectedDelivery, setSelectedDelivery] = useState<'domicile' | 'yalidine'>('domicile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  const communes = selectedWilaya ? (wilayaCommunes as Record<string, string[]>)[selectedWilaya] || [] : [];
  
  const shippingFee = selectedWilaya && pricingData[selectedWilaya] 
    ? (selectedDelivery === 'domicile' ? pricingData[selectedWilaya].home : pricingData[selectedWilaya].office)
    : 0;

  const finalTotal = total + shippingFee;

  async function handleCheckout(formData: FormData) {
    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    formData.append('delivery_method', selectedDelivery);
    
    const res = await submitCheckout(formData, items, finalTotal, shippingFee);
    
    setIsSubmitting(false);

    if (res.success) {
      setOrderSuccess(res.order_number as string);
      clearCart();
    } else {
      setError(res.error as string);
    }
  }

  if (orderSuccess) {
    return (
      <main className="pt-32 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto bg-background flex justify-center">
        <div id="thank-you-section" className="flex flex-col items-center text-center mt-20 max-w-2xl">
          <div className="w-16 h-16 rounded-full border border-secondary flex items-center justify-center mb-8">
             <span className="material-symbols-outlined text-secondary text-[32px]">check</span>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-display-lg text-primary mb-6">
            Merci pour votre commande
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-lg leading-relaxed mb-6">
            Votre commande <strong className="text-primary">{orderSuccess}</strong> a été enregistrée avec succès. Notre équipe va la préparer avec le plus grand soin.
          </p>
          <Link href="/">
            <button className="px-10 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#C8A96A] transition-colors">
              Retour à l'accueil
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto bg-background flex flex-col lg:flex-row gap-12 justify-center">
      
      {/* Checkout Form */}
      <div className="w-full lg:w-[60%]">
        <form action={handleCheckout}>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Détails du client</h2>
          
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6 font-body-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Nom complet *</label>
              <input 
                name="full_name"
                type="text" 
                required
                placeholder="Votre nom complet"
                className="border border-outline-variant bg-transparent px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Adresse e-mail</label>
              <input 
                name="email"
                type="email" 
                placeholder="Optionnel"
                className="border border-outline-variant bg-transparent px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Numéro de téléphone *</label>
              <input 
                name="phone"
                type="tel" 
                required
                placeholder="ex: 0555 00 00 00"
                className="border border-outline-variant bg-transparent px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Pays</label>
              <div className="relative">
                <select 
                  name="country"
                  defaultValue="Algérie"
                  className="w-full border border-outline-variant bg-transparent px-4 py-3 font-body-md text-primary appearance-none focus:outline-none focus:border-primary"
                >
                  <option>Algérie</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Wilaya *</label>
              <div className="relative">
                <select 
                  name="wilaya"
                  required
                  value={selectedWilaya}
                  onChange={(e) => {
                    setSelectedWilaya(e.target.value);
                    setSelectedCommune(''); // Reset commune when wilaya changes
                  }}
                  className="w-full border border-outline-variant bg-transparent px-4 py-3 font-body-md text-primary appearance-none focus:outline-none focus:border-primary"
                >
                  <option value="" disabled>Sélectionner une wilaya</option>
                  {Object.keys(wilayaCommunes).map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex flex-col relative">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Commune *</label>
              <div className="relative">
                <select 
                  name="commune"
                  required
                  value={selectedCommune}
                  onChange={(e) => setSelectedCommune(e.target.value)}
                  disabled={!selectedWilaya}
                  className="w-full border border-outline-variant bg-transparent px-4 py-3 font-body-md text-primary appearance-none focus:outline-none focus:border-primary disabled:opacity-50"
                >
                  <option value="" disabled>Sélectionner une commune</option>
                  {communes.map((c: string) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="font-label-caps text-label-caps tracking-[0.1em] uppercase text-primary mb-2">Adresse de livraison *</label>
              <input 
                name="address"
                type="text" 
                required
                placeholder="Rue, Quartier, Bâtiment..."
                className="border border-outline-variant bg-transparent px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Delivery Method */}
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Mode de livraison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div 
              className={`flex flex-col cursor-pointer transition-opacity ${selectedDelivery === 'domicile' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectedDelivery('domicile')}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary text-[24px]">home</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedDelivery === 'domicile' ? 'border-primary' : 'border-outline-variant'}`}>
                  {selectedDelivery === 'domicile' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Livraison à domicile</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Service premium en porte-à-porte sous 3 à 5 jours ouvrables.
              </p>
            </div>

            <div 
              className={`flex flex-col cursor-pointer transition-opacity ${selectedDelivery === 'yalidine' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectedDelivery('yalidine')}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedDelivery === 'yalidine' ? 'border-primary' : 'border-outline-variant'}`}>
                  {selectedDelivery === 'yalidine' && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Point relais Yalidine</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Récupérez votre colis dans votre centre Yalidine local à votre convenance.
              </p>
            </div>
          </div>

          {/* Order Action */}
          <div className="flex justify-center mb-20">
            <button 
              type="submit" 
              disabled={isSubmitting || items.length === 0}
              className="w-full md:w-auto px-16 py-5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#C8A96A] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </div>
        </form>

        {/* Support Section */}
        <div className="mt-16 pt-16 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center bg-surface p-8 rounded-lg">
          <div>
            <h3 className="font-headline-md text-headline-sm text-primary mb-2">Besoin d'aide ?</h3>
            <p className="font-body-sm text-on-surface-variant mb-6 md:mb-0">Notre équipe est à votre disposition pour vous assister dans votre commande.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href={`tel:${storeSettings.phoneNumber.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <Phone size={18} />
              <span className="font-body-sm">{storeSettings.phoneNumber}</span>
            </a>
            <a href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <MessageCircle size={18} />
              <span className="font-body-sm">WhatsApp</span>
            </a>
            <a href={`mailto:${storeSettings.emailAddress}`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
              <Mail size={18} />
              <span className="font-body-sm">Nous écrire</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cart Summary Side */}
      <div className="w-full lg:w-[40%]">
        <div className="bg-surface-variant p-8 sticky top-32">
          <h2 className="font-headline-md text-headline-sm mb-6 pb-4 border-b border-outline-variant">Résumé de la commande</h2>
          
          <div className="divide-y divide-outline-variant mb-6 max-h-[400px] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="py-4 flex gap-4">
                <div className="w-16 h-20 bg-surface flex-shrink-0 relative">
                  {item.image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-body-md font-bold">{item.name}</h4>
                  <p className="text-sm text-secondary">Taille: {item.size} | Qté: {item.quantity}</p>
                </div>
                <div className="font-body-md font-bold pt-1">
                  {new Intl.NumberFormat('fr-DZ').format(item.price * item.quantity)} DA
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="py-4 text-secondary text-sm">Votre panier est vide.</p>
            )}
          </div>

          <div className="flex justify-between mb-4 font-body-md text-secondary">
            <span>Sous-total</span>
            <span>{new Intl.NumberFormat('fr-DZ').format(total)} DA</span>
          </div>
          <div className="flex justify-between mb-6 font-body-md text-secondary">
            <span>Livraison</span>
            <span>{shippingFee > 0 ? `${new Intl.NumberFormat('fr-DZ').format(shippingFee)} DA` : 'Calculé après sélection'}</span>
          </div>
          
          <div className="flex justify-between pt-6 border-t border-outline-variant font-headline-md text-body-lg">
            <span>Total</span>
            <span className="text-primary">{new Intl.NumberFormat('fr-DZ').format(finalTotal)} DA</span>
          </div>
        </div>
      </div>

    </main>
  );
}
