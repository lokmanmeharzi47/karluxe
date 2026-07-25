'use server';

import { createServerClient } from '@/lib/supabase/server';

export async function toggleCarAvailabilityAction(carId: string, isAvailable: boolean) {
  try {
    const supabase = await createServerClient();
    const { error } = await (supabase.from('cars') as any)
      .update({ is_available: isAvailable })
      .eq('id', carId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update vehicle availability' };
  }
}

export async function updateBookingStatusAction(bookingId: string, status: string) {
  try {
    const supabase = await createServerClient();
    const { error } = await (supabase.from('bookings') as any)
      .update({ status })
      .eq('id', bookingId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update booking status' };
  }
}
