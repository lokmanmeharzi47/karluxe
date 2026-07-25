'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What driver documentation is required to rent a hypercar?',
      answer: 'Drivers must possess a valid driver’s license (held for a minimum of 2 years), a valid passport, and be at least 25 years old for supercars (21 for sports category). International driving permits are accepted.',
    },
    {
      question: 'How does airport tarmac and hotel delivery work?',
      answer: 'Our white-glove concierge delivers your vehicle directly to your private jet tarmac, airport VIP terminal, or hotel entrance with a fully prepped, sanitized vehicle and personal orientation.',
    },
    {
      question: 'What is included in the Security Deposit and Insurance?',
      answer: 'All rentals include standard comprehensive coverage. Our Zero-Excess Platinum insurance option waives security deposit liabilities entirely.',
    },
    {
      question: 'Can I request a personal chauffeur with my vehicle?',
      answer: 'Yes. Our licensed executive chauffeurs are available 24/7 in Monaco, Dubai, Paris, LA, and Zurich for airport transfers, events, or multi-day itineraries.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#050505] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clear Guidance"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about reserving exotic hypercars with KarLuxe."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-[rgba(212,175,55,0.2)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-lg font-bold font-heading text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-[#B6B6B6] leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
