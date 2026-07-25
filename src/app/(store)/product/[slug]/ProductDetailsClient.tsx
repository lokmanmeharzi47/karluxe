"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  main_image: string | null;
  images: string[];
  category: { id: string; name: string; slug: string; } | null;
  collection: { id: string; name: string; slug: string; } | null;
  variants?: {
    id: string;
    stock: number;
    size: { id: string; name: string; } | null;
    color: { id: string; name: string; hex_code: string | null; } | null;
  }[];
};

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState("description");
  const router = useRouter();
  
  // Extract unique colors and sizes from variants
  const colors = Array.from(new Map(
    (product.variants || [])
      .filter(v => v.color)
      .map(v => [v.color!.id, v.color!])
  ).values());
  
  const sizes = Array.from(new Map(
    (product.variants || [])
      .filter(v => v.size)
      .map(v => [v.size!.id, v.size!])
  ).values());

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]?.id || "");
  
  const addItem = useCartStore(state => state.addItem);
  const clearCart = useCartStore(state => state.clearCart);
  
  const handleAddToCart = () => {
    const colorObj = colors.find(c => c.id === selectedColor);
    const sizeObj = sizes.find(s => s.id === selectedSize);
    
    // Clear the cart first because this is a "Buy Now" flow
    clearCart();

    addItem({
      id: product.id + '-' + (selectedSize || 'nosize') + '-' + (selectedColor || 'nocolor'),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: sizeObj?.name,
      color: colorObj?.name,
      image: product.main_image || undefined
    });
    router.push('/checkout');
  };

  return (
    <main className="pt-32 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto bg-background">
      
      {/* Breadcrumbs */}
      <div className="mb-8 font-label-caps text-label-caps text-on-surface-variant uppercase">
        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/collection" className="hover:text-primary transition-colors">Collections</Link>
        <span className="mx-2">›</span>
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="relative w-full aspect-[3/4] bg-surface-variant">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${product.main_image || '/placeholder-image.jpg'}')` }}
            />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div key={idx} className="w-24 aspect-[3/4] bg-surface-variant shrink-0 cursor-pointer border border-transparent hover:border-primary">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 md:pt-10">
          
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">{product.name}</h1>
          <p className="font-body-lg text-secondary mb-8">{product.category?.name || 'Catégorie'} | {product.collection?.name || 'Collection'}</p>

          {/* Color */}
          {colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-label-caps text-label-caps text-primary uppercase mb-4 tracking-widest">Couleur : {colors.find(c => c.id === selectedColor)?.name || 'Aucune'}</h3>
              <div className="flex space-x-3">
                {colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)} 
                    className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === color.id ? 'border-primary ring-2 ring-offset-2 ring-transparent' : 'border-transparent hover:border-primary'}`}
                    style={{ backgroundColor: color.hex_code || '#cccccc' }}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {sizes.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Sélectionner la taille</h3>
                <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary uppercase border-b border-outline-variant pb-0.5 transition-colors">Guide des tailles</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button 
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-4 py-3 min-w-[3rem] font-label-caps text-[10px] sm:text-label-caps uppercase border transition-colors ${size.id === selectedSize ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-outline-variant hover:border-primary'}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Price */}
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center border border-outline-variant bg-transparent">
              <button 
                className="px-4 py-3 text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="w-8 text-center font-body-md text-primary">{quantity}</span>
              <button 
                className="px-4 py-3 text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>

            <div className="text-right">
              <div className="font-label-caps text-[10px] tracking-widest uppercase text-on-surface-variant mb-1">Sous-total</div>
              <div className="font-headline-lg text-headline-lg text-primary">{new Intl.NumberFormat('fr-DZ').format(product.price * quantity)} DA</div>
            </div>
          </div>

          {/* Shop Now Button */}
          <button 
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full block bg-primary text-on-primary text-center py-5 font-label-caps text-label-caps tracking-[0.2em] uppercase mb-8 transition-colors ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-tint'}`}
          >
            {product.stock <= 0 ? 'En rupture de stock' : 'Acheter maintenant'}
          </button>

          {/* Delivery Info */}
          <div className="flex items-start mb-16 text-on-surface-variant">
            <span className="material-symbols-outlined mr-4 mt-0.5">local_shipping</span>
            <div>
              <p className="font-body-md text-primary">Livraison gants blancs offerte</p>
              <p className="font-body-md text-sm mt-1 opacity-70">Livraison estimée : 3 - 5 jours ouvrables</p>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-t border-outline-variant/30">
            {/* Description */}
            <div className="border-b border-outline-variant/30">
              <button 
                className="w-full py-6 flex justify-between items-center text-left"
                onClick={() => setExpanded(expanded === 'description' ? '' : 'description')}
              >
                <span className="font-headline-md text-headline-md text-primary">Description</span>
                <span className="material-symbols-outlined">{expanded === 'description' ? 'expand_less' : 'expand_more'}</span>
              </button>
              {expanded === 'description' && (
                <div className="pb-6 font-body-md text-on-surface-variant leading-relaxed">
                  {product.description || "Aucune description pour ce produit."}
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="border-b border-outline-variant/30">
              <button 
                className="w-full py-6 flex justify-between items-center text-left"
                onClick={() => setExpanded(expanded === 'care' ? '' : 'care')}
              >
                <span className="font-headline-md text-headline-md text-primary">Conseils d'entretien</span>
                <span className="material-symbols-outlined">{expanded === 'care' ? 'expand_less' : 'expand_more'}</span>
              </button>
              {expanded === 'care' && (
                <div className="pb-6 font-body-md text-on-surface-variant leading-relaxed">
                  Nettoyage à sec uniquement. Ne pas utiliser d'eau de Javel. Repasser à basse température sur l'envers.
                </div>
              )}
            </div>

            {/* Delivery & Returns */}
            <div className="border-b border-outline-variant/30">
              <button 
                className="w-full py-6 flex justify-between items-center text-left"
                onClick={() => setExpanded(expanded === 'delivery' ? '' : 'delivery')}
              >
                <span className="font-headline-md text-headline-md text-primary">Livraison et Retours</span>
                <span className="material-symbols-outlined">{expanded === 'delivery' ? 'expand_less' : 'expand_more'}</span>
              </button>
              {expanded === 'delivery' && (
                <div className="pb-6 font-body-md text-on-surface-variant leading-relaxed">
                  Nous offrons la livraison gratuite partout en Algérie. Les retours sont acceptés dans les 14 jours suivant la réception. Les articles doivent être non portés avec les étiquettes d'origine attachées.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
