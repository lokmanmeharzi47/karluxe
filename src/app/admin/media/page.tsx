import { getMediaFiles } from "@/app/actions/media";
import MediaClient from "./MediaClient";

export default async function MediaPage() {
  const files = await getMediaFiles();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hbfeclrmacaxgssfrfxj.supabase.co';

  return (
    <div className="pb-10 flex flex-col h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
        <div>
          <h1 className="font-headline-md text-headline-md">Médiathèque</h1>
          <p className="text-secondary font-body-sm mt-1">Gérer les images de produits, les bannières et les ressources de la boutique</p>
        </div>
      </div>

      <MediaClient initialFiles={files || []} supabaseUrl={supabaseUrl} />
    </div>
  );
}
