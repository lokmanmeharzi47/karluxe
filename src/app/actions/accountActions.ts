'use server';

import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updateProfileSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string(),
  driverLicenseNumber: z.string().optional(),
});

export async function updateProfileAction(input: z.infer<typeof updateProfileSchema>) {
  try {
    const validated = updateProfileSchema.parse(input);
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await (supabase.from('profiles') as any)
      .update({
        full_name: validated.fullName,
        phone: validated.phone,
        driver_license_number: validated.driverLicenseNumber || null,
      })
      .eq('id', user.id);

    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update profile' };
  }
}
