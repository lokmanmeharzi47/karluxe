'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Faq } from '@/types';

interface FaqSectionProps {
  faqs: Faq[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
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
                key={faq.id || index}
                className="glass-panel rounded-2xl border border-[rgba(212,175,55,0.2)] bg-[#111111]/80 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-bold font-heading uppercase text-white flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-[#B6B6B6] leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
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
