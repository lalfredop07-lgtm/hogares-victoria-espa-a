import type { ReactNode } from "react";
import { Headline } from "@/components/ui/Headline";

/**
 * Banda de cierre de pagina. Tono oscuro o granate segun el peso que deba
 * tener la llamada a la accion.
 */
export function CTABand({
  title,
  body,
  children,
  tone = "ink",
}: {
  title: string;
  body?: string;
  children: ReactNode;
  tone?: "ink" | "claret";
}) {
  return (
    <section
      className={`on-ink ${tone === "claret" ? "bg-claret" : "bg-ink"} text-paper`}
    >
      <div className="container-hv grid gap-10 py-(--spacing-section) lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Headline
            text={title}
            className="display-m uppercase text-paper"
          />
          {body ? (
            <p className="measure-wide mt-5 text-paper/75">{body}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
          {children}
        </div>
      </div>
    </section>
  );
}
