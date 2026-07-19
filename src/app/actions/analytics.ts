'use server'

import { createAdminClient } from '@/utils/supabase/server'

export async function getAnalyticsData() {
  const supabase = await createAdminClient()

  // 1. Gross Revenue & Total Orders & Average Order Value
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('total, wilaya')

  let totalRevenue = 0
  let totalOrders = 0
  let aov = 0

  const wilayaRevenue: Record<string, number> = {}

  if (!ordersError && orders) {
    totalOrders = orders.length
    orders.forEach(order => {
      const amount = Number(order.total) || 0
      totalRevenue += amount
      
      const wilaya = order.wilaya || 'Inconnu'
      wilayaRevenue[wilaya] = (wilayaRevenue[wilaya] || 0) + amount
    })
    if (totalOrders > 0) {
      aov = totalRevenue / totalOrders
    }
  }

  // 2. Conversion Rate (Orders / Users)
  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
  
  let conversionRate = 0
  if (usersCount && usersCount > 0) {
    conversionRate = (totalOrders / usersCount) * 100
  }

  // 3. Format Wilaya Data
  const topWilayas = Object.entries(wilayaRevenue)
    .map(([w, r]) => ({ w, r, p: totalRevenue > 0 ? (r / totalRevenue) * 100 : 0 }))
    .sort((a, b) => b.r - a.r)
    .slice(0, 5)

  // 4. Sales by Collection (Mocked for now since order_items isn't populated)
  const salesByCollection = [
    { name: "Série Signature", revenue: totalRevenue * 0.65, percentage: 65 },
    { name: "Abayas de luxe", revenue: totalRevenue * 0.25, percentage: 25 },
    { name: "Prêt-à-porter", revenue: totalRevenue * 0.10, percentage: 10 }
  ]

  return {
    totalRevenue,
    totalOrders,
    aov,
    conversionRate,
    topWilayas,
    salesByCollection
  }
}
