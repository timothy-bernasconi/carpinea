export type Place = { id: string; name: string; pos: { lat: number; lng: number }; main?: boolean };

export const places: Place[] = [
  { id: "projet", name: "Villas Carpinea", pos: { lat: 46.1746245, lng: 6.1051742 }, main: true },
  { id: "centre", name: "Centre de Plan-les-Ouates", pos: { lat: 46.1687143, lng: 6.1183226 } },
  { id: "transports", name: "Transports publics (Le Rolliet)", pos: { lat: 46.171471, lng: 6.10823 } },
  { id: "ecole", name: "Crèche et école du Rolliet", pos: { lat: 46.17295, lng: 6.10935 } },
  { id: "lancy", name: "Lancy-Pont-Rouge", pos: { lat: 46.1869641, lng: 6.1251809 } },
  { id: "commerces", name: "Commerces (Migros, pharmacie, banque)", pos: { lat: 46.1672553, lng: 6.1146329 } },
  { id: "aeroport", name: "Aéroport de Genève", pos: { lat: 46.227174, lng: 6.102626 } },
];
