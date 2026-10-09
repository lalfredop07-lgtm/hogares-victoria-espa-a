import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Headline } from "@/components/ui/Headline";

type Props = {
  label: string;
  title: string;
  lead?: string;
  /** Contenido a la derecha del titular en escritorio (dato, enlace, lista). */
  aside?: ReactNode;
  tone?: "paper" | "bone";
  children?: ReactNode;
};

/**
 * Cabecera de pagina interior. Mantiene una estructura comun —etiqueta,
 * titular, entradilla— pero deja que cada pagina componga lo que va al lado,
 * de modo que ninguna se parezca demasiado a la anterior.
 */
export function PageHeader({
  label,
  title,
  lead,
  aside,
  tone = "paper",
  children,
}: Props) {
  return (
    <section
      className={`${tone === "bone" ? "bg-paper-2" : "bg-paper"} pb-14 pt-32 lg:pb-20 lg:pt-44`}
    >
      <div className="container-hv">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            <SectionLabel>{label}</SectionLabel>
            <Headline as="h1" text={title} className="display-l mt-7 uppercase" />
            {lead ? (
              <p className="lead measure-wide mt-7 text-ink-80">{lead}</p>
            ) : null}
          </div>
          {aside ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">{aside}</div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
