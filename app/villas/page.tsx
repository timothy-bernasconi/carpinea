import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";

type Statut = "vendu" | "réservé" | "disponible";
const villas: { n: string; sbp: string; utile: string; jardin: string; prix: string; statut: Statut }[] = [
  { n: "Villa A", sbp: "141", utile: "212", jardin: "117", prix: "CHF 2’190’000.-", statut: "disponible" },
  { n: "Villa B", sbp: "141", utile: "212", jardin: "375", prix: "CHF 2’280’000.-", statut: "disponible" },
  { n: "Villa C", sbp: "143", utile: "230", jardin: "412", prix: "CHF 2’390’000.-", statut: "disponible" },
];

const levels: { t: string; s?: string; b: string[] }[] = [
  { t: "Rez-de-chaussée", s: "Des espaces de vie lumineux et ouverts sur le jardin", b: [
    "Cuisine intégrée, entièrement équipée et ouverte sur les espaces de vie.", "Séjour et salle à manger ouverte sur la terrasse et le jardin.",
    "Façades non mitoyennes largement vitrées, favorisant les apports de lumière naturelle.", "Hauteur sous plafond de 2,60 m.", "Possibilité d’intégrer une véranda en option." ] },
  { t: "Premier étage", s: "Un niveau consacré à l’intimité", b: [
    "Quatre chambres à coucher par villa.", "Deux salles d’eau.", "Ouvertures généreuses et apports de lumière zénithale selon les plans.", "Hauteur sous plafond de 2,60 m." ] },
  { t: "Sous-sol", s: "Des espaces complémentaires et polyvalents", b: [
    "Sous-sol complet avec espaces polyvalents.", "Local technique et équipements de la villa.", "Hauteur sous plafond de 2,40 m.", "Possibilité d’aménager une salle de bains en option." ] },
  { t: "Extérieurs", s: "Un jardin privatif pour chaque villa", b: [
    "Terrasse et jardins privatifs.", "Haies séparatives entre les jardins.", "Possibilité d’intégrer une piscine en option." ] },
  { t: "Stationnement et vélos", b: [
    "Six places de stationnement voitures au total : trois couvertes et trois non couvertes.", "Six places vélos privées.", "Trois places vélos communes.",
    "Deux emplacements pour vélos spéciaux.", "Une place moto." ] },
];

export default function Villas() {
  return (
    <>
      <Hero title="Des espaces adaptés à votre vie de famille" cta={{ label: "Découvrir votre future villa", href: "#tableau" }} image="/img/villa-a.jpg" position="50% 60%" />
      <section className="section wrap">
        <div className="measure">
          <h2>Des villas pensées pour grandir avec vous</h2>
          <div className="rule" />
          <p>Des volumes généreux, une belle lumière naturelle, quatre chambres à coucher et des jardins privatifs : chaque villa a été pensée pour offrir un cadre de vie confortable, fonctionnel et adapté au quotidien d’une famille.</p>
        </div>
      </section>

      <section id="tableau" className="wrap" style={{ paddingBottom: "clamp(56px,9vw,120px)" }}>
        <div className="table-scroll">
          <table>
            <thead><tr>
              <th>Villa</th><th>Pièces</th><th>Surface SBP (*)</th><th>Surface utile</th><th>Surface jardin</th>
              <th>Nbre parking</th><th>Prix de vente</th><th>Plan</th><th>Statut</th>
            </tr></thead>
            <tbody>
              {villas.map((v) => (
                <tr key={v.n}>
                  <th scope="row">{v.n}</th><td>6</td><td>{v.sbp} m²</td><td>{v.utile} m²</td><td>{v.jardin} m²</td>
                  <td>2</td><td>{v.prix}</td><td>À venir</td>
                  <td><span className={`dot ${v.statut === "réservé" ? "reserve" : v.statut}`} />{v.statut[0].toUpperCase() + v.statut.slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">(*) Surface Brute de Plancher</p>
      </section>

      <section className="dark section"><div className="wrap">
        <h2>Un cadre de vie pensé pour vous</h2>
        <div className="measure light">
          <p>Les trois villas partagent une même approche architecturale : offrir des espaces lumineux, agréables à vivre et largement ouverts sur leur jardin. Leur implantation en T et leurs orientations multiples permettent à chaque habitation de profiter d’une relation privilégiée avec l’extérieur.</p>
          <p>L’organisation intérieure privilégie des circulations fluides et laisse davantage de place aux espaces de vie. Elle offre également une belle souplesse d’aménagement, notamment à l’étage et au sous-sol.</p>
        </div>
        <div className="levels">
          {levels.map((l) => (
            <div className="level" key={l.t}>
              <h3>{l.t}</h3>{l.s && <h4>{l.s}</h4>}
              <ul>{l.b.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div></section>
      <GallerySection />
    </>
  );
}
