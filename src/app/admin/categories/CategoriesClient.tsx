'use client';

import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { createCategory, deleteCategory } from "@/app/actions/categories";

type Category = {
  id: string;
  name: string;
  slug: string;
  products_count?: number;
};

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createCategory(formData);
    
    if (result.success && result.category) {
      setCategories([result.category, ...categories]);
      (e.target as HTMLFormElement).reset();
    } else {
      alert("Erreur: " + result.error);
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
    
    const result = await deleteCategory(id);
    if (result.success) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
      alert("Erreur: " + result.error);
    }
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Catégories</h1>
          <p className="text-secondary font-body-sm mt-1">Organisez la hiérarchie de votre boutique et les catégories de produits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-variant/30">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                <input 
                  type="text" 
                  placeholder="Rechercher des catégories..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-white"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm">
                <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-4">Nom de la catégorie</th>
                    <th className="px-4 py-4">Slug</th>
                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {categories.map((cat, i) => (
                    <tr key={i} className="hover:bg-surface-variant/30 transition-colors group">
                      <td className="px-4 py-4">
                        <p className="font-medium text-on-surface">{cat.name}</p>
                      </td>
                      <td className="px-4 py-4 text-secondary">{cat.slug}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-secondary">
                        Aucune catégorie trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-outline-variant shadow-sm flex flex-col h-fit">
          <div className="p-6 border-b border-outline-variant">
            <h2 className="font-headline-md text-body-lg">Ajouter une nouvelle catégorie</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom de la catégorie</label>
              <input name="name" required type="text" placeholder="ex. Robes de Soirée" className="w-full px-3 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant bg-surface-variant/30 flex justify-end gap-3 rounded-b-xl">
            <button type="reset" className="px-4 py-2 text-sm text-secondary hover:text-primary transition-colors">Effacer</button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-on-primary text-sm rounded-md hover:bg-[#C8A96A] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Ajout...' : 'Ajouter une catégorie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
