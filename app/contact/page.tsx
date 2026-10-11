import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

const partners: [string, string][] = [
  ["Développeur foncier", "GREIT SA"], ["Architectes", "KL Architectes"], ["Commercialisation", "Rosset & Cie SA"],
  ["Entreprise générale", "Effibat SA"], ["Étude notariale", "Étude Ducret Associés"], ["Établissement bancaire", "Banque Migros"],
];

export default function Contact() {
  return (
    <>
      <Hero title="Parlons de votre future villa" cta={{ label: "Contactez notre équipe vente", href: "#formulaire" }} image="/img/chambre-parentale.jpg" position="50% 55%" />
      <section id="formulaire" className="section wrap">
        <div className="measure" style={{ marginBottom: "2.6rem" }}>
          <h2>Parlons de votre future villa.</h2>
          <div className="rule" />
          <p>Envie d’en découvrir plus sur les Villas Carpinea ou d’autres projets similaires ? Faites-nous part de vos critères de recherche.</p>
        </div>
        <ContactForm />
      </section>
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <h2>Partenaires du projet</h2>
        <dl className="partners">
          {partners.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>
    </>
  );
}
