/**
 * RESULTADOS Y ECONOMIA POR EJERCICIO
 * -----------------------------------------------------------------------------
 * Cifras tomadas literalmente de las memorias oficiales. Cada dato pertenece a
 * UN ejercicio concreto: nunca se acumulan entre anos ni se suman categorias de
 * personas (pueden existir solapamientos entre hogares, ambulatorio y
 * derivaciones). Toda presentacion debe ir acompanada del ano.
 */

export type MetricId =
  | "peopleInHomes"
  | "outpatient"
  | "referrals"
  | "therapySessions"
  | "familySessions"
  | "awarenessCampaigns"
  | "trainingCourses"
  | "completedProcess";

export type Metric = {
  id: MetricId;
  value: number;
  /** Prefijo editorial, p. ej. "+" para "mas de 420". */
  prefix?: string;
  /** Desglose textual cuando la memoria lo publica. */
  breakdown?: { group: number; individual: number };
  /** Discrepancia detectada entre el total y el desglose del propio documento. */
  discrepancy?: boolean;
};

export type YearReport = {
  year: 2024 | 2025;
  metrics: Metric[];
  income: { id: string; amount: number }[];
  expenses: { id: string; amount: number }[];
  totals: { income: number; expenses: number; surplus: number };
};

export const reports: Record<2024 | 2025, YearReport> = {
  2025: {
    year: 2025,
    metrics: [
      { id: "peopleInHomes", value: 38 },
      { id: "outpatient", value: 15 },
      { id: "referrals", value: 22 },
      {
        id: "therapySessions",
        value: 420,
        prefix: "+",
        breakdown: { group: 355, individual: 85 },
      },
      { id: "familySessions", value: 82 },
      { id: "awarenessCampaigns", value: 2 },
      { id: "trainingCourses", value: 3 },
      { id: "completedProcess", value: 6 },
    ],
    income: [
      { id: "keyrings", amount: 15320 },
      { id: "donations", amount: 14375 },
      { id: "peru", amount: 6815.85 },
      { id: "membership", amount: 4150 },
      { id: "grants", amount: 0 },
    ],
    expenses: [
      { id: "rentHome", amount: 15600 },
      { id: "rentOffice", amount: 9600 },
      { id: "utilities", amount: 3624.46 },
      { id: "vehicle", amount: 3750 },
      { id: "transport", amount: 1476 },
      { id: "food", amount: 1115.5 },
      { id: "cleaning", amount: 825 },
      { id: "outreach", amount: 750 },
      { id: "workshops", amount: 720 },
      { id: "office", amount: 270 },
    ],
    totals: { income: 40660.85, expenses: 37730.96, surplus: 2929.89 },
  },
  2024: {
    year: 2024,
    metrics: [
      { id: "peopleInHomes", value: 27 },
      { id: "outpatient", value: 12 },
      { id: "referrals", value: 13 },
      {
        id: "therapySessions",
        value: 280,
        prefix: "+",
        breakdown: { group: 260, individual: 60 },
        discrepancy: true,
      },
      { id: "familySessions", value: 50 },
      { id: "awarenessCampaigns", value: 2 },
      { id: "trainingCourses", value: 3 },
      { id: "completedProcess", value: 2 },
    ],
    income: [
      { id: "peru", amount: 11082.76 },
      { id: "keyrings", amount: 7230 },
      { id: "donations", amount: 6375 },
      { id: "membership", amount: 2250 },
      { id: "grants", amount: 0 },
    ],
    expenses: [
      { id: "rentOffice", amount: 9600 },
      { id: "food", amount: 4600 },
      { id: "rentHome", amount: 3900 },
      { id: "utilities", amount: 2875 },
      { id: "transport", amount: 1166.4 },
      { id: "outreach", amount: 645 },
      { id: "vehicleRent", amount: 475 },
      { id: "workshops", amount: 460 },
      { id: "office", amount: 285 },
      { id: "other", amount: 260 },
    ],
    totals: { income: 26937.76, expenses: 24266.4, surplus: 2671.36 },
  },
};

export const latestYear = 2025 as const;

/** Las cuatro metricas seleccionadas para la portada. */
export const homeMetricIds: MetricId[] = [
  "peopleInHomes",
  "therapySessions",
  "familySessions",
  "referrals",
];

export function getMetric(year: 2024 | 2025, id: MetricId): Metric | undefined {
  return reports[year].metrics.find((m) => m.id === id);
}
