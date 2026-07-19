import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProductActions from "./ProductActions";

export default async function ProductsPage() {
  const supabase = await createClient();
  
  // Fetch real products from database
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        image_url
      ),
      categories (
        name
      ),
      product_variants (
        stock
      )
    `)
    .order('created_at', { ascending: false });

  const products = (dbProducts || []).map(p => {
    // Calculate total stock from variants
    const totalStock = p.product_variants?.reduce((acc: number, variant: any) => acc + (variant.stock || 0), 0) || 0;
    
    return {
      id: p.id,
      image: p.cover_image || (p.product_images?.[0]?.image_url) || "/images/placeholder.png",
      name: p.name,
      sku: p.sku || "N/A",
      price: p.price,
      stock: totalStock,
      category: p.categories?.name || "Général",
      status: p.status === 'published' ? 'Publié' : (p.status === 'archived' ? 'Archivé' : 'Brouillon')
    };
  });

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Catalogue de produits</h1>
          <p className="text-secondary font-body-sm mt-1">Gérez la collection, le stock et les prix de votre boutique</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm"
        >
          <Plus size={18} />
          Ajouter un produit
        </Link>
      </div>

      <div className="bg-white p-4 rounded-t-xl border border-outline-variant border-b-0 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher des produits par nom ou SKU..." 
            className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors bg-surface-variant/50"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <select className="border border-outline-variant rounded-md px-3 py-2 text-sm bg-white focus:outline-none">
            <option>Toutes les catégories</option>
          </select>
          <select className="border border-outline-variant rounded-md px-3 py-2 text-sm bg-white focus:outline-none">
            <option>Tous les statuts</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md text-sm hover:bg-surface-variant transition-colors whitespace-nowrap">
            <Filter size={16} />
            Filtres
          </button>
        </div>
      </div>

      <div className="bg-white rounded-b-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm whitespace-nowrap">
            <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-12">
                  <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                </th>
                <th className="px-4 py-4">Produit</th>
                <th className="px-4 py-4">SKU</th>
                <th className="px-4 py-4">Catégorie</th>
                <th className="px-4 py-4">Prix</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {products.map((prod, i) => (
                <tr key={i} className="hover:bg-surface-variant/30 transition-colors group">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                  </td>
                  <td className="px-4 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-surface-variant bg-cover bg-center border border-outline-variant/30" style={{ backgroundImage: `url('${prod.image}')`}}></div>
                    <span className="font-medium text-on-surface">{prod.name}</span>
                  </td>
                  <td className="px-4 py-4 text-secondary">{prod.sku}</td>
                  <td className="px-4 py-4 text-on-surface">{prod.category}</td>
                  <td className="px-4 py-4 font-bold">{prod.price} DA</td>
                  <td className="px-4 py-4">
                    <span className={`font-medium ${prod.stock === 0 ? 'text-red-600' : prod.stock < 5 ? 'text-orange-600' : 'text-green-600'}`}>
                      {prod.stock} en stock
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${prod.status === 'Publié' ? 'bg-green-100 text-green-800' : 
                        prod.status === 'Brouillon' ? 'bg-gray-100 text-gray-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <ProductActions productId={prod.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

