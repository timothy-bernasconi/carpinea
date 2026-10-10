import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["300", "400"], style: ["normal", "italic"] });
// Museo Sans (police de lecture de la charte). Seule la graisse 300 est chargée : le gras est proscrit.
const museo = localFont({ src: "./fonts/MuseoSans-300.woff2", variable: "--font-museo", weight: "300", display: "swap" });

export const metadata: Metadata = {
  title: "Villas Carpinea",
  description: "Trois villas contemporaines de 6 pièces aux Cherpines, Plan-les-Ouates.",
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
