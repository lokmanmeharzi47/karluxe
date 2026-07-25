'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: "Quelles sont les conditions requises pour louer une supercar ?",
      a: "Le conducteur doit avoir au minimum 21 ans (25 ans pour certaines hypercars), présenter un permis de conduire valide depuis plus de 2 ans et fournir une pièce d'identité officielle.",
    },
    {
      q: "Comment fonctionne la livraison sur piste d'aéroport ou à domicile ?",
      a: "Notre service concierge livre le véhicule directement à l'adresse indiquée (Aéroport d'Alger, Oran, Héliport de Monaco, Hôtel, etc.) à l'heure exacte convenue.",
    },
    {
      q: "Quel est le montant de la caution et quelles sont les modalités ?",
      a: "La caution varie selon la catégorie du véhicule et est pré-autorisée par empreinte bancaire ou chèque de garantie, restituée dès la fin de la location.",
    },
    {
      q: "Les assurances sont-elles incluses dans le tarif journalier ?",
      a: "Oui, tous nos véhicules bénéficient d'une assurance tout-risque intégrale. Une option de couverture Platinum avec franchise réduite est également disponible.",
    },
    {
      q: "Puis-je réserver un véhicule avec chauffeur privé ?",
      a: "Absolument. Nous proposons un service de chauffeur trilingue pour vos événements professionnels, mariages et déplacements exécutifs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Foire Aux Questions"
          title="Questions Fréquentes"
          subtitle="Toutes les réponses relatives à nos modalités de réservation et services de location."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#111111]/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-bold font-heading uppercase text-white flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-[#B6B6B6] leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
