import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { confidentialite } from "@/lib/legal";
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Rosset et Cie SA et Rosset SA : données personnelles traitées, communication à des tiers, cookies et contact.",
};

export default function Page() { return <LegalPage title="Politique de confidentialité" blocks={confidentialite} />; }
