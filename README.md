# Villas Carpinea (Next.js)

    npm install
    cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_GOOGLE_MAPS_KEY
    npm run dev

- Textes : dans chaque page (app/*/page.tsx), repris du document client.
- Photos : public/img (hero par page ; galerie dans lib/photos.ts).
- Logos : public/logo. Favicon : app/icon.png. Curseur pomme de pin : public/logo/cone.png (souris uniquement).
- Polices : Fraunces (Google Fonts, chargée au build) + Museo Sans 300 (app/fonts). Pas de gras, pas de majuscules.
- Carte : components/SituationMap.tsx (Google Maps) ; points dans lib/places.ts.
  La clé API doit être restreinte par référent HTTP (domaine du site) dans la console Google Cloud.
- Formulaire : app/api/contact/route.ts envoie via Resend (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM dans .env.local, voir .env.example). Anti-spam : champ piège, petit calcul, limite de 5 demandes / 10 min par IP (en mémoire). Sans clé Resend, la demande est seulement journalisée en local et refusée en production.

À fournir : logo Rosset (footer), textes légaux, plans des villas.
