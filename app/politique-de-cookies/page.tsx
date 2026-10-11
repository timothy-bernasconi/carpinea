import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { cookies } from "@/lib/legal";
export const metadata: Metadata = {
  title: "Politique de cookies (UE)",
  description: "Politique de cookies du site des Villas Carpinea : cookies fonctionnels, de marketing et de suivi, et contenus de réseaux sociaux.",
};

export default function Page() { return <LegalPage title="Politique de cookies (UE)" blocks={cookies} />; }
