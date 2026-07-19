"use client";

import { User, Mail, Phone, Lock, Save, Camera, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfileInfoAction, updatePasswordAction } from "@/app/actions/profile";

export default function ProfileClient({ initialProfile }: { initialProfile: any }) {
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fullName = initialProfile?.full_name || "Karim Admin";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";
  const email = initialProfile?.email || "admin@luxnibal.com";
  const phone = initialProfile?.phone || "+213 555 00 00 01";
  const role = initialProfile?.admin_role === 'superadmin' ? 'Super Administrateur' : 'Administrateur';

  const displaySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setError(null);
    setShowSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await updateProfileInfoAction(formData);
    
    setIsSavingProfile(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      displaySuccess("Vos informations ont été enregistrées avec succès.");
      router.refresh();
    }
  };

  const handlePasswordSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setError(null);
    setShowSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await updatePasswordAction(formData);
    
    setIsSavingPassword(false);
    
    if (result.error) {
      setError(result.error);
    } else {
      displaySuccess("Votre mot de passe a été mis à jour avec succès.");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="pb-10 relative">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <CheckCircle2 size={24} className="text-green-600" />
          <div>
            <h4 className="font-bold text-sm">Opération réussie</h4>
            <p className="text-xs">{successMessage}</p>
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
          <h1 className="font-headline-md text-headline-md">Mon profil</h1>
          <p className="text-secondary font-body-sm mt-1">Gérez vos informations personnelles et vos paramètres de sécurité</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 text-center">
            <div className="relative inline-block mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-4xl uppercase mx-auto overflow-hidden">
                {firstName.charAt(0)}{lastName.charAt(0)}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </div>
            <h2 className="font-headline-md text-body-lg">{fullName}</h2>
            <p className="text-primary font-medium text-sm mb-4">{role}</p>
            <div className="flex flex-col gap-2 text-left bg-surface-variant/30 p-4 rounded-lg border border-outline-variant">
              <div className="flex items-center gap-2 text-sm text-secondary break-all">
                <Mail size={14} className="shrink-0" /> {email}
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Phone size={14} className="shrink-0" /> {phone}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-body-lg mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" /> Informations personnelles
              </div>
            </h2>
            
            <form onSubmit={handleProfileSave}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Prénom</label>
                    <input 
                      type="text" 
                      name="first_name"
                      defaultValue={firstName} 
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nom</label>
                    <input 
                      type="text" 
                      name="last_name"
                      defaultValue={lastName} 
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Adresse e-mail</label>
                    <input 
                      type="email" 
                      defaultValue={email} 
                      disabled // email change disabled as requested
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors opacity-70 bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Numéro de téléphone</label>
                    <input 
                      type="tel"
                      name="phone"
                      defaultValue={phone} 
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    type="submit"
                    disabled={isSavingProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md rounded-md hover:bg-[#C8A96A] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isSavingProfile ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <Save size={18} />
                    )}
                    {isSavingProfile ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-body-lg mb-6 flex items-center gap-2">
              <Lock size={18} className="text-primary" /> Changer le mot de passe
            </h2>
            <form onSubmit={handlePasswordSave}>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    name="current_password"
                    placeholder="Optionnel pour les Super Admins (selon conf)" 
                    className="w-full md:w-1/2 px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Nouveau mot de passe</label>
                    <input 
                      type="password" 
                      name="new_password"
                      required
                      minLength={6}
                      placeholder="Entrez le nouveau mot de passe" 
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Confirmer le nouveau mot de passe</label>
                    <input 
                      type="password" 
                      name="confirm_password"
                      required
                      minLength={6}
                      placeholder="Confirmer le nouveau mot de passe" 
                      className="w-full px-4 py-2 border border-outline-variant rounded-md font-body-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isSavingPassword}
                  className="px-4 py-2 border border-primary text-primary font-body-md rounded-md hover:bg-surface-variant transition-colors mt-2 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingPassword && <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>}
                  Mettre à jour le mot de passe
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
