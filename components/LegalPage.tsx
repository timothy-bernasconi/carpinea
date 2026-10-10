import Hero from "@/components/Hero";

export default function LegalPage({ title }: { title: string }) {
  return (
    <>
      <Hero title={title} short />
      <section className="section wrap"><p className="measure ph">[Texte à fournir par Rosset / Greit SA]</p></section>
    </>
  );
}
