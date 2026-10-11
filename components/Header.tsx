"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links: [string, string][] = [
  ["/", "Projet"], ["/situation", "Situation"], ["/villas", "Villas"],
  ["/processus-de-vente", "Processus de vente"], ["/contact", "Contact"],
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap">
        <Link href="/" aria-label="Villas Carpinea, accueil" className="logo">
          <Image src="/logo/horizontal-white.png" alt="Villas Carpinea" width={720} height={240} priority />
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
