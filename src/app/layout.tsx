import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "KarLuxe — World-Class Luxury Car Rental Platform",
  description: "Experience the apex of luxury automotive mobility. Rent Porsche 911 GT3 RS, Ferrari SF90 Stradale, Rolls-Royce Phantom, Lamborghini Revuelto, and Bentley in Monaco, Dubai, Paris, and Los Angeles.",
  keywords: ["Luxury car rental", "Supercar rental", "Monaco luxury rental", "Chauffeur service", "Porsche GT3 RS rental", "Ferrari SF90 rental", "Rolls-Royce Phantom rental"],
  openGraph: {
    title: "KarLuxe — World-Class Luxury Car Rental Platform",
    description: "Rent exotic supercars and executive chauffeured limousines across Monaco, Dubai, Paris, and Los Angeles.",
    url: "https://karluxe.com",
    siteName: "KarLuxe",
    images: [
      {
        url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "KarLuxe Luxury Car Rental",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KarLuxe — World-Class Luxury Car Rental Platform",
    description: "Rent exotic supercars and executive chauffeured limousines.",
    images: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`}>
      <body className="bg-[#050505] text-white min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
