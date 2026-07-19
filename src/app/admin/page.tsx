import { ShoppingBag, DollarSign, Users, TrendingUp, Package, Layers, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts
  const { count: totalOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  const { count: totalCustomers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: totalProducts } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: totalCollections } = await supabase.from('collections').select('*', { count: 'exact', head: true });
  const { count: pendingOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'Pending');
  const { count: deliveredOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'Delivered');

  // Fetch all orders to sum total revenue
  const { data: allOrders } = await supabase.from('orders').select('total, created_at');
  
  const totalRevenue = allOrders?.reduce((sum, o) => sum + (Number(o.total) || 0), 0) || 0;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyRevenue = allOrders?.filter(o => {
    const d = new Date(o.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).reduce((sum, o) => sum + (Number(o.total) || 0), 0) || 0;

  // Fetch Low Stock Alerts
  const { data: lowStockVariants } = await supabase
    .from('product_variants')
    .select('stock, sku, products(name)')
    .lt('stock', 5)
    .order('stock', { ascending: true })
    .limit(10);

  const lowStockItems = (lowStockVariants || []).map((v: any) => ({
    name: v.products?.name || 'Unknown',
    sku: v.sku || 'N/A',
    stock: v.stock || 0
  }));

  // Fetch Recent Orders
  const { data: recentOrdersData } = await supabase
    .from('orders')
    .select('order_number, customer_name, total, order_status')
    .order('created_at', { ascending: false })
    .limit(5);

  const recentOrders = (recentOrdersData || []).map((o: any) => {
    let color = 'gray';
    switch(o.order_status) {
      case 'Pending': color = 'yellow'; break;
      case 'Confirmed': color = 'purple'; break;
      case 'Preparing': color = 'orange'; break;
      case 'Shipped': color = 'blue'; break;
      case 'Delivered': color = 'green'; break;
      case 'Cancelled': color = 'red'; break;
    }
    return {
      id: o.order_number,
      name: o.customer_name || 'Inconnu',
      total: `${(o.total || 0).toLocaleString('en-US')} DA`,
      status: o.order_status || 'Pending',
      color
    }
  });

  const formatNumber = (num: number | null) => (num || 0).toLocaleString('en-US');

  return (
    <div className="pb-10">
      <h1 className="font-headline-md text-headline-md mb-8">Aperçu du tableau de bord</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Revenu total</p>
            <p className="font-headline-md text-body-lg">{formatNumber(totalRevenue)} DA</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Commandes totales</p>
            <p className="font-headline-md text-body-lg">{formatNumber(totalOrders)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Users size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Clients totaux</p>
            <p className="font-headline-md text-body-lg">{formatNumber(totalCustomers)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Revenu mensuel</p>
            <p className="font-headline-md text-body-lg">{formatNumber(monthlyRevenue)} DA</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Package size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Produits totaux</p>
            <p className="font-headline-md text-body-lg">{formatNumber(totalProducts)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Layers size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Collections</p>
            <p className="font-headline-md text-body-lg">{formatNumber(totalCollections)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Commandes en attente</p>
            <p className="font-headline-md text-body-lg">{formatNumber(pendingOrders)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 hover-lift transition-transform">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="font-body-sm text-secondary">Commandes livrées</p>
            <p className="font-headline-md text-body-lg">{formatNumber(deliveredOrders)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Charts Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-body-lg">Aperçu des revenus</h2>
            <select className="border border-outline-variant rounded-md px-3 py-1 text-sm bg-surface-variant focus:outline-none">
              <option>7 derniers jours</option>
              <option>Ce mois-ci</option>
              <option>Cette année</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 pb-6 border-b border-outline-variant/30">
            {/* Mock Chart Bars - Still mocked since dynamic charting requires heavier logic */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-1/12 bg-primary/20 hover:bg-primary transition-colors rounded-t-md relative group cursor-pointer" style={{ height: `${height}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface text-on-surface text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 shadow-sm transition-opacity">
                  {height * 2000} DA
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-secondary font-label-caps">
            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="p-6 border-b border-outline-variant flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h2 className="font-headline-md text-body-lg">Alertes de stock faible</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <ul className="divide-y divide-outline-variant/50">
              {lowStockItems.length > 0 ? lowStockItems.map((item: any, i: number) => (
                <li key={i} className="p-4 hover:bg-surface-variant/50 transition-colors flex justify-between items-center rounded-lg">
                  <div>
                    <p className="font-body-md font-medium text-on-surface">{item.name}</p>
                    <p className="text-xs text-secondary">SKU: {item.sku}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.stock === 0 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                    il en reste {item.stock}
                  </span>
                </li>
              )) : (
                <li className="p-4 text-center text-secondary text-sm">Tous les stocks sont à niveau.</li>
              )}
            </ul>
          </div>
          <div className="p-4 border-t border-outline-variant">
            <button className="w-full py-2 text-primary font-label-caps text-xs hover:bg-surface-variant rounded transition-colors">Voir tout l'inventaire</button>
          </div>
        </div>
      </div>

      {/* Best Selling Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h2 className="font-headline-md text-body-lg">Commandes récentes</h2>
            <button className="text-primary text-sm hover:underline">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md">
              <thead className="bg-surface-variant font-label-caps text-secondary text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID de commande</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {recentOrders.length > 0 ? recentOrders.map((order: any, i: number) => (
                  <tr key={i} className="hover:bg-surface-variant/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">{order.name}</td>
                    <td className="px-6 py-4">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 bg-${order.color}-100 text-${order.color}-800 rounded-full text-xs font-bold`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-secondary">
                      Aucune commande récente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant">
            <h2 className="font-headline-md text-body-lg">Produits les plus vendus</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-outline-variant">
              {/* Still mocked as getting best-selling products requires complex aggregation across order_items and products */}
              {[
                { name: "Caftan en soie", sales: 124, revenue: "21,328,000 DA", img: "/images/products/lux_caftan.png" },
                { name: "Signature Silk Trousers", sales: 98, revenue: "11,956,000 DA", img: "/images/products/lux_trousers.png" },
                { name: "Robe de Soirée Émeraude", sales: 76, revenue: "25,080,000 DA", img: "/images/products/lux_evening_dress.png" }
              ].map((prod, i) => (
                <li key={i} className="p-4 flex items-center gap-4 hover:bg-surface-variant/30 transition-colors">
                  <div className="w-16 h-16 rounded bg-surface-variant bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${prod.img}')`}}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-md font-medium text-on-surface truncate">{prod.name}</p>
                    <p className="text-xs text-secondary mt-1">{prod.sales} ventes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body-md font-bold text-primary">{prod.revenue}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
