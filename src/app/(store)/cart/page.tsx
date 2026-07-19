"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="pt-32 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto min-h-screen">
      <h1 className="font-display-lg text-headline-xl mb-12 text-center border-b border-outline-variant pb-8">Panier d'achats</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-body-lg mb-8 text-secondary">Votre panier d'achats est vide.</p>
          <Link href="/collection">
            <button className="px-10 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#C8A96A] transition-colors">
              Continuer vos achats
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              <div className="col-span-6">Produit</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-right">Prix</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-outline-variant">
              {items.map((item) => (
                <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <div className="w-24 h-32 bg-surface-variant relative overflow-hidden flex-shrink-0">
                      {item.image && <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}></div>}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-headline-md text-body-lg mb-2">{item.name}</h3>
                      <p className="font-body-sm text-secondary">Taille : {item.size}</p>
                      <p className="font-body-sm text-secondary">Couleur : {item.color}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-left mt-4 font-label-caps text-[10px] uppercase tracking-widest underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-outline-variant">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 hover:bg-surface-variant">-</button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-surface-variant">+</button>
                    </div>
                  </div>
                  <div className="hidden md:block col-span-2 text-right font-body-md text-secondary">
                    {new Intl.NumberFormat('fr-DZ').format(item.price)} DA
                  </div>
                  <div className="col-span-1 md:col-span-2 text-left md:text-right font-headline-md">
                    {new Intl.NumberFormat('fr-DZ').format(item.price * item.quantity)} DA
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-surface-variant p-8">
              <h2 className="font-headline-md text-headline-sm mb-6 pb-4 border-b border-outline-variant">Résumé de la commande</h2>
              
              <div className="flex justify-between mb-4 font-body-md text-secondary">
                <span>Sous-total</span>
                <span>{new Intl.NumberFormat('fr-DZ').format(getTotalPrice())} DA</span>
              </div>
              <div className="flex justify-between mb-6 font-body-md text-secondary">
                <span>Livraison</span>
                <span>Calculé au moment du paiement</span>
              </div>
              
              <div className="flex justify-between mb-8 pb-6 border-b border-outline-variant font-headline-md text-body-lg">
                <span>Total</span>
                <span>{new Intl.NumberFormat('fr-DZ').format(getTotalPrice())} DA</span>
              </div>

              <Link href="/checkout">
                <button className="w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#C8A96A] transition-colors">
                  Procéder au paiement
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
