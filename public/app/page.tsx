import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import { photos } from "@/lib/photos";

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
  "Architecture contemporaine", "Aménagement adapté aux familles", "Finitions de qualité au gré du preneur",
  "Espaces de vie lumineux et ouverts sur le jardin", "Jardins privatifs généreux", "Construction au standard énergétique THPE",
];

export default function Projet() {
  return (
    <>
      <Hero
        title="L’élégance de villas contemporaines au cœur d’un quartier résidentiel recherché."
        cta={{ label: "Découvrir le projet", href: "/villas" }}
        image="/img/villa-b.jpg" position="50% 68%"
        aside={<>T. +41 22 339 37 66<br />Chemin des Cherpines 12, Plan-les-Ouates<br />E. villas-carpinea@rosset.ch</>}
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

      <section className="wrap" style={{ paddingBottom: "clamp(56px,9vw,120px)" }}><Gallery photos={photos} /></section>

      <section className="dark section"><div className="wrap">
        <h2>Les points forts des Villas Carpinea</h2>
        <ul className="points">{points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div></section>
    </>
  );
}
