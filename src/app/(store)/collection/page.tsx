import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import CollectionsListClient from "./CollectionsListClient";

export const metadata: Metadata = {
  title: "Nos Collections",
  description: "Explorez les collections KarLuxe et trouvez la pièce qui vous correspond.",
};

export default async function CollectionsPage() {
  const supabase = await createClient();

  // Fetch all active collections
  const { data: collections, error } = await supabase
    .from('collections')
    .select('id, name, slug, description, banner')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching collections:", error);
  }

  return <CollectionsListClient collections={collections || []} />;
}
