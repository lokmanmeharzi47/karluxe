import InventoryClient from "./InventoryClient";
import { createClient } from "@/utils/supabase/server";

export default async function InventoryPage() {
  const supabase = await createClient();

  const { data: variants } = await supabase
    .from('product_variants')
    .select(`
      sku,
      stock,
      products ( name ),
      sizes ( name ),
      colors ( name )
    `)
    .order('sku', { ascending: true });

  const inventoryData = (variants || []).map((v: any) => {
    const sizeName = v.sizes?.name || '';
    const colorName = v.colors?.name || '';
    const variantStr = [colorName, sizeName].filter(Boolean).join(' / ') || 'Standard';
    
    const inStock = v.stock || 0;
    let status = "En stock";
    if (inStock <= 0) status = "Rupture de stock";
    else if (inStock <= 5) status = "Stock faible";

    return {
      sku: v.sku || 'N/A',
      name: v.products?.name || 'Inconnu',
      variant: variantStr,
      inStock,
      reserved: 0, // Not explicitly tracked in schema currently
      incoming: 0, // Not explicitly tracked in schema currently
      status
    };
  });

  const totalInStock = inventoryData.reduce((sum, item) => sum + item.inStock, 0);
  const lowStockCount = inventoryData.filter(item => item.inStock > 0 && item.inStock <= 5).length;
  const outOfStockCount = inventoryData.filter(item => item.inStock <= 0).length;
  
  const summary = { 
    totalInStock, 
    lowStockCount, 
    outOfStockCount, 
    totalVariants: inventoryData.length 
  };

  return <InventoryClient inventory={inventoryData} summary={summary} />;
}
