import type { PhotoId } from "./images";

/**
 * PROGRAMAS
 * -----------------------------------------------------------------------------
 * La descripcion editorial de cada programa vive en messages/*.json bajo
 * `programs.<id>`. Aqui solo la estructura, el orden y las fotografias.
 * Cada programa usa fotografias distintas para evitar repeticiones.
 */

export type ProgramId =
  | "acogida"
  | "acompanamiento"
  | "familias"
  | "calle"
  | "formacion"
  | "reinsercion"
  | "basicas";

export type Program = {
  id: ProgramId;
  index: string;
  photo: PhotoId;
  /** Fotografias adicionales para la pagina "Nuestra labor". */
  gallery?: PhotoId[];
  /** Si aparece en el bloque de programas de la portada. */
  onHome: boolean;
};

export const programs: Program[] = [
  {
    id: "acogida",
    index: "01",
    photo: "hogar-reunion-mesa",
    gallery: ["mesa-hogar-comida", "hogar-patio-encuentro"],
    onHome: true,
  },
  {
    id: "acompanamiento",
    index: "02",
    photo: "sesion-grupo-carpa",
    gallery: ["hogar-reunion-equipo", "calle-grupo-conversacion"],
    onHome: true,
  },
  {
    id: "calle",
    index: "03",
    photo: "equipo-parque-espaldas",
    gallery: [
      "calle-acercamiento-parque",
      "calle-escucha-cercania",
      "calle-entrega-alimento",
      "calle-apoyo-escalera",
      "calle-cafe-companiaa",
      "calle-oracion-muro",
      "calle-atencion-acera",
      "asentamiento-madrid",
    ],
    onHome: true,
  },
  {
    id: "familias",
    index: "04",
    photo: "celebracion-orilla",
    gallery: ["bautismo-orilla"],
    onHome: true,
  },
  {
    id: "formacion",
    index: "05",
    photo: "calle-orientacion-mujer",
    gallery: ["espana-presentacion-escenario"],
    onHome: false,
  },
  {
    id: "reinsercion",
    index: "06",
    photo: "bautismo-lago-grupo",
    onHome: false,
  },
  {
    id: "basicas",
    index: "07",
    photo: "reparto-alimentos-mercado",
    gallery: ["donacion-furgoneta-alimentos", "calle-tienda-campania"],
    onHome: false,
  },
];

export const homePrograms = programs.filter((p) => p.onHome);
