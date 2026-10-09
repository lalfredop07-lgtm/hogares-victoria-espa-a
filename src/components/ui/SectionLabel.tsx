import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Numero de indice editorial, p. ej. "03". */
  index?: string;
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * Etiqueta de seccion: filete superior con marca roja, indice opcional y
 * rotulo en versalitas. Es el hilo conductor tipografico de todo el sitio.
 */
export function SectionLabel({ children, index, tone = "ink", className = "" }: Props) {
  const color = tone === "paper" ? "text-paper/70" : "text-ink-60";
  return (
    <p className={`label-hv flex items-baseline gap-3 ${color} ${className}`}>
      {index ? (
        <span className="text-red tabular-nums" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
