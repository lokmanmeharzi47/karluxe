import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import { CarWithDetails, Brand, Category, Review } from '@/types';
import { HeroSection } from '@/components/features/home/HeroSection';
import { FeaturedFleet } from '@/components/features/home/FeaturedFleet';
import { CategoriesSection } from '@/components/features/home/CategoriesSection';
import { ServicesSection } from '@/components/features/home/ServicesSection';
import { BrandsSection } from '@/components/features/home/BrandsSection';
import { FaqSection } from '@/components/features/home/FaqSection';
import { CtaSection } from '@/components/features/home/CtaSection';

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function HomePage() {
  const supabase = await createServerClient();

  const [
    { data: cars },
    { data: brands },
    { data: categories },
    { data: reviews },
    { data: faqs },
    { data: services },
    { data: siteStats },
    { data: marketingSections }
  ] = await Promise.all([
    supabase.from('cars').select('*, brands(*), categories(*)').order('created_at', { ascending: false }),
    supabase.from('brands').select('*').order('name'),
    supabase.from('categories').select('*').order('name'),
    supabase.from('reviews').select('*').order('created_at', { ascending: false }),
    supabase.from('faqs').select('*').order('sort_order', { ascending: true }),
    supabase.from('services').select('*').order('created_at', { ascending: true }),
    supabase.from('site_stats').select('*').order('sort_order', { ascending: true }),
    supabase.from('marketing_sections').select('*')
  ]);

  const featuredCars = (cars as CarWithDetails[]) || [];
  const brandList = (brands as Brand[]) || [];
  const categoryList = (categories as Category[]) || [];
  const reviewList = (reviews as Review[]) || [];
  const faqList = faqs || [];
  const serviceList = services || [];
  const statsList = siteStats || [];
  const weddingMarketing = marketingSections?.find(section => section.section_id === 'wedding') || null;

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
