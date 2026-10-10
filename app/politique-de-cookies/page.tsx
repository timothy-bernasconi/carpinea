import LegalPage from "@/components/LegalPage";
import { cookies } from "@/lib/legal";
export default function Page() { return <LegalPage title="Politique de cookies (UE)" blocks={cookies} />; }
