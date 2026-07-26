import { getStoreSettings } from "@/lib/storeSettings";
import { MapPin, Phone, MessageCircle, Mail, Shield, Car, Award } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export default async function AboutPage() {
  const storeSettings = await getStoreSettings();
  return (
    <div className="pt-32 pb-section-gap-desktop bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 text-center">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#D4AF37] block mb-4">Notre Prestige</span>
        <h1 className="font-display-lg text-headline-xl mb-8">L'Excellence KarLuxe</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-secondary">
          Fondée sur des exigences d'exception et un service sur-mesure, KarLuxe est la référence en Algérie pour la location de véhicules de prestige, supercars et services de chauffeur privé VIP.
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 text-center border-t border-outline-variant/30 pt-16">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#D4AF37] block mb-4">Notre Engagement</span>
        <h2 className="font-display-md text-headline-lg mb-8">Une Expérience Sans Concession</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-secondary">
          Notre flotte rassemble les plus grandes marques de l'automobile mondiale : Porsche, Ferrari, Lamborghini, Rolls-Royce et Mercedes-AMG. Chaque véhicule fait l'objet d'un entretien méticuleux et d'une préparation haut de gamme pour garantir votre sécurité et un confort absolu.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#111111] p-8 border border-[rgba(212,175,55,0.2)] rounded-lg text-center">
          <Car className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="font-headline-md text-headline-sm mb-3">Flotte d'Exception</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Derniers modèles des marques légendaires disponibles pour courte et longue durée avec livraison partout en Algérie.
          </p>
        </div>

        <div className="bg-[#111111] p-8 border border-[rgba(212,175,55,0.2)] rounded-lg text-center">
          <Award className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="font-headline-md text-headline-sm mb-3">Chauffeurs VIP</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Service professionnel de chauffeurs privés bilingues, discrets et expérimentés pour vos événements et cortèges.
          </p>
        </div>

        <div className="bg-[#111111] p-8 border border-[rgba(212,175,55,0.2)] rounded-lg text-center">
          <Shield className="w-10 h-10 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="font-headline-md text-headline-sm mb-3">Assurance & Sécurité</h3>
          <p className="text-sm text-secondary leading-relaxed">
            Couverture assurance tout-risque premium et assistance 24/7 pour une sérénité totale lors de vos trajets.
          </p>
        </div>
      </section>

      {/* Contact & Boutique */}
      <section className="px-container-padding max-w-[1440px] mx-auto pt-16 border-t border-outline-variant/30">
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#D4AF37] block mb-4">Contact & Réservation</span>
          <h2 className="font-headline-md text-headline-lg">Notre Agence Principale</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8 bg-[#111111] p-8 md:p-12 border border-outline-variant/30 rounded-lg shadow-sm">
            <div>
              <h3 className="font-headline-md text-headline-sm mb-6 text-[#D4AF37]">{storeSettings.boutiqueName}</h3>
              <ul className="font-body-md text-secondary leading-relaxed space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-1 shrink-0 text-[#D4AF37]" />
                  <span>{storeSettings.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0 text-[#D4AF37]" />
                  <a href={`tel:${storeSettings.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-[#D4AF37] transition-colors">{storeSettings.phoneNumber}</a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={20} className="shrink-0 text-[#D4AF37]" />
                  <a href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="hover:text-[#D4AF37] transition-colors">WhatsApp : {storeSettings.whatsappDisplay}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="shrink-0 text-[#D4AF37]" />
                  <a href={`mailto:${storeSettings.emailAddress}`} className="hover:text-[#D4AF37] transition-colors">{storeSettings.emailAddress}</a>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-outline-variant/30">
              <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface mb-4 text-[#D4AF37]">Réseaux sociaux</h4>
              <div className="flex space-x-5">
                <a href={storeSettings.instagramUrl} target="_blank" className="text-secondary hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <InstagramIcon size={20} />
                  <span className="font-body-sm">Instagram</span>
                </a>
                <a href={storeSettings.facebookUrl} target="_blank" className="text-secondary hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <FacebookIcon size={20} />
                  <span className="font-body-sm">Facebook</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full h-full min-h-[400px] bg-surface-variant overflow-hidden rounded-lg shadow-sm border border-[rgba(212,175,55,0.2)]">
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
      </section>
    </div>
  );
}

