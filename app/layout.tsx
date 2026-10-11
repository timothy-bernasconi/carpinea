import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["300", "400"], style: ["normal", "italic"] });
// Museo Sans (police de lecture de la charte). Seule la graisse 300 est chargée : le gras est proscrit.
const museo = localFont({ src: "./fonts/MuseoSans-300.woff2", variable: "--font-museo", weight: "300", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://villas-carpinea.ch";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Villas Carpinea | Villas contemporaines à Plan-les-Ouates", template: "%s | Villas Carpinea" },
  description: "Trois villas contemporaines de 6 pièces aux Cherpines, à Plan-les-Ouates (Genève). Jardins privatifs, standard THPE, dès CHF 2’190’000.",
  openGraph: {
    type: "website", locale: "fr_CH", siteName: "Villas Carpinea",
    images: [{ url: "/img/villa-b.jpg", width: 2000, height: 1458, alt: "Villas Carpinea, façade côté jardin" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${museo.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
