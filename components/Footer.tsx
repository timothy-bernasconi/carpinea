import Link from "next/link";

const nav: [string, string][] = [
  ["/", "Projet"], ["/situation", "Situation"], ["/villas", "Villas"],
  ["/processus-de-vente", "Processus de vente"], ["/contact", "Contact"],
];
const ico = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.2 } as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap f-grid">
        <div>
          <p className="f-label">Projet commercialisé par</p>
          <p>Rosset &amp; Cie SA<br />Route de Chancy 85<br />1213 Onex</p>
          <p>
            T. <a href="tel:+41223393766">+41 22 339 37 66</a><br />
            E. <a href="mailto:villas-carpinea@rosset.ch">villas-carpinea@rosset.ch</a><br />
            <a href="https://www.rosset.ch" target="_blank" rel="noopener noreferrer">rosset.ch</a>
          </p>
        </div>
        <nav aria-label="Navigation du pied de page">
          <p className="f-label">Navigation</p>
          {nav.map(([href, label]) => <Link key={href} href={href} className="f-link">{label}</Link>)}
        </nav>
        <div>
          <p className="f-label">Informations</p>
          <Link href="/politique-de-confidentialite" className="f-link">Politique de confidentialité</Link>
          <Link href="/politique-de-cookies" className="f-link">Politique de cookies (UE)</Link>
          <div className="f-social">
            <a href="https://www.instagram.com/rosset_immobilier/?hl=fr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg {...ico}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" /></svg>
            </a>
            <a href="https://www.linkedin.com/company/rosset-immobilier/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg {...ico}><rect x="4" y="9" width="3" height="11" /><circle cx="5.5" cy="5.5" r="1.4" /><path d="M10 9h3v1.6c.6-1 1.7-1.8 3.2-1.8 2.5 0 3.8 1.5 3.8 4.2V20h-3v-6c0-1.4-.6-2.2-1.8-2.2S13 12.6 13 14v6h-3z" /></svg>
            </a>
            <a href="https://www.facebook.com/RegieRosset" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg {...ico}><path d="M14 8h2V5h-2.5C11.3 5 10 6.4 10 8.5V11H8v3h2v6h3v-6h2.2l.5-3H13V8.7c0-.5.2-.7 1-.7z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="wrap f-bottom">
        <span>© 2026 Greit SA. Tous droits réservés.</span>
        <span>Site web réalisé par <a href="https://www.agirencom.com/" target="_blank" rel="noopener noreferrer">Agir en Com</a></span>
      </div>
    </footer>
  );
}
