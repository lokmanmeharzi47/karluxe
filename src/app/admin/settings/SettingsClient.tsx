"use client";

import { Settings as SettingsIcon, Globe, Store, Mail, Bell, CreditCard, Shield, Save, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { updateStoreSettingsAction } from "@/app/actions/settings";

export default function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateStoreSettingsAction(formData);
    
    setIsSaving(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!initialSettings) {
    return <div className="p-10 text-center">Settings not initialized.</div>;
  }

  return (
    <form onSubmit={handleSave} className="pb-10 relative">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <CheckCircle2 size={24} className="text-green-600" />
          <div>
            <h4 className="font-bold text-sm">Paramètres sauvegardés</h4>
            <p className="text-xs">Les modifications ont été appliquées à la boutique.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md">Paramètres de la boutique</h1>
          <p className="text-secondary font-body-sm mt-1">Configurer les préférences globales, les notifications et les intégrations</p>
        </div>
        <button 
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm disabled:opacity-50"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
            <button onClick={() => setActiveTab("general")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'general' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <Store size={18} /> Configuration générale
            </button>
            <button onClick={() => setActiveTab("seo")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'seo' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <Globe size={18} /> Domaines et SEO
            </button>
            <button onClick={() => setActiveTab("payments")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'payments' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <CreditCard size={18} /> Paiements et Taxes
            </button>
            <button onClick={() => setActiveTab("emails")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'emails' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <Mail size={18} /> Modèles d'e-mails
            </button>
            <button onClick={() => setActiveTab("notifications")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'notifications' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <Bell size={18} /> Notifications
            </button>
            <button onClick={() => setActiveTab("legal")} type="button" className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors font-medium ${activeTab === 'legal' ? 'bg-surface-variant/50 border-l-4 border-primary text-primary font-bold' : 'border-l-4 border-transparent text-secondary hover:text-on-surface hover:bg-surface-variant/30'}`}>
              <Shield size={18} /> Légal et Confidentialité
            </button>
          </div>
        </div>

        {/* Settings Content - General Setup */}
        <div className="flex-1 space-y-6">
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Optimisation pour les moteurs de recherche (SEO)</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Titre SEO de la boutique</label>
                    <input name="seo_title" type="text" defaultValue={initialSettings.seo_title} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description SEO</label>
                    <textarea name="seo_description" rows={3} defaultValue={initialSettings.seo_description} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Mots clés (séparés par des virgules)</label>
                    <input name="seo_keywords" type="text" defaultValue={initialSettings.seo_keywords} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Nom de domaine personnalisé</h2>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Domaine (ex: www.maboutique.com)</label>
                  <input name="custom_domain" type="text" defaultValue={initialSettings.custom_domain} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Taxes</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Taux de taxe (%)</label>
                    <input name="tax_rate" type="number" step="0.01" defaultValue={initialSettings.tax_rate} className="w-full md:w-1/3 px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="tax_included" defaultChecked={initialSettings.tax_included} id="toggle-tax" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-outline-variant"/>
                        <label htmlFor="toggle-tax" className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer"></label>
                    </div>
                    <label className="text-sm font-medium">Les taxes sont incluses dans les prix</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Modèles d'e-mails envoyés aux clients</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Confirmation de commande</label>
                    <textarea name="email_order_confirmation" rows={5} defaultValue={initialSettings.email_order_confirmation} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Mise à jour d'expédition</label>
                    <textarea name="email_shipping_update" rows={5} defaultValue={initialSettings.email_shipping_update} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Notifications Administrateur</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">E-mail pour recevoir les notifications</label>
                    <input name="notification_email" type="email" defaultValue={initialSettings.notification_email} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    <label className="flex items-center gap-3">
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="notify_new_order" defaultChecked={initialSettings.notify_new_order} id="notify-order" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-outline-variant"/>
                          <label htmlFor="notify-order" className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer"></label>
                      </div>
                      <span className="text-sm font-medium">M'alerter lors d'une nouvelle commande</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="notify_low_stock" defaultChecked={initialSettings.notify_low_stock} id="notify-stock" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-outline-variant"/>
                          <label htmlFor="notify-stock" className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer"></label>
                      </div>
                      <span className="text-sm font-medium">M'alerter quand le stock est faible</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
                <h2 className="font-headline-md text-body-lg mb-6">Légal et Confidentialité</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Conditions générales de vente (CGV)</label>
                    <textarea name="terms_of_service" rows={4} defaultValue={initialSettings.terms_of_service} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Politique de confidentialité</label>
                    <textarea name="privacy_policy" rows={4} defaultValue={initialSettings.privacy_policy} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Politique de remboursement</label>
                    <textarea name="refund_policy" rows={4} defaultValue={initialSettings.refund_policy} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <>
          
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-body-lg mb-6">Informations sur la boutique</h2>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom de la boutique</label>
                  <input 
                    name="boutique_name"
                    type="text" 
                    defaultValue={initialSettings.boutique_name} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Founder Name</label>
                  <input 
                    name="founder_name"
                    type="text" 
                    defaultValue={initialSettings.founder_name} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Adresse e-mail</label>
                  <input 
                    name="email_address"
                    type="email" 
                    defaultValue={initialSettings.email_address} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Numéro de téléphone</label>
                  <input 
                    name="phone_number"
                    type="tel" 
                    defaultValue={initialSettings.phone_number} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Numéro WhatsApp (wa.me)</label>
                  <input 
                    name="whatsapp_number"
                    type="text" 
                    defaultValue={initialSettings.whatsapp_number} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Adresse de la boutique</label>
                <textarea 
                  name="address"
                  className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  rows={2}
                  defaultValue={initialSettings.address}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Site Web Officiel</label>
                  <input 
                    name="website_url"
                    type="url" 
                    defaultValue={initialSettings.website_url} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Lien Google Maps (Embed URL)</label>
                  <input 
                    name="google_maps_url"
                    type="url" 
                    defaultValue={initialSettings.google_maps_url} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">URL Instagram</label>
                  <input 
                    name="instagram_url"
                    type="url" 
                    defaultValue={initialSettings.instagram_url} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">URL Facebook</label>
                  <input 
                    name="facebook_url"
                    type="url" 
                    defaultValue={initialSettings.facebook_url} 
                    className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Heures d'ouverture (Une par ligne)</label>
                <textarea 
                  name="business_hours"
                  className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  rows={3}
                  defaultValue={(initialSettings.business_hours || []).join('\n')}
                ></textarea>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-body-lg mb-6">Localisation</h2>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Devise principale</label>
                  <select name="currency" defaultValue={initialSettings.currency} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary bg-white transition-colors">
                    <option value="DZD">Dinar algérien (DZD / DA)</option>
                    <option value="EUR">Euro (EUR / €)</option>
                    <option value="USD">Dollar américain (USD / $)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Fuseau horaire</label>
                  <select name="timezone" defaultValue={initialSettings.timezone} className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary bg-white transition-colors">
                    <option value="GMT+1">(GMT+01:00) Heure d'Afrique de l'Ouest - Alger</option>
                    <option value="GMT">(GMT+00:00) Heure moyenne de Greenwich</option>
                    <option value="GMT+2">(GMT+02:00) Heure d'été d'Europe centrale</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-body-lg mb-6 text-red-600">Zone de danger</h2>
            <div className="border border-red-200 rounded-lg p-4 bg-red-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-red-900 text-sm">Mode maintenance</h3>
                <p className="text-xs text-red-800 mt-1">Rendre la boutique invisible aux clients. Seuls les administrateurs y ont accès.</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="maintenance_mode" defaultChecked={initialSettings.maintenance_mode} id="toggle-maintenance" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-outline-variant"/>
                  <label htmlFor="toggle-maintenance" className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer"></label>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
