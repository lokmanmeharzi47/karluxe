import type { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/server';

const BASE_URL = 'https://www.karluxlocation.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminClient();

  // `products` and `collections` predate the generated Database types, so the typed
  // client doesn't know about them yet — cast, same as elsewhere in this codebase.
  const [{ data: cars }, { data: products }, { data: collections }] = await Promise.all([
    supabase.from('cars').select('slug, updated_at'),
    (supabase.from('products' as any) as any).select('slug').eq('status', 'published'),
    (supabase.from('collections' as any) as any).select('slug').eq('active', true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/fleet`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/collection`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/booking`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const carRoutes: MetadataRoute.Sitemap = (cars || []).map((car) => ({
    url: `${BASE_URL}/fleet/${car.slug}`,
    lastModified: car.updated_at ? new Date(car.updated_at) : undefined,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = ((products as { slug: string }[]) || []).map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = ((collections as { slug: string }[]) || []).map((collection) => ({
    url: `${BASE_URL}/collection/${collection.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...carRoutes, ...productRoutes, ...collectionRoutes];
}
