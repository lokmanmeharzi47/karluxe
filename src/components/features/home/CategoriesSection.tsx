'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Category } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-[rgba(212,175,55,0.15)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Collections"
          title="Browse By Category"
          subtitle="Select your preferred automotive experience, from track-focused supercars to executive limousines."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/fleet?category=${category.slug}`}
                className="group relative h-80 rounded-3xl overflow-hidden block glass-panel border border-[rgba(212,175,55,0.2)]"
              >
                <img
                  src={category.image_url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-heading uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#B6B6B6] mt-1 line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
