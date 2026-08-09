import React from 'react';
import { createStaticClient } from '@/lib/supabase/server';
import { CarWithDetails, Brand, Category } from '@/types';
import { HeroSection } from '@/components/features/home/HeroSection';
import { FeaturedFleet } from '@/components/features/home/FeaturedFleet';
import { CategoriesSection } from '@/components/features/home/CategoriesSection';
import { ServicesSection } from '@/components/features/home/ServicesSection';
import { BrandsSection } from '@/components/features/home/BrandsSection';
import { FaqSection } from '@/components/features/home/FaqSection';
import { CtaSection } from '@/components/features/home/CtaSection';

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function HomePage() {
  const supabase = createStaticClient();

  const [
    { data: cars },
    { data: brands },
    { data: categories },
    { data: faqs },
    { data: services },
  ] = await Promise.all([
    // Only the 6 cards rendered by FeaturedFleet — the page used to pull every
    // car with full brand/category joins and throw all but six away.
    supabase
      .from('cars')
      .select('id, slug, title, description, daily_rate, featured_image, brands(name)')
      .order('created_at', { ascending: false })
      .limit(6),
    supabase.from('brands').select('id, name, logo_url').order('name'),
    supabase.from('categories').select('id, name, description, image_url').order('name'),
    supabase.from('faqs').select('id, question, answer').order('sort_order', { ascending: true }),
    supabase.from('services').select('id, title, description, icon').order('created_at', { ascending: true }),
  ]);

  // Casts go through `unknown` because the selects above are narrowed to the
  // columns each section actually renders, not the full row shape.
  const featuredCars = (cars as unknown as CarWithDetails[]) || [];
  const brandList = (brands as unknown as Brand[]) || [];
  const categoryList = (categories as unknown as Category[]) || [];
  const faqList = faqs || [];
  const serviceList = services || [];

  return (
    <div className="bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Fleet */}
      <FeaturedFleet cars={featuredCars} />

      {/* 3. Categories */}
      <CategoriesSection categories={categoryList} />

      {/* 4. Bespoke VIP Services */}
      <ServicesSection services={serviceList} />

      {/* 8. Brands Marquee */}
      <BrandsSection brands={brandList} />

      {/* 9. FAQ Accordion */}
      <FaqSection faqs={faqList} />

      {/* 10. Call to Action */}
      <CtaSection />
    </div>
  );
}
