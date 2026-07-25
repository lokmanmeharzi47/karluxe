'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

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

const addCarSchema = z.object({
  title: z.string().min(2),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  year: z.number().int().min(2010),
  dailyRate: z.number().positive(),
  securityDeposit: z.number().positive(),
  transmission: z.enum(['Automatic', 'Dual-Clutch', 'Manual']),
  fuelType: z.enum(['Gasoline', 'Hybrid', 'Electric', 'Twin-Turbo V8', 'V12']),
  seats: z.number().int().min(1),
  acceleration: z.string(),
  topSpeed: z.string(),
  horsepower: z.number().int().positive(),
  engine: z.string(),
  location: z.string(),
  description: z.string(),
  featuredImage: z.string().url(),
  isFeatured: z.boolean().optional(),
});

export async function addCarAction(input: z.infer<typeof addCarSchema>) {
  try {
    const validated = addCarSchema.parse(input);
    const supabase = await createServerClient();
    const slug = validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data: newCar, error } = await (supabase.from('cars') as any)
      .insert({
        title: validated.title,
        slug: `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
        brand_id: validated.brandId,
        category_id: validated.categoryId,
        year: validated.year,
        daily_rate: validated.dailyRate,
        security_deposit: validated.securityDeposit,
        transmission: validated.transmission,
        fuel_type: validated.fuelType,
        seats: validated.seats,
        acceleration: validated.acceleration,
        top_speed: validated.topSpeed,
        horsepower: validated.horsepower,
        engine: validated.engine,
        location: validated.location,
        description: validated.description,
        featured_image: validated.featuredImage,
        is_featured: validated.isFeatured || false,
        is_available: true,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, car: newCar };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add supercar to fleet' };
  }
}

const addLocationSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  address: z.string().min(5),
  isAirport: z.boolean().optional(),
});

export async function addLocationAction(input: z.infer<typeof addLocationSchema>) {
  try {
    const validated = addLocationSchema.parse(input);
    const supabase = await createServerClient();

    const { data: newLoc, error } = await (supabase.from('locations') as any)
      .insert({
        name: validated.name,
        city: validated.city,
        country: validated.country,
        address: validated.address,
        is_airport: validated.isAirport || false,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, location: newLoc };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add rental location' };
  }
}

const addCouponSchema = z.object({
  code: z.string().min(3),
  discountPercent: z.number().min(1).max(100),
  validUntil: z.string(),
  maxUses: z.number().int().positive(),
});

export async function addCouponAction(input: z.infer<typeof addCouponSchema>) {
  try {
    const validated = addCouponSchema.parse(input);
    const supabase = await createServerClient();

    const { data: newCoupon, error } = await (supabase.from('coupons') as any)
      .insert({
        code: validated.code.toUpperCase(),
        discount_percent: validated.discountPercent,
        valid_until: validated.validUntil,
        max_uses: validated.maxUses,
        used_count: 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, coupon: newCoupon };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add promo coupon' };
  }
}

const addDriverSchema = z.object({
  name: z.string().min(2),
  phone: z.string(),
  experienceYears: z.number().int().min(1),
  photoUrl: z.string().optional(),
});

export async function addDriverAction(input: z.infer<typeof addDriverSchema>) {
  try {
    const validated = addDriverSchema.parse(input);
    const supabase = await createServerClient();

    const { data: newDriver, error } = await (supabase.from('drivers') as any)
      .insert({
        name: validated.name,
        phone: validated.phone,
        experience_years: validated.experienceYears,
        photo_url: validated.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        status: 'Available',
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, driver: newDriver };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add chauffeur driver' };
  }
}
