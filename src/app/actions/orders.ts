'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from('orders')
    .update({ order_status: newStatus })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/orders')
  return { success: true }
}
