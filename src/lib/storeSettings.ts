import { createClient } from "@/utils/supabase/server";

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
    const supabase = await createClient();
    const { data } = await supabase.from('store_settings').select('*').single();
    
    if (data) {
      return {
        boutiqueName: data.boutique_name,
        founderName: data.founder_name,
        emailAddress: data.email_address,
        phoneNumber: data.phone_number,
        whatsappNumber: data.whatsapp_number,
        whatsappDisplay: `+${data.whatsapp_number}`, // simple formatting
        address: data.address,
        websiteUrl: data.website_url,
        googleMapsUrl: data.google_maps_url,
        instagramUrl: data.instagram_url,
        facebookUrl: data.facebook_url,
        businessHours: data.business_hours || [],
        currency: data.currency,
        timezone: data.timezone,
        maintenanceMode: data.maintenance_mode
      };
    }
  } catch (e) {
    console.error("Error fetching store settings", e);
  }

  // Fallback if DB fails
  return {
    boutiqueName: "Maison de Couture Luxnibal",
    founderName: "Kezzallyna",
    emailAddress: "contact@luxnibal.com",
    phoneNumber: "+213 555 00 00 00",
    whatsappNumber: "213555000000",
    whatsappDisplay: "+213 555 00 00 00",
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    websiteUrl: "https://www.luxnibal.com",
    googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.2950893!3d48.8737917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xc48c0897711422bb!2sArc%20de%20Triomphe!5e0!3m2!1sfr!2sfr!4v1715000000000",
    instagramUrl: "https://instagram.com/luxnibal",
    facebookUrl: "https://facebook.com/luxnibal",
    businessHours: [
      "Lundi - Vendredi : 10h00 - 19h00",
      "Samedi : 11h00 - 18h00",
      "Dimanche : Fermé sur rendez-vous"
    ],
    currency: "DZD",
    timezone: "GMT+1",
    maintenanceMode: false
  };
}
