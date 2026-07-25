'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

const bookingSchema = z.object({
  carId: z.string().uuid(),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(6, 'Invalid phone number'),
  pickupDate: z.string(),
  dropoffDate: z.string(),
  pickupLocation: z.string(),
  dropoffLocation: z.string(),
  insuranceTier: z.enum(['Standard', 'Premium VIP', 'Zero Excess Platinum']),
  selectedExtras: z.array(z.string()),
  totalAmount: z.number().positive(),
});

export type CreateBookingInput = z.infer<typeof bookingSchema>;

export async function createBookingAction(input: CreateBookingInput) {
  try {
    const validated = bookingSchema.parse(input);
    const supabase = await createServerClient();

    const bookingCode = `KLX-${Math.floor(10000 + Math.random() * 90000)}`;

    const { data: booking, error } = await (supabase.from('bookings') as any)
      .insert({
        booking_code: bookingCode,
        car_id: validated.carId,
        customer_name: validated.customerName,
        customer_email: validated.customerEmail,
        customer_phone: validated.customerPhone,
        pickup_date: validated.pickupDate,
        dropoff_date: validated.dropoffDate,
        pickup_location: validated.pickupLocation,
        dropoff_location: validated.dropoffLocation,
        insurance_tier: validated.insuranceTier,
        extras: validated.selectedExtras,
        subtotal: validated.totalAmount,
        total_price: validated.totalAmount,
        status: 'confirmed',
        payment_status: 'paid',
      })
      .select()
      .single();

    if (error) {
      console.error('Database booking error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, bookingCode: (booking as any)?.booking_code || bookingCode, bookingId: (booking as any)?.id };
  } catch (err: any) {
    console.error('Server action booking error:', err);
    return { success: false, error: err?.message || 'Failed to process booking' };
  }
}
