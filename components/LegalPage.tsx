import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import type { Block } from "@/lib/legal";

export default function LegalPage({ title, blocks }: { title: string; blocks: Block[] }) {
  return (
    <>
      <Hero title={title} short />
      <section className="section wrap">
        <div className="legal">
          {blocks.map((b, i) => {
            if (b.t === "h") {
              const H = (b.lvl ?? 0) === 0 ? "h2" : "h3";
              return <H key={i}>{b.n}. {b.x as string}</H>;
            }
            if (b.t === "ul") return <ul key={i}>{(b.x as string[]).map((li) => <li key={li}>{li}</li>)}</ul>;
            return <p key={i}>{b.x as string}</p>;
          })}
        </div>
      </section>
      <GallerySection />
    </>
  );
}
