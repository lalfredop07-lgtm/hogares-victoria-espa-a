import type { PhotoId } from "./images";

/**
 * HISTORIAS Y MATERIAL AUDIOVISUAL
 * -----------------------------------------------------------------------------
 * Solo material REAL ya publicado por la organizacion. No hay testimonios
 * redactados ni citas atribuidas a personas sin consentimiento.
 *
 * Los cinco videos proceden del canal oficial "IGLESIA VICTORIA, CRISTO EN EL
 * CENTRO" y estaban enlazados o incrustados en hogaresvictoria.es/noticias.
 * Titulo y autoria verificados contra la API oEmbed de YouTube (oct. 2026).
 *
 * Los videos se cargan mediante una fachada que NO contacta con YouTube hasta
 * que la persona decide reproducirlos (ver components/media/VideoEmbed.tsx).
 */

export type Story = {
  id: string;
  youtubeId: string;
  /** Titulo literal del video en el canal oficial. */
  originalTitle: string;
  channel: string;
  /** Fecha conocida; null si no esta documentada. */
  date: string | null;
  featured: boolean;
  /** Fotografia de apoyo propia (no se usa la miniatura remota de YouTube). */
  poster: PhotoId;
};

export const stories: Story[] = [
  {
    id: "testimonio-alfredo-pedraza",
    youtubeId: "B4Gy3Mvl3hE",
    originalTitle: "TESTIMONIO DE VIDA",
    channel: "IGLESIA VICTORIA, CRISTO EN EL CENTRO",
    date: null,
    featured: true,
    poster: "bautismo-orilla",
  },
  {
    id: "tbn-espana",
    youtubeId: "1g5KEm85EIU",
    originalTitle: "Entrevista al Pastor Alfredo Pedraza en TBN ESPAÑA",
    channel: "IGLESIA VICTORIA, CRISTO EN EL CENTRO",
    date: "2023-03",
    featured: true,
    poster: "tbn-espana-plato",
  },
  {
    id: "plaza-benavente",
    youtubeId: "NcgyRNsVxjo",
    originalTitle: "Testimonio Plaza Benavente",
    channel: "IGLESIA VICTORIA, CRISTO EN EL CENTRO",
    date: null,
    featured: false,
    poster: "calle-atardecer-contacto",
  },
  {
    id: "presentacion-internacional",
    youtubeId: "_fUnDCAz2b4",
    originalTitle: "PRESENTACION HOGARES VICTORY",
    channel: "IGLESIA VICTORIA, CRISTO EN EL CENTRO",
    date: null,
    featured: false,
    poster: "congreso-peru-hemiciclo",
  },
  {
    id: "trailer-espana",
    youtubeId: "elCWeGCFSBs",
    originalTitle: "Trailer Hogares Victoria",
    channel: "IGLESIA VICTORIA, CRISTO EN EL CENTRO",
    date: null,
    featured: false,
    poster: "equipo-parque-espaldas",
  },
];

export const featuredStories = stories.filter((s) => s.featured);
