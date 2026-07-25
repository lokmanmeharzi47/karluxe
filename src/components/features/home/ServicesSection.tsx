'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Plane, UserCheck, ConciergeBell, ShieldCheck, Clock, Truck } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Plane,
      title: 'Livraison VIP Piste & Héliport',
      description: 'Prise en charge directe au pied de votre jet privé ou hélicoptère à Alger, Oran, Monaco et Dubaï.',
    },
    {
      icon: UserCheck,
      title: 'Chauffeur Privé Trilingue',
      description: 'Chauffeurs professionnels discrets et expérimentés assurant vos déplacements avec un niveau de sécurité maximal.',
    },
    {
      icon: ConciergeBell,
      title: 'Conciergerie VIP 24/7',
      description: 'Gestion des demandes spéciales, réservations de dernière minute et assistance personnalisée constante.',
    },
    {
      icon: ShieldCheck,
      title: 'Assurance Zéro-Franchise',
      description: 'Protection intégrale tout-risque Platinum garantissant une sérénité absolue au volant.',
    },
    {
      icon: Clock,
      title: 'Flexibilité Horaires & Restitution',
      description: 'Restitution du véhicule à l\'emplacement de votre choix sans contrainte horaire.',
    },
    {
      icon: Truck,
      title: 'Livraison à Domicile & Hôtel',
      description: 'Acheminement de votre supercar sur plateau sécurisé devant votre résidence ou hôtel de luxe.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Services d'Exception"
          title="Expérience Concierge Sur-Mesure"
          subtitle="Une gamme complète de prestations haut de gamme adaptées aux exigences de notre clientèle VIP."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <GlassCard key={index} className="p-8 border border-[rgba(212,175,55,0.2)] bg-[#111111]/80 hover:border-[#D4AF37]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E8C65A] flex items-center justify-center mb-6 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading uppercase text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-xs text-[#B6B6B6] leading-relaxed">
                  {s.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
