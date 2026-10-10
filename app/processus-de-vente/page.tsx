import Hero from "@/components/Hero";

const steps: [string, string[]][] = [
  ["Projet du projet Villas Carpinea", ["Présentation du projet immobilier"]],
  ["Confirmation de l’intérêt", ["Sélection de la villa"]],
  ["Validation du financement", ["Obtention du pré-accord de financement bancaire"]],
  ["Signature de la Cession du droit d’emption", ["Avec acompte auprès du notaire"]],
  ["Signature des quote-parts", ["Signature de l’acte de vente (quote-part terrain) chez le notaire.", "Signature du contrat avec l’Entreprise générale (EG).", "Versement du 1er appel de fonds."]],
  ["Phase de construction", ["Validation des plans d’aménagement et choix des finitions"]],
];

export default function Processus() {
  return (
    <>
      <Hero title="À vos côtés, du premier échange jusqu’à la remise des clés." cta={{ label: "Découvrir le projet", href: "/villas" }} image="/img/salon-01.jpg" position="50% 50%" />
      <section className="section wrap">
        <ol className="steps">
          {steps.map(([t, lines], i) => (
            <li key={t}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{t}</h3>{lines.map((l) => <p key={l}>{l}</p>)}</div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
