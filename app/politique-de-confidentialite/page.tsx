import LegalPage from "@/components/LegalPage";
import { confidentialite } from "@/lib/legal";
export default function Page() { return <LegalPage title="Politique de confidentialité" blocks={confidentialite} />; }
