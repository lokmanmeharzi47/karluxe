import NewProductClient from "./NewProductClient";
import { createClient } from "@/utils/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase.from('categories').select('id, name').order('name');
  const { data: collections } = await supabase.from('collections').select('id, name').order('name');
  const { data: sizes } = await supabase.from('sizes').select('id, name');
  const { data: colors } = await supabase.from('colors').select('id, name, hex_code').order('name');

  return (
    <NewProductClient 
      categories={categories || []} 
      collections={collections || []} 
      sizes={sizes || []}
      colors={colors || []}
    />
  );
}
