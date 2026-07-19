'use client';

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploadClient from "../../components/ImageUploadClient";
import ColorSelectorClient from "../components/ColorSelectorClient";
import { useState } from "react";
import { createProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; }
type Collection = { id: string; name: string; }
type Size = { id: string; name: string; }
type Color = { id: string; name: string; hex_code: string | null; }

export default function NewProductClient({ 
  categories, 
  collections,
  sizes,
  colors
}: { 
  categories: Category[], 
  collections: Collection[],
  sizes: Size[],
  colors: Color[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Append images
    selectedImages.forEach((file) => {
      formData.append('images', file);
    });

    const result = await createProduct(formData);
    
    if (result.success) {
      router.push('/admin/products');
    } else {
      alert("Erreur: " + result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 border border-outline-variant rounded-md text-secondary hover:text-primary hover:bg-surface-variant transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-headline-md text-headline-md">Ajouter un produit</h1>
            <p className="text-secondary font-body-sm mt-1">Créez un nouveau produit dans votre catalogue</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm disabled:opacity-50"
        >
          <Save size={18} />
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer le produit'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Informations générales</h2>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom du produit</label>
              <input name="name" required type="text" placeholder="Ex: Caftan en Soie Brodée" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</label>
              <textarea name="description" rows={5} placeholder="Décrivez votre produit en détail..." className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Photos du produit</h2>
            <ImageUploadClient 
              label="Cliquez pour uploader les photos" 
              recommendedSize="Taille recommandée: 1080x1440 (PNG, JPG). Jusqu'à 5 photos." 
              multiple={true} 
              onChange={setSelectedImages}
            />
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Tarification et Inventaire</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Prix (DA)</label>
                <input name="price_da" required type="number" placeholder="Ex: 150000" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">SKU</label>
                <input name="sku" type="text" placeholder="Ex: CSB-G-01" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Taille(s) Disponible(s)</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <label key={size.id} className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md cursor-pointer hover:bg-surface-variant transition-colors">
                      <input type="checkbox" name="sizes" value={size.id} className="text-primary rounded border-outline-variant focus:ring-primary" />
                      <span className="font-body-sm text-on-surface">{size.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Couleur(s) Disponible(s)</label>
                <ColorSelectorClient initialColors={colors} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Stock initial (Global)</h2>
            <input name="stock" type="number" placeholder="Ex: 50" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
            <p className="text-xs text-secondary mt-2">Le stock sera divisé également entre les combinaisons de tailles/couleurs, ou vous pourrez le modifier plus tard.</p>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Catégorisation</h2>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Catégorie</label>
              <select name="category_id" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option value="">Sélectionner une catégorie</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Collection</label>
              <select name="collection_id" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option value="">Aucune collection</option>
                {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
            <h2 className="font-headline-md text-body-lg mb-4">Visibilité</h2>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Statut du produit</label>
              <select name="status" className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white">
                <option>Publié</option>
                <option>Brouillon</option>
                <option>Archivé</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
