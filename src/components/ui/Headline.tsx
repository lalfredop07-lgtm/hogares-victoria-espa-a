import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Pone el punto final en rojo: la firma tipografica del sitio. */
  accent?: boolean;
  id?: string;
};

/**
 * Titular con el punto final en rojo de marca. Es un detalle minimo que se
 * repite en todas las paginas y da unidad al conjunto.
 */
export function Headline({
  text,
  as: Tag = "h2",
  className = "",
  accent = true,
  id,
}: Props) {
  const endsWithPeriod = accent && text.trimEnd().endsWith(".");
  const body = endsWithPeriod ? text.trimEnd().slice(0, -1) : text;

  return (
    <Tag id={id} className={className}>
      {body}
      {endsWithPeriod ? <span className="text-red">.</span> : null}
    </Tag>
  );
}
