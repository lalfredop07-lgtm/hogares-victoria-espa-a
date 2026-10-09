"use client";

import Image from "next/image";
import { useState } from "react";

export type VideoPoster = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
};

type Props = {
  youtubeId: string;
  title: string;
  poster: VideoPoster;
  labels: {
    play: string;
    hint: string;
    openOnYouTube: string;
    loading: string;
  };
  sizes?: string;
};

/**
 * Fachada de video respetuosa con la privacidad.
 *
 * No se carga nada de YouTube hasta que la persona pulsa el boton: la portada
 * es una fotografia propia servida desde este dominio, no la miniatura remota.
 * Al reproducir se usa youtube-nocookie.com.
 */
export function VideoEmbed({
  youtubeId,
  title,
  poster,
  labels,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="figure-hv aspect-video bg-ink">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="group figure-hv aspect-video">
      <Image
        src={poster.src}
        alt={poster.alt}
        width={poster.width}
        height={poster.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={poster.blurDataURL}
        className="transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/10"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setActive(true)}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-paper"
      >
        <span className="sr-only-hv">{labels.play}</span>
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-red transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110 sm:h-20 sm:w-20"
          aria-hidden="true"
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M19 12L0.25 23.26V0.74L19 12z" fill="currentColor" />
          </svg>
        </span>
        <span className="label-hv text-paper/80" aria-hidden="true">
          {labels.hint}
        </span>
      </button>

      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="label-hv absolute bottom-3 right-3 z-10 rounded-sm border border-paper/30 px-2.5 py-1.5 text-paper/80 transition-colors hover:border-paper hover:text-paper"
      >
        {labels.openOnYouTube}
      </a>
    </div>
  );
}
