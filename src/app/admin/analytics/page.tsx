import { TrendingUp, Users, ShoppingBag, DollarSign, Calendar } from "lucide-react";
import { getAnalyticsData } from "@/app/actions/analytics";

export default async function AnalyticsPage() {
  const {
    totalRevenue,
    totalOrders,
    aov,
    conversionRate,
    topWilayas,
    salesByCollection
  } = await getAnalyticsData();

  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Analyses et Rapports</h1>
          <p className="text-secondary font-body-sm mt-1">Plongez au cœur des indicateurs de performance de votre boutique</p>
        </div>
        <div className="flex gap-3 bg-white border border-outline-variant rounded-md p-1">
          <button className="px-3 py-1.5 text-sm font-medium rounded bg-surface-variant text-primary">Ce mois-ci</button>
          <button className="px-3 py-1.5 text-sm font-medium rounded text-secondary hover:text-on-surface transition-colors">Mois dernier</button>
          <button className="px-3 py-1.5 text-sm font-medium rounded text-secondary hover:text-on-surface transition-colors flex items-center gap-2"><Calendar size={14} /> Personnalisé</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="font-body-sm text-secondary">Revenu brut</p>
          <p className="font-headline-md text-body-lg">{totalRevenue.toLocaleString()} DA</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="font-body-sm text-secondary">Commandes totales</p>
          <p className="font-headline-md text-body-lg">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="font-body-sm text-secondary">Valeur moyenne des commandes</p>
          <p className="font-headline-md text-body-lg">{Math.round(aov).toLocaleString()} DA</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Users size={20} />
            </div>
          </div>
          <p className="font-body-sm text-secondary">Taux de conversion estimé</p>
          <p className="font-headline-md text-body-lg">{conversionRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales by Collection */}
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
          <h2 className="font-headline-md text-body-lg mb-6">Ventes par collection</h2>
          <div className="space-y-4">
            {salesByCollection.map((col, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-on-surface">{col.name}</span>
                  <span className="font-bold text-primary">{col.revenue.toLocaleString()} DA</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: `${col.percentage}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Wilaya */}
        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
          <h2 className="font-headline-md text-body-lg mb-6">Top Wilayas par Revenu</h2>
          <div className="space-y-4">
            {topWilayas.length > 0 ? topWilayas.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 font-mono text-secondary text-xs">{i+1}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-on-surface">{item.w}</span>
                    <span className="font-bold text-primary">{item.r.toLocaleString()} DA</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-1.5">
                    <div className="bg-primary/80 h-1.5 rounded-full" style={{width: `${item.p}%`}}></div>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-secondary text-sm">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
