import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  priceDa: number;
  imageUrl: string;
  isNew?: boolean;
}

export default function ProductCard({ id, slug, name, priceDa, imageUrl, isNew }: ProductCardProps) {
  return (
    <div className="group reveal-on-scroll">
      <Link href={`/product/${slug}`}>
        <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-surface-variant cursor-pointer">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: `url('${imageUrl}')` }}
          ></div>
          {isNew && (
            <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label-caps text-[10px] tracking-widest uppercase">
              Nouveau
            </div>
          )}
          <div className="absolute bottom-0 w-full py-4 bg-primary text-on-primary text-center font-label-caps text-label-caps uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            Voir les détails
          </div>
        </div>
      </Link>
      <h4 className="font-headline-md text-body-lg mb-2">{name}</h4>
      <p className="font-label-caps text-label-caps text-secondary">
        {new Intl.NumberFormat('fr-DZ').format(priceDa)} DA
      </p>
    </div>
  );
}
