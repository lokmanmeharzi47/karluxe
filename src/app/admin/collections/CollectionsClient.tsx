'use client';

import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { createCollection, deleteCollection } from "@/app/actions/collections";
import Image from "next/image";

type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  display_order: number;
  featured: boolean;
};

export default function CollectionsClient({ initialCollections }: { initialCollections: Collection[] }) {
  const [collections, setCollections] = useState(initialCollections);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createCollection(formData);
    
    if (result.success && result.collection) {
      setCollections([result.collection, ...collections]);
      (e.target as HTMLFormElement).reset();
      setBannerPreview(null);
    } else {
      alert("Erreur: " + result.error);
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette collection ?")) return;
    
    const result = await deleteCollection(id);
    if (result.success) {
      setCollections(collections.filter(c => c.id !== id));
    } else {
      alert("Erreur: " + result.error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Collections</h1>
          <p className="text-secondary font-body-sm mt-1">Gérer les collections de produits et les catégories en vedette</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collections List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-variant/30">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Rechercher des collections..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm">
                <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-4 w-12">Ordre</th>
                    <th className="px-4 py-4">Nom de la collection</th>
                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {collections.map((col, i) => (
                    <tr key={i} className="hover:bg-surface-variant/30 transition-colors group">
                      <td className="px-4 py-4 font-mono text-secondary">{col.display_order}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          {col.banner && (
                             <div className="w-12 h-12 rounded bg-surface-variant bg-cover bg-center border border-outline-variant/30" style={{ backgroundImage: `url('${col.banner}')`}}></div>
                          )}
                          <p className="font-medium text-on-surface flex items-center gap-2">
                            {col.name}
                            {col.featured && <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-[9px] font-bold uppercase tracking-widest">En vedette</span>}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDelete(col.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {collections.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-secondary">
                        Aucune collection trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-outline-variant shadow-sm flex flex-col h-fit">
          <div className="p-6 border-b border-outline-variant">
            <h2 className="font-headline-md text-body-lg">Créer une collection</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom de la collection</label>
              <input name="name" required type="text" placeholder="Série Signature Hiver '24" className="w-full px-3 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Image de bannière</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-outline-variant rounded-md p-8 flex flex-col items-center justify-center text-secondary hover:bg-surface-variant/50 transition-colors cursor-pointer group relative overflow-hidden"
              >
                {bannerPreview ? (
                  <Image src={bannerPreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <>
                    <ImageIcon size={32} className="mb-2 group-hover:text-primary transition-colors" />
                    <p className="font-body-sm">Cliquez pour uploader la bannière</p>
                    <p className="text-xs mt-1 opacity-70">1920x1080 recommandé</p>
                  </>
                )}
                <input type="file" name="banner" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</label>
              <textarea name="description" rows={3} className="w-full px-3 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary resize-none" placeholder="Description de la collection..."></textarea>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                <input name="is_featured" type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                Collection en vedette
              </label>
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant bg-surface-variant/30 flex justify-end gap-3 rounded-b-xl">
            <button type="reset" className="px-4 py-2 text-sm text-secondary hover:text-primary transition-colors">Annuler</button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-on-primary text-sm rounded-md hover:bg-[#C8A96A] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Création...' : 'Créer la collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
