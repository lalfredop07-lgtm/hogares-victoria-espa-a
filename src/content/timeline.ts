import type { PhotoId } from "./images";

/**
 * LINEA DE TIEMPO
 * -----------------------------------------------------------------------------
 * Solo hitos documentados, con la fecha tal y como la recoge la fuente. Los
 * textos viven en messages/*.json bajo `timeline.<id>`.
 *
 * Los reconocimientos institucionales NO llevan fecha en la documentacion
 * disponible, por eso se presentan aparte y no dentro de la cronologia.
 */

export type Milestone = {
  id: string;
  year: string;
  photo?: PhotoId;
  /** Marca el hito que abre la historia en Peru. */
  origin?: boolean;
};

export const timeline: Milestone[] = [
  { id: "origen", year: "1986", origin: true },
  { id: "expansion", year: "1986 — 2023" },
  { id: "espana", year: "2023", photo: "espana-presentacion-escenario" },
  { id: "quijorna", year: "2024", photo: "hogar-patio-encuentro" },
  { id: "consolidacion", year: "2025", photo: "hogar-reunion-equipo" },
];

export const recognitions: { id: string; photo: PhotoId }[] = [
  { id: "congreso", photo: "congreso-peru-entrega" },
  { id: "chorrillos", photo: "chorrillos-placa" },
];
