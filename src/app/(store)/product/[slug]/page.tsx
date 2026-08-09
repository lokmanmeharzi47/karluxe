import { cache } from "react";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

const getProduct = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
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
  return data;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return {};

  const title = product.name;
  const description = product.description || `Découvrez ${product.name} chez KarLuxe.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.cover_image ? [{ url: product.cover_image, width: 1200, height: 630, alt: product.name }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.cover_image ? [product.cover_image] : undefined,
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
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
