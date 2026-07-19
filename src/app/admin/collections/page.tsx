import CollectionsClient from "./CollectionsClient";
import { createClient } from "@/utils/supabase/server";

export default async function CollectionsPage() {
  const supabase = await createClient();
  
  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return <CollectionsClient initialCollections={collections || []} />;
}

