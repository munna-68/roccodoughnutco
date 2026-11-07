import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocco's Doughnut Co. | Handcrafted Artisan Gourmet Doughnuts in MA",
  description: "Slingin' giant artisan doughnuts in Auburn, Worcester, Westborough & Millbury MA since 2018. Explore this month's rotating menu, our Vanilla Creme-Cake Gluten-Sensitive collection, and order express pickup without downloading an app.",
  keywords: ["Rocco's Doughnut Company", "doughnuts Massachusetts", "Worcester bakery", "gluten sensitive donuts", "Auburn MA", "Westborough MA", "Millbury MA"],
};

// Runs before paint: marks motion preference and whether the home preloader
// should be skipped (already played this session, reduced motion, or not landing on /).
const bootScript = `(function(){try{var d=document.documentElement,s=sessionStorage,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('motion');if(r||s.getItem('rdc-preloaded')||location.pathname!=='/'){d.classList.add('preloaded');s.setItem('rdc-preloaded','1')}}catch(e){document.documentElement.classList.add('preloaded')}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
