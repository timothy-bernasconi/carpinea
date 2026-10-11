"use client";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MLMap } from "maplibre-gl";
import type { Place } from "@/lib/places";

const PIN = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

// Fond de carte vectoriel gratuit, sans clé (OpenFreeMap / OpenStreetMap), recoloré aux couleurs de la charte.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

type Paint = [string, string, string | number][]; // [calque, propriété, valeur]
const PAINT: Paint = [
  ["background", "background-color", "#F3EFE4"],
  ["park", "fill-color", "#D9E0CC"],
  ["landcover_wood", "fill-color", "#CFD9C2"],
  ["landuse_residential", "fill-color", "#EFEADC"],
  ["water", "fill-color", "#C4D6D3"],
  ["waterway", "line-color", "#C4D6D3"],
  ["building", "fill-color", "#E4DCCB"],
  ["building", "fill-opacity", 0.9],
  ["highway_minor", "line-color", "#FFFFFF"],
  ["highway_path", "line-color", "#E4DCCB"],
  ["highway_major_casing", "line-color", "#E6DFCF"],
  ["highway_major_inner", "line-color", "#FFFFFF"],
  ["highway_major_subtle", "line-color", "#FFFFFF"],
  ["highway_motorway_casing", "line-color", "#E3C9A8"],
  ["highway_motorway_inner", "line-color", "#F4E2C8"],
  ["highway_motorway_subtle", "line-color", "#F4E2C8"],
  ["railway", "line-color", "#D8D1BF"],
  ["railway_transit", "line-color", "#D8D1BF"],
  ["aeroway-area", "fill-color", "#E9E3D3"],
  ["aeroway-runway", "line-color", "#FFFFFF"],
  ["aeroway-taxiway", "line-color", "#FFFFFF"],
];
const LABELS = ["highway-name-minor", "highway-name-major", "highway-name-path", "label_other", "label_village", "label_town", "label_city", "water_name_point_label", "water_name_line_label", "waterway_line_label", "airport"];

// Pomme de pin Carpinea (repère du projet) : dix facettes, couleur terra cotta de la charte
const CONE = [
  "751,32 1046,358 757,490 458,354", "297,366 665,533 318,689", "1203,373 850,533 1183,683",
  "757,574 1115,737 757,898 400,737", "175,712 665,940 192,1154", "1340,712 850,940 1323,1154",
  "757,982 1256,1208 757,1435 258,1208", "32,1188 665,1476 176,1697", "1483,1188 850,1476 1340,1697",
  "757,1518 1241,1737 751,1967 266,1739",
];
const pinSvg = (main: boolean) => {
  if (main) {
    const polys = CONE.map((pts) => `<polygon points="${pts}"/>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="61" viewBox="0 0 1516 2000" aria-hidden="true"><g fill="#B07A4C">${polys}</g></svg>`;
  }
  const w = 26, h = Math.round((w * 20) / 14);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="5 2 14 20" aria-hidden="true"><path d="${PIN}" fill="#294034" fill-rule="evenodd" stroke="#F0ECE1" stroke-width="0.7"/></svg>`;
};

export default function SituationMap({ places }: { places: Place[] }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const [failed, setFailed] = useState(false);
  const main = places.find((p) => p.main)!;

  useEffect(() => {
    let dead = false;
    let cleanup = () => {};
    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (dead || !el.current) return;

      const lngLats = places.map((p) => [p.pos.lng, p.pos.lat] as [number, number]);
      const bounds = lngLats.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(lngLats[0], lngLats[0]));

      const m = new maplibregl.Map({
        container: el.current, style: STYLE_URL, bounds, fitBoundsOptions: { padding: 90 },
        attributionControl: { compact: true }, cooperativeGestures: true, dragRotate: false, pitchWithRotate: false,
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": "Ctrl + molette pour zoomer la carte",
          "CooperativeGesturesHandler.MacHelpText": "⌘ + molette pour zoomer la carte",
          "CooperativeGesturesHandler.MobileHelpText": "Deux doigts pour déplacer la carte",
        },
      });
      map.current = m;
      m.touchZoomRotate.disableRotation();
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

      let styled = false;
      m.on("error", () => { if (!styled) setFailed(true); });
      m.on("load", () => {
        styled = true;
        setFailed(false);
        for (const [id, prop, val] of PAINT) { try { m.setPaintProperty(id, prop, val); } catch {} }
        for (const id of LABELS) {
          try {
            m.setPaintProperty(id, "text-color", "#5E6B60");
            m.setPaintProperty(id, "text-halo-color", "#F3EFE4");
          } catch {}
        }
        // Un peu plus de recul par défaut
        m.jumpTo({ zoom: Math.max(m.getZoom() - 0.25, 9) });
      });

      places.forEach((p) => {
        const node = document.createElement("button");
        node.type = "button";
        node.className = "pin";
        node.dataset.name = p.name;
        node.setAttribute("aria-label", p.main ? p.name : `${p.name} : itinéraire depuis le projet`);
        node.innerHTML = pinSvg(!!p.main);
        if (p.main) node.style.zIndex = "2";
        // Clic : itinéraire depuis le projet dans Google Maps (simple lien, sans API)
        node.addEventListener("click", () => {
          if (p.main) return;
          window.open(`https://www.google.com/maps/dir/?api=1&origin=${main.pos.lat},${main.pos.lng}&destination=${p.pos.lat},${p.pos.lng}`, "_blank", "noopener");
        });
        new maplibregl.Marker({ element: node, anchor: "bottom" }).setLngLat([p.pos.lng, p.pos.lat]).addTo(m);
      });

      cleanup = () => { m.remove(); map.current = null; };
    })();
    return () => { dead = true; cleanup(); };
  }, [places, main]);

  const focus = (p: Place) => {
    map.current?.easeTo({ center: [p.pos.lng, p.pos.lat], zoom: p.main ? 15.5 : 14.5, duration: 700 });
  };

  return (
    <div className="map-grid">
      <div className="map-box">
        <div ref={el} className="map" role="region" aria-label="Carte de situation" />
        {failed && <p className="map-off" role="status">La carte n’a pas pu être chargée. Merci de réessayer plus tard.</p>}
      </div>
      <ul className="poi">
        {places.map((p) => (
          <li key={p.id}><button type="button" className={p.main ? "on" : ""} onClick={() => focus(p)}>{p.name}</button></li>
        ))}
      </ul>
    </div>
  );
}
