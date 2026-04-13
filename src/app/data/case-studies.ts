import imgGallery1 from "../../assets/0a066664ae5eea137b87861cac14ac3c376dcb90.png";
import imgGallery2 from "../../assets/cfd07b2dc7954a1147ec72a2578d26cca32a12cf.png";
import imgGallery3 from "../../assets/8021915750859e35d2c2e8edfb22f9cf611b7783.png";
import imgGallery4 from "../../assets/1d4962aca37671503ec872bfef5995beac3b04ed.png";
import imgGallery5 from "../../assets/527c891f9ca86d362ad4ae91971a26d1d3858c5c.png";
import imgGallery6 from "../../assets/836c9c8d27c743f084e07231013f92330fbbee73.png";

export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  /** Imagem a ocupar toda a largura do viewport */
  fullBleed?: boolean;
  /** Altura generosa tipo hero secundário */
  tall?: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  role: string;
  credits: string;
  locationLine: string;
  year: string;
  liveUrl: string;
  heroImage: string;
  heroAlt: string;
  gallery: CaseStudyGalleryItem[];
  nextSlug: string;
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  globaldex: {
    slug: "globaldex",
    title: "GLOBALDEX",
    role: "Rebrand, UX|UI, design system",
    credits: "Design & direction: Luiz Eduardo",
    locationLine: "Brazil",
    year: "2024",
    liveUrl: "https://behance.net",
    heroImage: imgGallery1,
    heroAlt: "Globaldex — destaque do projeto",
    gallery: [
      { src: imgGallery2, alt: "Interface Globaldex", fullBleed: false },
      { src: imgGallery3, alt: "Fluxos e componentes", fullBleed: true, tall: true },
      { src: imgGallery4, alt: "Detalhe visual", fullBleed: false },
      { src: imgGallery5, alt: "Aplicação full width", fullBleed: true, tall: true },
      { src: imgGallery6, alt: "Encerramento visual", fullBleed: false },
    ],
    nextSlug: "gates2b",
  },
  gates2b: {
    slug: "gates2b",
    title: "GATES2B",
    role: "Rebrand, UX|UI",
    credits: "Design: Luiz Eduardo",
    locationLine: "Brazil",
    year: "2023",
    liveUrl: "https://behance.net",
    heroImage: imgGallery2,
    heroAlt: "Gates2B — hero",
    gallery: [
      { src: imgGallery1, alt: "Gates2B 1" },
      { src: imgGallery3, alt: "Gates2B 2", fullBleed: true, tall: true },
      { src: imgGallery5, alt: "Gates2B 3" },
    ],
    nextSlug: "qofrinho",
  },
  qofrinho: {
    slug: "qofrinho",
    title: "QOFRINHO",
    role: "Design & development",
    credits: "Design & code: Luiz Eduardo",
    locationLine: "Brazil",
    year: "2024",
    liveUrl: "https://behance.net",
    heroImage: imgGallery3,
    heroAlt: "Qofrinho — hero",
    gallery: [
      { src: imgGallery4, alt: "Qofrinho 1", fullBleed: true, tall: true },
      { src: imgGallery2, alt: "Qofrinho 2" },
      { src: imgGallery6, alt: "Qofrinho 3", fullBleed: true, tall: true },
    ],
    nextSlug: "globaldex",
  },
};

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined;
  return CASE_STUDIES[slug];
}
