import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        {children}
      </div>
      <Footer />
    </>
  );
}
