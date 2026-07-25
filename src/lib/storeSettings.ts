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
        boutiqueName: data.boutique_name || "Maison de Couture Luxnibal",
        founderName: data.founder_name || "Kezzallyna",
        emailAddress: data.email_address || "contact@luxnibal.com",
        phoneNumber: data.phone_number || "+213 555 00 00 00",
        whatsappNumber: data.whatsapp_number || "213555000000",
        whatsappDisplay: `+${data.whatsapp_number || "213555000000"}`,
        address: data.address || "123 Avenue des Champs-Élysées, 75008 Paris",
        websiteUrl: data.website_url || "https://www.luxnibal.com",
        googleMapsUrl: data.google_maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.2950893!3d48.8737917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f3049b%3A0xc48c0897711422bb!2sArc%20de%20Triomphe!5e0!3m2!1sfr!2sfr!4v1715000000000",
        instagramUrl: data.instagram_url || "https://instagram.com/luxnibal",
        facebookUrl: data.facebook_url || "https://facebook.com/luxnibal",
        businessHours: data.business_hours || [
          "Lundi - Vendredi : 10h00 - 19h00",
          "Samedi : 11h00 - 18h00",
          "Dimanche : Fermé sur rendez-vous"
        ],
        currency: data.currency || "DZD",
        timezone: data.timezone || "GMT+1",
        maintenanceMode: data.maintenance_mode || false
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
