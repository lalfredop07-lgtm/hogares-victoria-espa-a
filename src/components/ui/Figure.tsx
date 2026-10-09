import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { photos, type PhotoId } from "@/content/images";

type Ratio = "16/9" | "3/2" | "4/3" | "1/1" | "4/5" | "3/4" | "auto";

const RATIO_CLASS: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  auto: "",
};

type Props = {
  id: PhotoId;
  ratio?: Ratio;
  sizes?: string;
  priority?: boolean;
  /** Posicion del encuadre, p. ej. "50% 30%". */
  position?: string;
  className?: string;
  imageClassName?: string;
  tone?: boolean;
};

/**
 * Fotografia con tratamiento unificado: encuadre controlado y placeholder
 * borroso generado en el pipeline de imagenes. En vertical (movil) no se
 * recorta: la fotografia se ve completa, a un tamaño contenido (ver
 * `figure-hv` en globals.css). El texto alternativo vive en messages/*.json
 * (`alt.<id>`) para que exista en los dos idiomas.
 */
export async function Figure({
  id,
  ratio = "3/2",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  position,
  className = "",
  imageClassName = "",
  tone = true,
}: Props) {
  const tAlt = await getTranslations("alt");
  const p = photos[id];

  return (
    <figure className={className}>
      <div
        className={`figure-hv ${tone ? "photo-tone" : ""} ${RATIO_CLASS[ratio]}`}
      >
        <Image
          src={p.src}
          alt={tAlt(id)}
          width={p.width}
          height={p.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={p.blurDataURL}
          style={position ? { objectPosition: position } : undefined}
          className={imageClassName}
        />
      </div>
    </figure>
  );
}
