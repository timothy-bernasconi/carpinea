import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  cta?: { label: string; href: string };
  image?: string;
  position?: string; // object-position du cadrage
  short?: boolean;
  aside?: ReactNode;
};

export default function Hero({ title, cta, image, position = "50% 50%", short, aside }: Props) {
  return (
    <section className={`hero${short ? " hero-short" : ""}`}>
      {image && <Image src={image} alt="" fill priority sizes="100vw" style={{ objectPosition: position }} />}
      <div className="wrap hero-in">
        <div>
          <p className="kicker">Les Villas Carpinea</p>
          <h1>{title}</h1>
          {cta && <Link href={cta.href} className="cta">{cta.label}</Link>}
        </div>
        {aside && <div className="hero-aside">{aside}</div>}
      </div>
    </section>
  );
}
