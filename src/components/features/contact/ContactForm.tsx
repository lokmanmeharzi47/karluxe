'use client';

import React, { useState } from 'react';
import { LuxuryButton } from '@/components/ui/LuxuryButton';
import { sendContactMessageAction } from '@/app/actions/contactAction';
import { User, Phone, Mail, MessageSquare, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Location Véhicule de Prestige');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await sendContactMessageAction({
      name,
      phone,
      email,
      subject,
      message,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Une erreur est survenue.');
    }
  };

  if (submitted) {
    return (
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[rgba(212,175,55,0.4)] bg-[#111111]/95 text-center space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-heading uppercase text-white tracking-wide">
            Message Envoyé avec Succès !
          </h3>
          <p className="text-sm text-[#B6B6B6] max-w-md mx-auto leading-relaxed">
            Merci <span className="text-white font-semibold">{name}</span>. Notre conciergerie VIP a bien reçu votre demande et vous contactera dans les plus brefs délais.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-xs text-[#B6B6B6] space-y-1">
          <span className="block text-[#D4AF37] font-semibold uppercase tracking-wider">Assistance Immédiate</span>
          <span>Pour toute urgence, joignez-nous directement au <a href="https://wa.me/213778612190" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline hover:text-[#25D366]">0778 61 21 90</a>.</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider hover:underline pt-2 cursor-pointer"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[rgba(212,175,55,0.25)] bg-[#111111]/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            Formulaire Conciergerie
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white tracking-wide">
          Envoyez-nous Votre Demande
        </h3>
        <p className="text-xs text-[#B6B6B6]">
          Remplissez les champs ci-dessous. Notre équipe vous répondra sous 1 heure.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom & Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Nom complet *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Karim Benali"
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none transition-all placeholder:text-[#B6B6B6]/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Téléphone *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 0778 61 21 90"
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none transition-all placeholder:text-[#B6B6B6]/50"
            />
          </div>
        </div>

        {/* Email & Sujet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Adresse Email (Optionnel)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@exemple.com"
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none transition-all placeholder:text-[#B6B6B6]/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Prestation Souhaitée *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl py-3 px-4 text-xs font-semibold text-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="Location Véhicule de Prestige">Location Véhicule de Prestige</option>
              <option value="Service Chauffeur Privé VIP">Service Chauffeur Privé VIP</option>
              <option value="Cortège de Mariage & Événement">Cortège de Mariage & Événement</option>
              <option value="Transfert Aéroport VIP Houari Boumediene">Transfert Aéroport VIP Houari Boumediene</option>
              <option value="Location Longue Durée Corporate">Location Longue Durée Corporate</option>
              <option value="Autre Demande Spécifique">Autre Demande Spécifique</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-[#B6B6B6] font-semibold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" /> Votre Message ou Dates Souhaitées *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Précisez le véhicule souhaité, les dates de votre séjour ou toute demande particulière..."
            className="w-full bg-[#050505] border border-[rgba(212,175,55,0.25)] hover:border-[rgba(212,175,55,0.45)] focus:border-[#D4AF37] rounded-xl p-4 text-xs font-semibold text-white focus:outline-none transition-all resize-none placeholder:text-[#B6B6B6]/50 leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <LuxuryButton
          type="submit"
          variant="gold"
          size="lg"
          className="w-full uppercase font-bold tracking-wider py-4 mt-2"
          disabled={loading}
          icon={loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer ma Demande Concierge'}
        </LuxuryButton>
      </form>
    </div>
  );
};
