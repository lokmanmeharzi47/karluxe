import { getStoreSettings } from "@/lib/storeSettings";
import { MapPin, Phone, MessageCircle, Mail, Clock, Globe } from "lucide-react";

export default async function ContactPage() {
  const storeSettings = await getStoreSettings();
  return (
    <div className="pt-32 pb-section-gap-desktop px-container-padding max-w-[1440px] mx-auto min-h-screen">
      <h1 className="font-display-lg text-headline-xl mb-12 text-center">Nous contacter</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-12 bg-surface-variant p-10">
          <div>
            <h3 className="font-headline-md text-headline-sm mb-4">{storeSettings.boutiqueName}</h3>
            <div className="font-body-md text-secondary leading-relaxed flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0" />
                <span>{storeSettings.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="pl-[32px]">Fondatrice : {storeSettings.founderName}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline-md text-headline-sm mb-4">Heures d'ouverture</h3>
            <ul className="font-body-md text-secondary leading-relaxed space-y-2">
              {storeSettings.businessHours.map((hours, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Clock size={20} className="mt-1 shrink-0" />
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline-md text-headline-sm mb-4">Coordonnées</h3>
            <ul className="font-body-md text-secondary leading-relaxed space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-on-surface" />
                <a href={`tel:${storeSettings.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">{storeSettings.phoneNumber}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="shrink-0 text-on-surface" />
                <a href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="hover:text-primary transition-colors">WhatsApp : {storeSettings.whatsappDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-on-surface" />
                <a href={`mailto:${storeSettings.emailAddress}`} className="hover:text-primary transition-colors">{storeSettings.emailAddress}</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={20} className="shrink-0 text-on-surface" />
                <a href={storeSettings.websiteUrl} target="_blank" className="hover:text-primary transition-colors">{storeSettings.websiteUrl.replace(/^https?:\/\//, '')}</a>
              </li>
            </ul>
          </div>

          <div className="w-full h-64 bg-background mt-8 overflow-hidden rounded-md border border-outline-variant/30">
            <iframe 
              src={storeSettings.googleMapsUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col justify-center">
          <h2 className="font-headline-md text-headline-sm mb-8">Envoyez-nous un message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Nom complet" className="w-full p-4 bg-surface-variant outline-none focus:border-primary border border-transparent" required />
              <input type="email" placeholder="Adresse e-mail" className="w-full p-4 bg-surface-variant outline-none focus:border-primary border border-transparent" required />
            </div>
            <input type="tel" placeholder="Numéro de téléphone" className="w-full p-4 bg-surface-variant outline-none focus:border-primary border border-transparent" />
            <input type="text" placeholder="Sujet" className="w-full p-4 bg-surface-variant outline-none focus:border-primary border border-transparent" required />
            <textarea placeholder="Votre message" rows={6} className="w-full p-4 bg-surface-variant outline-none focus:border-primary border border-transparent resize-none" required></textarea>
            
            <button type="submit" className="px-10 py-4 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#C8A96A] transition-colors">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
