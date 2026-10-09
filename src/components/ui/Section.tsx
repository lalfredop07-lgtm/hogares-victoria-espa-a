import type { ReactNode } from "react";

type Tone = "paper" | "bone" | "ink" | "claret";

const TONE_CLASS: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  bone: "bg-paper-2 text-ink",
  ink: "on-ink bg-ink text-paper",
  claret: "on-ink bg-claret text-paper",
};

/** Seccion con el ritmo vertical y el tono de fondo del sistema. */
export function Section({
  children,
  tone = "paper",
  className = "",
  id,
  labelledBy,
  flush = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
  /** Sin padding vertical: para secciones a sangre con fotografia. */
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${TONE_CLASS[tone]} ${flush ? "" : "py-(--spacing-section)"} ${className}`}
    >
      {children}
    </section>
  );
}
