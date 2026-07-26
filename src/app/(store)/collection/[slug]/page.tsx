import { createClient } from "@/utils/supabase/server";
import CollectionClient from "../CollectionClient";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function CollectionSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const { slug } = await params;

  // 1. Fetch the collection details
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('id, name')
    .eq('slug', slug)
    .maybeSingle();

  if (collectionError || !collection) {
    console.error("Collection not found:", collectionError);
    notFound();
  }

  // 2. Fetch all published products belonging to this collection
  const { data: rawProducts, error: productsError } = await supabase
    .from('products')
    .select(`
      id, name, slug, description, price, cover_image,
      categories(name),
      collections!inner(name, slug),
      product_variants(stock)
    `)
    .eq('status', 'published')
    .eq('collections.slug', slug)
    .order('created_at', { ascending: false });

  if (productsError) {
    console.error("Error fetching collection products:", productsError);
  }

  const products = (rawProducts || []).map(p => {
    // Sum up the stock from all variants
    const totalStock = p.product_variants?.reduce((acc: number, v: { stock: number | null }) => acc + (v.stock || 0), 0) || 0;
    
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      stock: totalStock,
      main_image: p.cover_image,
      category: Array.isArray(p.categories) ? p.categories[0] : p.categories,
      collection: Array.isArray(p.collections) ? p.collections[0] : p.collections,
    };
  });

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <CollectionClient initialProducts={products} titleOverride={collection.name} />
    </Suspense>
  );
}
