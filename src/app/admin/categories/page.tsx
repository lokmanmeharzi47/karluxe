import CategoriesClient from "./CategoriesClient";
import { createClient } from "@/utils/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  return <CategoriesClient initialCategories={categories || []} />;
}

