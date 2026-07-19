"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers,
  Tags,
  Box,
  Users,
  TrendingUp,
  Image,
  Settings, 
  LogOut,
  UserCircle
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const links = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Commandes", href: "/admin/orders", icon: ShoppingBag },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Collections", href: "/admin/collections", icon: Layers },
    { name: "Catégories", href: "/admin/categories", icon: Tags },
    { name: "Inventaire", href: "/admin/inventory", icon: Box },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Analytique", href: "/admin/analytics", icon: TrendingUp },
    { name: "Médiathèque", href: "/admin/media", icon: Image },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
    { name: "Profil", href: "/admin/profile", icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-surface-variant overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant flex items-center justify-center">
          <Link href="/" className="font-display-lg text-2xl tracking-widest uppercase text-center leading-tight">Maison de<br/>Couture</Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 px-6 py-3 font-body-md ${isActive ? 'bg-surface-variant text-primary font-bold border-r-4 border-primary' : 'text-on-surface-variant hover:bg-surface-variant hover:text-primary'} transition-colors`}
                  >
                    <Icon size={20} />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <button className="flex items-center gap-3 w-full px-4 py-2 font-body-md text-red-500 hover:bg-red-50 rounded-md transition-colors">
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-outline-variant h-16 flex items-center justify-between px-8">
          <h2 className="font-headline-md text-body-lg">Panneau d'administration</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-caps">
              A
            </div>
            <span className="font-body-md font-bold">Administrateur</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
