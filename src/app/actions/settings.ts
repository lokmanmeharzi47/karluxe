"use server";

import { createAdminClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getStoreSettingsAction() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .single();
    
  if (error || !data) {
    console.error("Failed to fetch store settings:", error);
    return null;
  }
  return data;
}

export async function updateStoreSettingsAction(formData: FormData) {
  const supabase = await createAdminClient();
  
  // Need to get the ID first
  const { data: currentSettings } = await supabase
    .from('store_settings')
    .select('id')
    .single();
    
  if (!currentSettings) return { error: "No settings found" };

  const businessHoursRaw = formData.get('business_hours') as string;
  const businessHours = businessHoursRaw ? businessHoursRaw.split('\n').filter(line => line.trim() !== '') : [];

  const updateData = {
    boutique_name: formData.get('boutique_name') as string,
    founder_name: formData.get('founder_name') as string,
    email_address: formData.get('email_address') as string,
    phone_number: formData.get('phone_number') as string,
    whatsapp_number: formData.get('whatsapp_number') as string,
    address: formData.get('address') as string,
    website_url: formData.get('website_url') as string,
    google_maps_url: formData.get('google_maps_url') as string,
    instagram_url: formData.get('instagram_url') as string,
    facebook_url: formData.get('facebook_url') as string,
    business_hours: businessHours,
    currency: formData.get('currency') as string,
    timezone: formData.get('timezone') as string,
    maintenance_mode: formData.get('maintenance_mode') === 'on',
    
    // New fields
    seo_title: formData.get('seo_title') as string,
    seo_description: formData.get('seo_description') as string,
    seo_keywords: formData.get('seo_keywords') as string,
    custom_domain: formData.get('custom_domain') as string,
    tax_rate: formData.get('tax_rate') ? parseFloat(formData.get('tax_rate') as string) : 0,
    tax_included: formData.get('tax_included') === 'on',
    email_order_confirmation: formData.get('email_order_confirmation') as string,
    email_shipping_update: formData.get('email_shipping_update') as string,
    notify_new_order: formData.get('notify_new_order') === 'on',
    notify_low_stock: formData.get('notify_low_stock') === 'on',
    notification_email: formData.get('notification_email') as string,
    terms_of_service: formData.get('terms_of_service') as string,
    privacy_policy: formData.get('privacy_policy') as string,
    refund_policy: formData.get('refund_policy') as string
  };

  const { error } = await supabase
    .from('store_settings')
    .update(updateData)
    .eq('id', currentSettings.id);

  if (error) {
    console.error("Failed to update store settings:", error);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
