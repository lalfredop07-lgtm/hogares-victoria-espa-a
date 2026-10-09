/**
 * DATOS INSTITUCIONALES — FUENTE UNICA DE VERDAD
 * -----------------------------------------------------------------------------
 * Todos los datos de este archivo proceden de documentacion publicada por la
 * propia asociacion (web anterior hogaresvictoria.es y memorias oficiales
 * 2024 / 2025). Ver FUENTES-Y-CONTENIDO.md.
 *
 * Antes del lanzamiento definitivo, los responsables de la asociacion deben
 * confirmar telefono, correo, sedes publicables y datos bancarios.
 * Ver PENDIENTE-DE-CONFIRMAR.md.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.hogaresvictoria.es";

export const org = {
  legalName: "Asociación Hogares Victoria de España",
  shortName: "Hogares Victoria",
  foundedPeru: 1986,
  foundedPeruDate: "1986-04-30",
  registry: {
    name: "Registro Nacional de Asociaciones del Ministerio del Interior",
    section: "1.ª",
    number: "626775",
  },
  nif: "G56681133",
  director: "Pastor Alfredo Pedraza Soriano",
  secretary: "Silvie Yvonne Espinel Bello",
  internationalFounders: "Luis y Vangie Salazar",
  phone: {
    display: "+34 647 672 300",
    href: "tel:+34647672300",
  },
  email: {
    display: "info@hogaresvictoria.es",
    href: "mailto:info@hogaresvictoria.es",
  },
  /** Sedes documentadas en la memoria 2025. `publicVisits` queda pendiente de confirmar. */
  locations: [
    {
      id: "quijorna",
      kind: "home" as const,
      street: "Calle Real 31",
      town: "Quijorna",
      region: "Madrid",
      country: "España",
      mapsQuery: "Calle Real 31, Quijorna, Madrid",
    },
    {
      id: "madrid",
      kind: "office" as const,
      street: "Avenida de Badajoz 64",
      town: "Madrid",
      region: "Madrid",
      country: "España",
      mapsQuery: "Avenida de Badajoz 64, Madrid",
    },
  ],
  donation: {
    paypal:
      "https://www.paypal.com/donate/?hosted_button_id=W6CTHD887QWBJ",
    bank: "Banco Sabadell",
    iban: "ES34 0081 0298 4700 0213 9217",
    ibanCompact: "ES3400810298470002139217",
    bic: "BSABESBB",
  },
  /** Referencias biblicas que la organizacion utiliza (se citan por referencia, no literalmente). */
  scripture: ["Salmos 72:12-15", "1 Samuel 2:8"],
} as const;

/** Zonas de Madrid con intervencion documentada en las memorias 2024 / 2025. */
export const documentedOutreachAreas = [
  "Plaza de Jacinto Benavente",
  "San Cristóbal",
  "Villaverde Alto",
  "Calle Bascuñuelos",
  "Parque El Paraíso (Simancas)",
  "Ópera",
] as const;

export const documents = [
  {
    id: "actividades-2025",
    year: 2025,
    type: "activities" as const,
    file: "/documentos/memoria-actividades-2025.pdf",
    sizeLabel: "0,9 MB",
  },
  {
    id: "economica-2025",
    year: 2025,
    type: "financial" as const,
    file: "/documentos/memoria-economica-2025.pdf",
    sizeLabel: "0,7 MB",
  },
  {
    id: "actividades-2024",
    year: 2024,
    type: "activities" as const,
    file: "/documentos/memoria-actividades-2024.pdf",
    sizeLabel: "3,3 MB",
  },
  {
    id: "economica-2024",
    year: 2024,
    type: "financial" as const,
    file: "/documentos/memoria-economica-2024.pdf",
    sizeLabel: "1,4 MB",
  },
] as const;

export type OrgDocument = (typeof documents)[number];
