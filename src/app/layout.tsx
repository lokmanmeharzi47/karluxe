import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ImageKitProviderWrapper } from "@/components/providers/ImageKitProviderWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.karluxlocation.com"),
  title: {
    default: "KarLuxe — Location de Voitures de Luxe en Algérie",
    template: "%s | KarLuxe",
  },
  description: "La référence de la location de voitures de luxe en Algérie. Louez Porsche, Ferrari, Rolls-Royce, Lamborghini et Bentley à Alger, Oran et partout en Algérie.",
  keywords: ["Location voiture de luxe Algérie", "Location supercar Alger", "Location Porsche Algérie", "Chauffeur privé Algérie", "Location Ferrari Alger", "Location Rolls-Royce Algérie", "Voiture prestige Oran"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "KarLuxe — Location de Voitures de Luxe en Algérie",
    description: "Louez des supercars d'exception et des berlines de prestige avec chauffeur privé partout en Algérie.",
    url: "https://www.karluxlocation.com",
    siteName: "KarLuxe",
    images: [
      {
        url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "KarLuxe Location de Luxe Algérie",
      },
    ],
    locale: "fr_DZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KarLuxe — Location de Voitures de Luxe en Algérie",
    description: "Louez des supercars d'exception et des berlines de prestige en Algérie.",
    images: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}>
      <head>
        {/* Marks that scripting is available before first paint, which gates the
            scroll-reveal starting state. Inline and synchronous on purpose: if it
            ran later, revealed sections would flash in. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="bg-[#050505] text-white min-h-screen flex flex-col font-sans antialiased">
        <ImageKitProviderWrapper>
          {children}
        </ImageKitProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
