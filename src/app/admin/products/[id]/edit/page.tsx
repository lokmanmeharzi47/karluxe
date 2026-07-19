import EditProductClient from "./EditProductClient";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        stock,
        size_id,
        color_id
      )
    `)
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  const { data: categories } = await supabase.from('categories').select('id, name').order('name');
  const { data: collections } = await supabase.from('collections').select('id, name').order('name');
  const { data: sizes } = await supabase.from('sizes').select('id, name');
  const { data: colors } = await supabase.from('colors').select('id, name, hex_code').order('name');

  return (
    <EditProductClient 
      product={product}
      categories={categories || []} 
      collections={collections || []} 
      sizes={sizes || []}
      colors={colors || []}
    />
  );
}
