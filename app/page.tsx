import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";

const facts: [string, string][] = [
  ["Livraison", "T2.2028 / T3.2028"], ["Villas contemporaines", "3"], ["Typologie", "6 pièces"],
  ["Surface habitable", "Dès 141 m²"], ["Surface jardin", "Dès 117 m²"], ["Prix de vente", "Dès CHF 2’190’000"],
];

const intro = [
  "Au cœur du quartier des Cherpines, les Villas Carpinea réunissent 3 villas contemporaines offrant des espaces généreux et lumineux et un cadre de vie idéal pour votre famille.",
  "Chacune des villas propose de beaux volumes, quatre chambres à coucher et un jardin privatif. L’ensemble a été conçu pour offrir une vie quotidienne calme, fluide, avec des espaces ouverts et lumineux.",
  "A taille humaine, ce projet neuf prend place dans un environnement verdoyant et résidentiel. Il profite de la proximité du secteur des Cherpines, dont les services, commerces, équipements et mobilités se développeront progressivement, tout en restant proche de la campagne genevoise et du pôle économique de Plan-les-Ouates.",
];

const blocks: { t: string; p: string[] }[] = [
  { t: "Une architecture qui fait entrer la lumière", p: [
    "La composition en T des Villas Carpinea donne à chaque villa plusieurs orientations et une relation directe avec son jardin. Au rez-de-chaussée, les façades non mitoyennes sont toutes vitrées afin d’ouvrir les pièces de vie vers l’extérieur. À l’étage, des ouvertures généreuses et des apports de lumière zénithale prolongent cette clarté jusque dans les circulations et certains espaces du sous-sol.",
    "Cette implantation répond à une intention simple : multiplier les liens avec la végétation tout en maintenant une séparation naturelle entre les trois habitations." ] },
  { t: "Des espaces adaptés à la vie de famille", p: [
    "Les villas s’organisent sur trois niveaux. Le rez-de-chaussée accueille une cuisine entièrement équipée et ouverte sur les espaces de vie, prolongés par la terrasse et le jardin. L’étage réunit quatre chambres à coucher, deux salles d’eau et un balcon. Le sous-sol complet offre des surfaces polyvalentes, adaptables aux besoins de chacun.",
    "Avec une hauteur sous plafond de 2,60 m au rez-de-chaussée et à l’étage, les villas offrent des volumes généreux et une agréable sensation d’espace. Une véranda et une piscine en option peuvent compléter votre projet." ] },
  { t: "Un jardin comme prolongement", p: [
    "Chaque villa bénéficie d’un jardin privatif. Les haies séparatives, la végétation existante et la conservation de la haie périphérique, composent un cadre verdoyant dès plus intimiste.",
    "Magnolias, épicéas, olivier, parrotie de Perse et d’autres essences participent déjà à l’identité du lieu. Les terrasses donnent aux espaces de vie un prolongement naturel pour les repas en famille et les moments de détente." ] },
  { t: "Un habitat pensé pour durer", p: [
    "La construction des Villas Carpinea est prévue selon le standard THPE (Très Haute Performance Énergétique). Pompe à chaleur air-eau, chauffage au sol, panneaux photovoltaïques, triple vitrage et stores à lamelles électriques participent au confort de chaque saison et à une gestion plus sobre de l’énergie.",
    "Le choix de solutions éprouvées s’inscrit dans une approche durable, attentive à la qualité d’usage autant qu’à la pérennité du bâtiment." ] },
];

const points = [
  { d: "M3 11.5 12 4l9 7.5M5.5 9.7V20h13V9.7M10 20v-5.5h4V20", t: "Architecture contemporaine" },
  { d: "M9 5.5a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zM3.8 19c0-3 2.3-5 5.2-5s5.2 2 5.2 5M16.6 8.2a2.1 2.1 0 1 1 0 4.2M16.4 14.1c2.3.1 3.9 1.7 3.9 4.4", t: "Aménagement adapté aux familles" },
  { d: "M12 3l2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3z", t: "Finitions de qualité au gré du preneur" },
  { d: "M12 8.3a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4zM12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8", t: "Espaces de vie lumineux et ouverts sur le jardin" },
  { d: "M12 3c3.5 0 5.6 2.5 5.6 5.3S15.300 13 12 13 6.400 11.100 6.400 8.300C6.400 5.500 8.500 3 12 3zM12 13v8M8.800 21h6.400", t: "Jardins privatifs généreux" },
  { d: "M5 19C5 10.500 10 5 20 5c0 9-5 14-13 14zM5 19c3-5 6-8.500 10.500-10.500", t: "Construction au standard énergétique THPE" },
];

export default function Projet() {
  return (
    <>
      <Hero
        title="L’élégance de villas contemporaines au cœur d’un quartier résidentiel recherché."
        cta={{ label: "Découvrir le projet", href: "/villas" }}
        image="/img/villa-b.jpg" position="50% 68%"
        aside={<><span className="k">Téléphone</span><span>+41 22 339 37 66</span><span className="k">Adresse</span><span>Chemin des Cherpines 12, Plan-les-Ouates</span><span className="k">E-mail</span><span>villas-carpinea@rosset.ch</span></>}
      />
      <section className="wrap">
        <dl className="facts">
          {facts.map(([k, v]) => <div className="fact" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="pic"><Image src="/img/salon-02.jpg" alt="Séjour ouvert sur le jardin" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div>
            <div className="rule" />
            {intro.map((t) => <p key={t}>{t}</p>)}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(40px,6vw,80px)" }}>
        <div className="blocks">
          {blocks.map((b) => (
            <article key={b.t} className="block"><h3>{b.t}</h3>{b.p.map((t) => <p key={t}>{t}</p>)}</article>
          ))}
        </div>
        <Link href="/villas" className="cta cta-dark">Découvrir le projet</Link>
      </section>

      <section className="dark section"><div className="wrap">
        <h2>Les points forts des Villas Carpinea</h2>
        <ul className="points">{points.map((p) => <li key={p.t}><svg className="pt-i" viewBox="0 0 24 24" aria-hidden="true"><path d={p.d} /></svg>{p.t}</li>)}</ul>
      </div></section>
      <GallerySection />
    </>
  );
}
