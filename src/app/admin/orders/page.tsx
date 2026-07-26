import OrdersClient from "./OrdersClient";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  try {
    const supabase = createAdminClient();

    const { data: rawOrders } = await supabase
      .from('orders' as any)
      .select('*')
      .order('created_at', { ascending: false });

    // Map database orders to the format expected by the client
    const mappedOrders = ((rawOrders as any[]) || []).map((o: any) => ({
      id: o.id,
      order_number: o.order_number,
      customer: o.customer_name || 'Inconnu',
      phone: o.customer_phone || '-',
      wilaya: o.wilaya || '-',
      commune: o.commune || '-',
      address: '-',
      delivery: o.delivery_method || '-',
      payment: o.payment_method || '-',
      status: o.order_status || 'Pending',
      total: o.total || 0,
      tracking: '-',
    }));

    return <OrdersClient initialOrders={mappedOrders} />;
  } catch {
    return <OrdersClient initialOrders={[]} />;
  }
}
