import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug),
      collection:collections(id, name, slug),
      variants:product_variants(id, stock, size:sizes(id, name), color:colors(id, name, hex_code)),
      product_images(image_url, sort_order)
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  // Map product_images to a flat array of strings, sorted by sort_order
  let imagesArray: string[] = [];
  if (product.product_images && Array.isArray(product.product_images)) {
    imagesArray = product.product_images
      .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
      .map((img: any) => img.image_url);
  }

  const cleanProduct = {
    ...product,
    images: imagesArray,
    main_image: product.cover_image, // Map cover_image to main_image for the client
    category: Array.isArray(product.category) ? product.category[0] : product.category,
    collection: Array.isArray(product.collection) ? product.collection[0] : product.collection,
  };

  return <ProductDetailsClient product={cleanProduct} />;
}
