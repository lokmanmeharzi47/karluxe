'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { sendTelegramNotification } from '@/utils/telegram';
import { appendToAgentSheet } from '@/utils/googleSheets';

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

    // Fetch Car details for notifications
    const { data: carData } = await (supabase.from('cars') as any)
      .select('title, featured_image, agent_name')
      .eq('id', validated.carId)
      .single();

    const carTitle = carData?.title || 'Véhicule Inconnu';
    const carPhotoUrl = carData?.featured_image || '';
    const agentName = carData?.agent_name || 'Non Assigné';

    // Prepare message
    const message = `
🚨 <b>NOUVELLE RÉSERVATION</b> 🚨

👤 <b>Client:</b> ${validated.customerName}
📞 <b>Téléphone:</b> ${validated.customerPhone}
🚘 <b>Véhicule:</b> ${carTitle}
🏢 <b>Agent Associé:</b> ${agentName}
📅 <b>Dates:</b> ${validated.pickupDate} - ${validated.dropoffDate}
📍 <b>Lieu:</b> ${locationCombined}
💰 <b>Prix Total:</b> ${validated.totalAmount} DA
    `;

    // Send to Telegram
    await sendTelegramNotification(message);

    // Send to Google Sheets only if an agent is assigned
    if (carData?.agent_name) {
      await appendToAgentSheet(carData.agent_name, {
        customerName: validated.customerName,
        customerPhone: validated.customerPhone,
        carTitle: carTitle,
        pickupDate: validated.pickupDate,
        dropoffDate: validated.dropoffDate,
        location: locationCombined,
        totalPrice: validated.totalAmount,
        carPhotoUrl: carPhotoUrl,
      });
    }

    return { success: true, bookingCode: (booking as any)?.booking_code || bookingCode, bookingId: (booking as any)?.id };
  } catch (err: any) {
    console.error('Server action booking error:', err);
    return { success: false, error: err?.message || 'Failed to process booking' };
  }
}
