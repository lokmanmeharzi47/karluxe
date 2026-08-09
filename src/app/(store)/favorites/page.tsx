import { createStaticClient } from "@/utils/supabase/server";
import CollectionClient from "../collection/CollectionClient";
import { Suspense } from "react";

// The favorites themselves live in localStorage and are filtered on the client,
// so the product list this page ships is the same for every visitor.
export const revalidate = 60;

export default async function FavoritesPage() {
  const supabase = createStaticClient();

  // Fetch all published products so the client can filter by local storage favorites
  const { data: rawProducts, error: productsError } = await supabase
    .from('products')
    .select(`
      id, name, slug, description, price, cover_image,
      categories(name),
      collections(name),
      product_variants(stock)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (productsError) {
    console.error("Error fetching products for favorites:", productsError);
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
      <CollectionClient initialProducts={products} titleOverride="Mes Favoris" />
    </Suspense>
  );
}
