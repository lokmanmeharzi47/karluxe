'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { z } from 'zod';

export async function toggleCarAvailabilityAction(carId: string, isAvailable: boolean) {
  try {
    const supabase = createAdminClient();
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
    const supabase = createAdminClient();
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
  brandId: z.string(),
  categoryId: z.string(),
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
  additionalImages: z.array(z.string().url()).optional(),
  isFeatured: z.boolean().optional(),
  agentName: z.string().optional(),
});

export async function addCarAction(input: z.infer<typeof addCarSchema>) {
  try {
    const validated = addCarSchema.parse(input);
    const supabase = createAdminClient();
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
        agent_name: validated.agentName || null,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    if (validated.additionalImages && validated.additionalImages.length > 0) {
      const imagesToInsert = validated.additionalImages.map((url, idx) => ({
        car_id: newCar.id,
        url: url,
        is_primary: false,
        display_order: idx + 1
      }));
      await (supabase.from('vehicle_images') as any).insert(imagesToInsert);
    }

    return { success: true, car: newCar };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add supercar to fleet' };
  }
}

// Action for Adding New Category
const addCategorySchema = z.object({
  name: z.string().min(2, 'Le nom de catégorie doit contenir au moins 2 caractères'),
  description: z.string().optional(),
});

export async function addCategoryAction(input: z.infer<typeof addCategorySchema>) {
  try {
    const validated = addCategorySchema.parse(input);
    const supabase = createAdminClient();
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data: newCategory, error } = await (supabase.from('categories') as any)
      .insert({
        name: validated.name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        description: validated.description || 'Collection exclusive de prestige',
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, category: newCategory };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Échec de l\'ajout de la catégorie' };
  }
}

// Action for Adding New Automotive Brand
const addBrandSchema = z.object({
  name: z.string().min(2, 'Le nom de la marque doit contenir au moins 2 caractères'),
  country: z.string().optional(),
  logoUrl: z.string().optional(),
});

export async function addBrandAction(input: z.infer<typeof addBrandSchema>) {
  try {
    const validated = addBrandSchema.parse(input);
    const supabase = createAdminClient();
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data: newBrand, error } = await (supabase.from('brands') as any)
      .insert({
        name: validated.name,
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        country: validated.country || 'Italie / Allemagne',
        logo_url: validated.logoUrl || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, brand: newBrand };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Échec de l\'ajout de la marque' };
  }
}

// Action for Adding New Agency / Branch
const addAgencySchema = z.object({
  name: z.string().min(2, 'Le nom de l\'agence doit contenir au moins 2 caractères'),
  city: z.string().min(2, 'La ville / wilaya est requise'),
  address: z.string().min(3, 'L\'adresse de l\'agence est requise'),
  phone: z.string().optional(),
});

export async function addAgencyAction(input: z.infer<typeof addAgencySchema>) {
  try {
    const validated = addAgencySchema.parse(input);
    const supabase = createAdminClient();

    const { data: newAgency, error } = await (supabase.from('locations') as any)
      .insert({
        name: validated.name,
        city: validated.city,
        country: 'Algérie',
        address: validated.address,
        is_airport: false,
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, agency: newAgency };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Échec de l\'ajout de l\'agence' };
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
    const supabase = createAdminClient();

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
    const supabase = createAdminClient();

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
