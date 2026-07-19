'use client';

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";

export default function ProductActions({ productId }: { productId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible et supprimera également toutes les images associées.")) {
      setIsDeleting(true);
      const result = await deleteProduct(productId);
      
      if (result?.success) {
        // Successful deletion
      } else {
        alert("Erreur lors de la suppression: " + result?.error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 transition-opacity">
      <Link href={`/admin/products/${productId}/edit`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Modifier">
        <Edit size={16} />
      </Link>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting}
        className={`p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`} 
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
