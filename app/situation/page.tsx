import Hero from "@/components/Hero";
import GallerySection from "@/components/GallerySection";
import SituationMap from "@/components/SituationMap";
import { places } from "@/lib/places";

const more = [
  { t: "Une commune bien connectée", p: [
    "La ligne de tram 15 dessert aujourd’hui la ZIPLO et relie Plan-les-Ouates à Lancy-Pont-Rouge ainsi qu’au centre de Genève. Plusieurs lignes de bus complètent les déplacements de proximité.",
    "En voiture, les principaux axes permettent de rejoindre l’autoroute, l’aéroport et les différents pôles du canton." ] },
  { t: "Sport et nature au quotidien", p: [
    "Les équipements sportifs du secteur et les itinéraires de promenade vers la campagne genevoise offrent de nombreuses possibilités pour bouger, se retrouver ou simplement prendre l’air.",
    "Aux Cherpines, de nouveaux équipements publics viendront compléter cette offre, parmi lesquels un futur centre sportif et culturel." ] },
];

export default function Situation() {
  return (
    <>
      <Hero title="Et si votre prochain chapitre s’écrivait ici ?" cta={{ label: "Découvrir la situation", href: "#carte" }} image="/img/villa-c1.jpg" position="50% 55%" />
      <section className="section wrap">
        <div className="measure">
          <h2>Plan-les-Ouates, une commune aux multiples visages</h2>
          <div className="rule" />
          <p>Résidentielle, active et tournée vers la nature, Plan-les-Ouates associe quartiers d’habitation, campagne genevoise et important pôle d’emplois. Écoles, équipements sportifs, commerces et transports accompagnent le quotidien des familles.</p>
          <p>Les Villas Carpinea s’inscrivent dans un environnement à la fois résidentiel, végétalisé et connecté à la vie de Plan-les-Ouates. À l’échelle de trois villas seulement, le projet préserve une atmosphère intime tout en profitant de la proximité des services et équipements de la commune.</p>
        </div>
      </section>
      <section id="carte" className="wrap"><SituationMap places={places} /></section>
      <section className="section wrap">
        <div className="blocks">
          {more.map((b) => <article key={b.t} className="block"><h3>{b.t}</h3>{b.p.map((t) => <p key={t}>{t}</p>)}</article>)}
        </div>
      </section>
      <GallerySection />
    </>
  );
}
