'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

const bookingSchema = z.object({
  carId: z.string().uuid(),
  customerName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  customerPhone: z.string().min(6, 'Numéro de téléphone invalide'),
  customerEmail: z.string().optional(),
  pickupDate: z.string(),
  dropoffDate: z.string(),
  wilaya: z.string().optional(),
  commune: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
  pickupLocation: z.string().optional(),
  dropoffLocation: z.string().optional(),
  insuranceTier: z.string().optional(),
  selectedExtras: z.array(z.string()).optional(),
  totalAmount: z.number().positive(),
});

export type CreateBookingInput = z.infer<typeof bookingSchema>;

export async function createBookingAction(input: CreateBookingInput) {
  try {
    const validated = bookingSchema.parse(input);
    const supabase = await createServerClient();

    const bookingCode = `KLX-${Math.floor(10000 + Math.random() * 90000)}`;
    const locationCombined = validated.wilaya
      ? `${validated.wilaya}${validated.commune ? `, ${validated.commune}` : ''}`
      : validated.pickupLocation || 'Monaco VIP Heliport Hub';

    const { data: booking, error } = await (supabase.from('bookings') as any)
      .insert({
        booking_code: bookingCode,
        car_id: validated.carId,
        customer_name: validated.customerName,
        customer_email: validated.customerEmail || `${validated.customerPhone}@karluxe-rental.com`,
        customer_phone: validated.customerPhone,
        pickup_date: validated.pickupDate,
        dropoff_date: validated.dropoffDate,
        pickup_location: locationCombined,
        dropoff_location: locationCombined,
        insurance_tier: validated.insuranceTier || 'Standard',
        extras: validated.selectedExtras || [],
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
