import { createStaticClient } from "@/utils/supabase/server";

export interface StoreSettings {
  boutiqueName: string;
  founderName: string;
  emailAddress: string;
  phoneNumber: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  address: string;
  websiteUrl: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  businessHours: string[];
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
}

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const supabase = createStaticClient();
    const { data } = await supabase.from('settings').select('*').single();
    
    if (data) {
      return {
        boutiqueName: data.boutique_name || "KarLuxe Location de Luxe",
        founderName: data.founder_name || "KarLuxe Executive",
        emailAddress: data.email_address || "contact@karluxe.com",
        phoneNumber: data.phone_number || "+213 555 00 00 00",
        whatsappNumber: data.whatsapp_number || "213555000000",
        whatsappDisplay: `+${data.whatsapp_number || "213555000000"}`,
        address: data.address || "Alger, Algérie",
        websiteUrl: data.website_url || "https://karluxe.com",
        googleMapsUrl: data.google_maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d3.0588!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f57c5a0a3d%3A0x2865913e2f9d50!2sAlger!5e0!3m2!1sfr!2sdz!4v1715000000000",
        instagramUrl: data.instagram_url || "https://instagram.com/karluxe",
        facebookUrl: data.facebook_url || "https://facebook.com/karluxe",
        businessHours: data.business_hours || [
          "Lundi - Dimanche : 24h/24 (Sur réservation)",
          "Service Chauffeur VIP : 7j/7"
        ],
        currency: data.currency || "DZD",
        timezone: data.timezone || "GMT+1",
        maintenanceMode: data.maintenance_mode || false
      };
    }
  } catch (e) {
    console.error("Error fetching store settings", e);
  }

  // Fallback if DB fails or data is missing
  return {
    boutiqueName: "KarLuxe Location de Luxe",
    founderName: "KarLuxe Executive",
    emailAddress: "contact@karluxe.com",
    phoneNumber: "+213 555 00 00 00",
    whatsappNumber: "213555000000",
    whatsappDisplay: "+213 555 00 00 00",
    address: "Alger, Algérie",
    websiteUrl: "https://karluxe.com",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d3.0588!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb2f57c5a0a3d%3A0x2865913e2f9d50!2sAlger!5e0!3m2!1sfr!2sdz!4v1715000000000",
    instagramUrl: "https://instagram.com/karluxe",
    facebookUrl: "https://facebook.com/karluxe",
    businessHours: [
      "Lundi - Dimanche : 24h/24 (Sur réservation)",
      "Service Chauffeur VIP : 7j/7"
    ],
    currency: "DZD",
    timezone: "GMT+1",
    maintenanceMode: false
  };
}
