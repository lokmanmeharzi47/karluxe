import CustomersClient from "./CustomersClient";
import { createClient } from "@/utils/supabase/server";

export default async function CustomersPage() {
  const supabase = await createClient();
  
  // Fetch profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch orders to calculate stats per customer
  const { data: orders } = await supabase
    .from('orders')
    .select('user_id, total, created_at, order_status');

  const mappedCustomers = (profiles || []).map(profile => {
    const customerOrders = (orders || []).filter(o => o.user_id === profile.id);
    const validOrders = customerOrders.filter(o => o.order_status !== 'Cancelled');
    
    const totalSpent = validOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const lastOrderDate = customerOrders.length > 0 
      ? new Date(Math.max(...customerOrders.map(o => new Date(o.created_at).getTime()))).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
      : "Jamais";
    
    const status = validOrders.length >= 5 ? "VIP" : validOrders.length > 0 ? "Actif" : "Inactif";

    return {
      id: profile.id,
      name: profile.full_name || 'Inconnu',
      email: profile.email || 'N/A',
      phone: profile.phone || 'N/A',
      orders: customerOrders.length,
      total: `${totalSpent.toLocaleString('en-US')} DA`,
      lastOrder: lastOrderDate,
      status
    };
  });

  return <CustomersClient initialCustomers={mappedCustomers} />;
}
