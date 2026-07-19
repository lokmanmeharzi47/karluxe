import Link from "next/link";
import { getStoreSettings } from "@/lib/storeSettings";
import { MapPin, Phone, MessageCircle, Mail, Globe, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export default async function Footer() {
  const storeSettings = await getStoreSettings();
  return (
    <footer className="bg-tertiary text-on-tertiary w-full pt-section-gap-desktop pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-grid-gutter px-container-padding max-w-[1440px] mx-auto">
        
        {/* Intro */}
        <div className="md:col-span-4 mb-8 md:mb-0">
          <h2 className="font-headline-lg text-headline-lg text-on-tertiary mb-2">{storeSettings.boutiqueName}</h2>
          <p className="font-label-caps tracking-widest uppercase text-tertiary-fixed-dim/80 text-xs mb-6">Une maison fondée par {storeSettings.founderName}</p>
          <p className="font-body-md text-tertiary-fixed-dim/70 max-w-xs mb-8">Redéfinir l'élégance pour la génération moderne grâce à un savoir-faire inégalé et un design intemporel.</p>
          
          <div className="space-y-4">
            <h6 className="font-label-caps text-label-caps mb-4 uppercase tracking-widest text-on-tertiary/90">Heures d'ouverture</h6>
            <ul className="space-y-2 text-tertiary-fixed-dim/80 font-body-sm">
              {storeSettings.businessHours.map((hours, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Links */}
        <div className="md:col-span-2 space-y-4">
          <h6 className="font-label-caps text-label-caps mb-6 uppercase tracking-widest">Boutique</h6>
          <ul className="space-y-3">
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="/collection">Collections</Link></li>
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="/collection">Nouveautés</Link></li>
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="#">Service sur mesure</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <h6 className="font-label-caps text-label-caps mb-6 uppercase tracking-widest">À propos</h6>
          <ul className="space-y-3">
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="/about">Notre histoire</Link></li>
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="#">Savoir-faire</Link></li>
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="#">Développement durable</Link></li>
            <li><Link className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors" href="/contact">Adresse de la boutique</Link></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className="md:col-span-4 space-y-4">
          <h6 className="font-label-caps text-label-caps mb-6 uppercase tracking-widest">Contact</h6>
          <ul className="space-y-4 text-tertiary-fixed-dim/80 font-body-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>{storeSettings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0" />
              <a href={`tel:${storeSettings.phoneNumber.replace(/\s+/g, '')}`} className="hover:text-on-tertiary transition-colors">{storeSettings.phoneNumber}</a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="shrink-0" />
              <a href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="hover:text-on-tertiary transition-colors">WhatsApp : {storeSettings.whatsappDisplay}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0" />
              <a href={`mailto:${storeSettings.emailAddress}`} className="hover:text-on-tertiary transition-colors">{storeSettings.emailAddress}</a>
            </li>
          </ul>

          <div className="pt-4 flex space-x-5">
            <a href={storeSettings.instagramUrl} target="_blank" className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors">
              <InstagramIcon size={20} />
            </a>
            <a href={storeSettings.facebookUrl} target="_blank" className="text-tertiary-fixed-dim/70 hover:text-on-tertiary transition-colors">
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="md:col-span-12 pt-10 border-t border-tertiary-container/30 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-caps text-[10px] tracking-widest opacity-50">© {new Date().getFullYear()} {storeSettings.boutiqueName}. Tous droits réservés.</p>
          <div className="flex gap-6 opacity-50">
            <span className="material-symbols-outlined text-sm">payments</span>
            <span className="material-symbols-outlined text-sm">credit_card</span>
            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
