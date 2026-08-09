import React from 'react';
import Link from 'next/link';
import { Image } from '@imagekit/next';
import { Category } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const categoryImages: Record<string, string> = {
    'Supercars & Sports': 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
    'Luxury SUVs': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    'Grand Tourers': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    'Electric Exotics': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    'Wedding & Processional': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
  };

  const defaultImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Catégories Véhicules"
          title="Sélection par Catégorie de Prestige"
          subtitle="Des supercars de piste aux SUV blindés et berlines cérémoniales."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Reveal key={cat.id} delay={index * 100}>
              <Link href={`/fleet?category=${cat.id}`} className="group block relative h-80 rounded-3xl overflow-hidden glass-panel border border-[rgba(212,175,55,0.2)]">
                <Image
                  src={(cat as any).image_url || categoryImages[cat.name] || defaultImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
                    Collection Exclusive
                  </span>
                  <h3 className="text-2xl font-bold font-heading uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#B6B6B6] line-clamp-2">
                    {cat.description || 'Finition sur-mesure et puissance inégalée.'}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>Explorer la Catégorie</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
