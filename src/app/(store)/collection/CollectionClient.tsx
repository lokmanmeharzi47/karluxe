"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  main_image: string | null;
  category: { name: string } | null;
  collection: { name: string } | null;
};

export default function CollectionClient({ 
  initialProducts, 
  titleOverride 
}: { 
  initialProducts: Product[], 
  titleOverride?: string 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesView, setIsFavoritesView] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  useEffect(() => {
    const saved = localStorage.getItem('luxury_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setIsFavoritesView(searchParams.get('view') === 'favorites' || pathname === '/favorites');
  }, [searchParams, pathname]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('luxury_favorites', JSON.stringify(next));
      return next;
    });
  };

  const displayedProducts = isFavoritesView 
    ? initialProducts.filter(p => favorites.includes(p.id))
    : initialProducts;

  return (
    <main className="pt-12 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto bg-background">
      
      {/* Header */}
      <div className="mb-16">
        <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest">
          Maison de Couture
        </span>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-6">
          {isFavoritesView ? "Mes Favoris" : (titleOverride || "Collection Maison de Couture")}
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Une exploration de la modestie à travers le prisme de la haute couture. Notre dernière collection allie savoir-faire traditionnel et silhouettes avant-gardistes pour la femme moderne pleine de grâce.
          </p>
          
          <div className="flex items-center text-sm font-body-md text-on-surface-variant">
            <span className="mr-2">Trier par</span>
            <button className="flex items-center font-bold text-primary border-none bg-transparent">
              Nouveautés <span className="material-symbols-outlined text-sm ml-1">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-grid-gutter mb-20">
        {displayedProducts.length === 0 ? (
          <div className="col-span-full text-center py-20 font-body-lg text-secondary">
            Aucun article trouvé pour le moment.
          </div>
        ) : displayedProducts.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-surface-variant">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${product.main_image || '/placeholder-image.jpg'}')` }}
              />
              <button 
                onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                className="absolute top-4 right-4 w-10 h-10 bg-surface text-primary rounded-full flex items-center justify-center shadow-sm hover:bg-surface-variant transition-colors"
              >
                <span 
                  className={`material-symbols-outlined text-[20px] transition-all ${favorites.includes(product.id) ? 'text-red-500 scale-110' : ''}`}
                  style={{ fontVariationSettings: favorites.includes(product.id) ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>
            
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              {product.name}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow line-clamp-2">
              {product.description}
            </p>
            <p className="font-body-lg text-primary mb-4">
              {new Intl.NumberFormat('fr-DZ').format(product.price)} DA
            </p>
            
            <div>
              <Link 
                href={`/product/${product.slug}`}
                className="font-label-caps text-label-caps text-primary uppercase border-b border-primary pb-1 gold-border-bottom"
              >
                VOIR LES DÉTAILS
              </Link>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
