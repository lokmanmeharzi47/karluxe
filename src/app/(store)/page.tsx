import { createClient } from "@/utils/supabase/server";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch latest 4 published products for "Nos Meilleures Ventes"
  const { data: latestProducts } = await supabase
    .from('products')
    .select('id, name, slug, price, main_image')
    .eq('status', 'Published')
    .order('created_at', { ascending: false })
    .limit(4);

  return <HomeClient latestProducts={latestProducts || []} />;
}
