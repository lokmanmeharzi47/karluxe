"use client";

import Link from "next/link";
import Image from "next/image";

type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string | null;
};

export default function CollectionsListClient({ collections }: { collections: Collection[] }) {
  return (
    <main className="pt-12 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto bg-background">
      
      {/* Header */}
      <div className="mb-16">
        <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-widest">
          Maison de Couture
        </span>
        <h1 className="font-headline-xl text-headline-xl text-primary mb-6">
          Nos Collections
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Découvrez nos collections exclusives, alliant élégance, confort et modestie pour la femme moderne.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {collections.length === 0 ? (
          <div className="col-span-full text-center py-20 font-body-lg text-secondary">
            Aucune collection disponible pour le moment.
          </div>
        ) : collections.map((collection) => (
          <Link 
            key={collection.id} 
            href={`/collection/${collection.slug}`}
            className="group flex flex-col cursor-pointer border border-outline-variant/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-surface"
          >
            <div className="relative aspect-[16/9] w-full bg-surface-variant overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${collection.banner || '/placeholder-image.jpg'}')` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">
                {collection.name}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                {collection.description || "Découvrez notre dernière collection."}
              </p>
              
              <div className="mt-auto pt-4">
                <span className="font-label-caps text-label-caps text-primary uppercase border-b border-primary pb-1 gold-border-bottom">
                  EXPLORER
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
