import Gallery from "@/components/Gallery";
import { photos } from "@/lib/photos";

// Galerie placée juste avant le pied de page, sur toutes les pages sauf Contact.
export default function GallerySection() {
  return (
    <section className="wrap gal-sec">
      <Gallery photos={photos} />
    </section>
  );
}
