import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/features/contact/ContactForm";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ShieldCheck,
  Plane,
  Building,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Conciergerie VIP",
  description: "Contactez le service concierge KarLuxe pour réserver votre voiture de luxe en Algérie. Service disponible 24h/24 et 7j/7 au 0778 61 21 90.",
};

export default function ContactPage() {
  const directChannels = [
    {
      title: "WhatsApp VIP Direct",
      value: "0778 61 21 90",
      description: "Assistance et devis instantanés 7j/7",
      href: "https://wa.me/213778612190?text=Bonjour%20KarLuxe%2C%20je%20souhaite%20des%20informations%20pour%20une%20r%C3%A9servation.",
      badge: "Réponse Rapide",
      badgeColor: "bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      title: "Ligne Conciergerie",
      value: "+213 (0) 778 61 21 90",
      description: "Appel direct sans attente 24h/24",
      href: "tel:+213778612190",
      badge: "24h/24 • 7j/7",
      badgeColor: "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30",
      icon: <Phone className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      title: "Email Officiel",
      value: "contact@karluxlocation.com",
      description: "Demandes corporate & partenariats",
      href: "mailto:contact@karluxlocation.com",
      badge: "Service Client",
      badgeColor: "bg-white/10 text-white border-white/20",
      icon: <Mail className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 selection:bg-[#D4AF37] selection:text-black relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Page Header */}
        <SectionHeading
          badge="Conciergerie VIP & Réservations"
          title="Service Client & Conciergerie Privée"
          subtitle="Une équipe d'experts à votre entière disposition 24h/24 et 7j/7 pour concrétiser vos projets de mobilité d'exception en Algérie."
        />

        {/* 3 High-Impact Fast Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directChannels.map((channel, i) => (
            <a
              key={i}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-panel rounded-3xl p-6 border border-[rgba(212,175,55,0.25)] hover:border-[#D4AF37] bg-[#111111]/90 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-1 group block cursor-pointer"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  {channel.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${channel.badgeColor}`}>
                  {channel.badge}
                </span>
              </div>

              <span className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold block">
                {channel.title}
              </span>
              <span className="text-base sm:text-lg font-bold font-heading text-white group-hover:text-[#D4AF37] transition-colors block mt-1 truncate">
                {channel.value}
              </span>
              <p className="text-xs text-[#B6B6B6] mt-1.5 flex items-center justify-between">
                <span>{channel.description}</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </p>
            </a>
          ))}
        </div>

        {/* Main 2-Column Grid: Concierge Info vs Interactive Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Informations Pratiques & Salons VIP */}
          <div className="lg:col-span-5 space-y-6">
            {/* Disponibilités 24/7 */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-[rgba(212,175,55,0.25)] bg-[#111111]/90 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-heading text-white tracking-wider">
                    Horaires & Permanence
                  </h4>
                  <span className="text-[11px] text-[#B6B6B6]">Disponibilité continue sur réservation</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs">
                <li className="flex justify-between items-center text-[#B6B6B6]">
                  <span>Réservations & Accueil téléphonique</span>
                  <span className="text-white font-semibold">24h/24 • 7j/7</span>
                </li>
                <li className="flex justify-between items-center text-[#B6B6B6]">
                  <span>Remise de clés & Restitution VIP</span>
                  <span className="text-[#D4AF37] font-semibold">Horaires sur-mesure</span>
                </li>
                <li className="flex justify-between items-center text-[#B6B6B6]">
                  <span>Service Chauffeur Privé VIP</span>
                  <span className="text-white font-semibold">Jour et Nuit</span>
                </li>
              </ul>
            </div>

            {/* Lieux de Prise en Charge */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-[rgba(212,175,55,0.25)] bg-[#111111]/90 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-heading text-white tracking-wider">
                    Lieux de Prise en Charge
                  </h4>
                  <span className="text-[11px] text-[#B6B6B6]">Livraison concierge partout en Algérie</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Plane className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Aéroport International Houari Boumediene</h5>
                    <p className="text-[11px] text-[#B6B6B6] mt-0.5 leading-relaxed">
                      Accueil personnalisé à la sortie du terminal VIP avec pancarte nominative et prise en charge des bagages.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Building className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Hôtels de Prestige & Résidences Privées</h5>
                    <p className="text-[11px] text-[#B6B6B6] mt-0.5 leading-relaxed">
                      Livraison directe du véhicule avec mise en main complète à Alger, Oran, Constantine et toutes les wilayas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Garanties Prestige */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-[rgba(212,175,55,0.25)] bg-[#111111]/90 space-y-3">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase font-heading text-white tracking-wider">
                    L'Excellence KarLuxe
                  </h4>
                  <span className="text-[11px] text-[#B6B6B6]">Standards de qualité 5 étoiles</span>
                </div>
              </div>

              <ul className="space-y-2 text-[11px] text-[#B6B6B6]">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Flotte exclusive d'exception révisée et certifiée</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Confidentialité et discrétion absolue garanties</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Assurance tous risques et assistance routière 24/7</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Luxury Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
