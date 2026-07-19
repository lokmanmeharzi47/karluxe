"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { StoreSettings } from "@/lib/storeSettings";

export default function HeaderClient({ storeSettings }: { storeSettings: StoreSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out shadow-[0px_20px_40px_rgba(17,17,17,0.04)] bg-white
        ${scrolled 
          ? 'border-b border-[#C8A96A]/30' 
          : 'border-b border-outline-variant/30'
        }`}
      id="main-header"
    >
      <nav className="flex justify-between items-center h-20 px-container-padding max-w-[1440px] mx-auto relative">
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <Image
                src="/new-logo-rn.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
                priority
              />
              <span className="text-[6px] md:text-[8px] tracking-[0.2em] uppercase text-primary mt-0.5">Nibel Rezgui</span>
            </div>
            <span className="font-headline-sm md:font-headline-md text-[14px] md:text-headline-md tracking-tighter uppercase text-primary whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] md:max-w-none">
              {storeSettings.boutiqueName}
            </span>
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          <Link className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/' ? 'text-primary border-b border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`} href="/">Accueil</Link>
          <Link className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/collection' ? 'text-primary border-b border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`} href="/collection">Collections</Link>
          <Link className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/about' ? 'text-primary border-b border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`} href="/about">À propos</Link>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-5">
          <div className="hidden lg:flex items-center space-x-4 mr-2">
            <Link href={storeSettings.instagramUrl} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <InstagramIcon size={18} />
            </Link>
            <Link href={storeSettings.facebookUrl} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <FacebookIcon size={18} />
            </Link>
            <Link href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <MessageCircle size={18} strokeWidth={1.5} />
            </Link>
          </div>
          {isSearchOpen && (
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="absolute top-[80px] left-0 w-full px-container-padding py-4 bg-white border-b border-primary md:relative md:top-auto md:w-auto md:px-2 md:py-1 md:bg-transparent text-sm text-primary focus:outline-none animate-fade-in-up"
              autoFocus
            />
          )}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
            {isSearchOpen ? 'close' : 'search'}
          </button>
          <Link href="/favorites" className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">favorite</Link>
          <div className="md:hidden flex items-center">
            <button 
              className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-outline-variant/30 flex flex-col px-container-padding py-6 space-y-6 shadow-md z-40 animate-fade-in-up">
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} 
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/collection' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} 
            href="/collection"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link 
            className={`font-label-caps text-label-caps transition-colors duration-300 ${pathname === '/about' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} 
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </Link>
          <div className="pt-4 border-t border-outline-variant/30 flex space-x-6">
            <Link href={storeSettings.instagramUrl} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <InstagramIcon size={20} />
            </Link>
            <Link href={storeSettings.facebookUrl} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <FacebookIcon size={20} />
            </Link>
            <Link href={`https://wa.me/${storeSettings.whatsappNumber}`} target="_blank" className="text-primary hover:opacity-70 transition-opacity">
              <MessageCircle size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
