import { getStoreSettings } from "@/lib/storeSettings";
import { MapPin, Phone, MessageCircle, Mail, Globe } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export default async function AboutPage() {
  const storeSettings = await getStoreSettings();
  return (
    <div className="pt-32 pb-section-gap-desktop">
      {/* Hero Section */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 text-center">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-4">Notre héritage</span>
        <h1 className="font-display-lg text-headline-xl mb-8">L'histoire de Maison de Couture</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Fondée sur les principes de l'élégance intemporelle et d'un savoir-faire inégalé, Maison de Couture a redéfini le luxe moderne en Algérie et au-delà. Chaque point raconte une histoire de passion, de tradition et d'art.
        </p>
      </section>

      {/* Founder Section */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 text-center border-t border-outline-variant/30 pt-16">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-4">Notre Fondatrice</span>
        <h2 className="font-display-md text-headline-lg mb-8">{storeSettings.founderName}</h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          En tant que fondatrice de {storeSettings.boutiqueName}, sa vision a toujours été de créer des vêtements féminins élégants, intemporels et de haute qualité. Son dévouement à l'excellence se reflète dans chaque pièce soigneusement conçue et sélectionnée par notre maison.
        </p>
      </section>

      {/* Image Grid */}
      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-surface-variant bg-cover bg-center" style={{ backgroundImage: "url('/images/products/lux_coat.png')" }}></div>
        <div className="flex flex-col justify-center px-8 md:px-16">
          <h2 className="font-headline-md text-headline-sm mb-4">Qualité sans compromis</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Nous ne nous approvisionnons qu'en tissus de la plus haute qualité provenant d'usines de renommée mondiale. Des soies somptueuses aux cachemires rares, nos matériaux sont sélectionnés pour leur toucher, leur tombé et leur longévité extraordinaires.
          </p>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Nos maîtres artisans dans nos ateliers privés possèdent des décennies d'expérience, employant des techniques de haute couture traditionnelles transmises de génération en génération pour créer des vêtements qui sont de véritables œuvres d'art.
          </p>
        </div>
      </section>

      <section className="px-container-padding max-w-[1440px] mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 flex-col-reverse md:flex-row-reverse">
        <div className="flex flex-col justify-center px-8 md:px-16 md:order-1">
          <h2 className="font-headline-md text-headline-sm mb-4">Notre vision</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Nous croyons que le vrai luxe ne concerne pas seulement ce que vous portez, mais comment vous vous sentez. Notre vision est de donner à nos clients confiance et grâce, en proposant des pièces qui transcendent les tendances éphémères.
          </p>
        </div>
        <div className="aspect-square bg-surface-variant bg-cover bg-center md:order-2" style={{ backgroundImage: "url('/images/products/lux_velvet.png')" }}></div>
      </section>

      {/* Visit Our Boutique */}
      <section className="px-container-padding max-w-[1440px] mx-auto pt-16 border-t border-outline-variant/30">
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-4">L'expérience</span>
          <h2 className="font-headline-md text-headline-lg">Visitez Notre Boutique</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8 bg-surface p-8 md:p-12 border border-outline-variant/30 rounded-lg shadow-sm">
            <div>
              <h3 className="font-headline-md text-headline-sm mb-6">{storeSettings.boutiqueName}</h3>
              <ul className="font-body-md text-secondary leading-relaxed space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-1 shrink-0" />
                  <span>{storeSettings.address}</span>
                </li>
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
            
            <div className="pt-6 border-t border-outline-variant/30">
              <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface mb-4">Réseaux sociaux</h4>
              <div className="flex space-x-5">
                <a href={storeSettings.instagramUrl} target="_blank" className="text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <InstagramIcon size={20} />
                  <span className="font-body-sm">Instagram</span>
                </a>
                <a href={storeSettings.facebookUrl} target="_blank" className="text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <FacebookIcon size={20} />
                  <span className="font-body-sm">Facebook</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full h-full min-h-[400px] bg-surface-variant overflow-hidden rounded-lg shadow-sm">
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

