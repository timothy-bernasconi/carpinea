"use client";
import { useEffect, useRef, useState } from "react";
import type { Place } from "@/lib/places";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const PIN = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

// Fond de carte aux couleurs de la charte (blanc cassé, vert très clair)
const STYLE: google.maps.MapTypeStyle[] = [
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dde3da" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f0ece1" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

function loadGoogle(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google Maps"));
    document.head.appendChild(s);
  });
}

export default function SituationMap({ places }: { places: Place[] }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [failed, setFailed] = useState(!KEY);
  const main = places.find((p) => p.main)!;

  useEffect(() => {
    if (!KEY) return;
    let dead = false;
    loadGoogle()
      .then(() => {
        if (dead || !el.current) return;
        const m = new google.maps.Map(el.current, { disableDefaultUI: true, zoomControl: true, gestureHandling: "cooperative", styles: STYLE });
        const bounds = new google.maps.LatLngBounds();
        places.forEach((p) => {
          const marker = new google.maps.Marker({
            position: p.pos, map: m, title: p.name,
            icon: {
              path: PIN, anchor: new google.maps.Point(12, 22),
              fillColor: p.main ? "#BF8657" : "#294034", fillOpacity: 1,
              strokeColor: "#F0ECE1", strokeWeight: 1, scale: p.main ? 2.8 : 1.7,
            },
          });
          bounds.extend(p.pos);
          // Clic : itinéraire depuis le projet
          marker.addListener("click", () => {
            if (p.main) return;
            window.open(`https://www.google.com/maps/dir/?api=1&origin=${main.pos.lat},${main.pos.lng}&destination=${p.pos.lat},${p.pos.lng}`, "_blank", "noopener");
          });
        });
        m.fitBounds(bounds, 60);
        map.current = m;
      })
      .catch(() => setFailed(true));
    return () => { dead = true; };
  }, [places, main]);

  const focus = (p: Place) => {
    map.current?.panTo(p.pos);
    map.current?.setZoom(p.main ? 16 : 15);
  };

  return (
    <div className="map-grid">
      {failed ? (
        <div className="map map-off" role="status">La carte n’a pas pu être chargée.</div>
      ) : (
        <div ref={el} className="map" role="region" aria-label="Carte de situation" />
      )}
      <ul className="poi">
        {places.map((p) => (
          <li key={p.id}><button type="button" className={p.main ? "on" : ""} onClick={() => focus(p)}>{p.name}</button></li>
        ))}
      </ul>
    </div>
  );
}
