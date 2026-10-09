"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Motor de animaciones de entrada.
 *
 * Decisiones de diseno:
 *
 * 1. Un unico IntersectionObserver para toda la pagina, en lugar de uno por
 *    elemento.
 * 2. El contenido llega por streaming, asi que un MutationObserver registra
 *    los bloques que aparecen despues del montaje.
 * 3. Red de seguridad: un barrido manual por scroll/resize que se autodesconecta
 *    cuando ya no queda nada por revelar. Cubre los casos en los que el
 *    IntersectionObserver no llega a emitir (documento en segundo plano,
 *    pestanas ocultas, vistas previas incrustadas). El contenido nunca puede
 *    quedarse invisible.
 * 4. Las animaciones solo existen bajo `@media (scripting: enabled)`: sin
 *    JavaScript nada se oculta. Se respeta `prefers-reduced-motion`.
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const SELECTOR = "[data-reveal]:not(.is-visible)";
    const pending = () => document.querySelectorAll<HTMLElement>(SELECTOR);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || !("IntersectionObserver" in window)) {
      pending().forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            intersection.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      pending().forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);
        intersection.observe(node);
      });
    };

    scan();

    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    /* --- Red de seguridad --- */
    let frame = 0;

    const detachSweep = () => {
      window.removeEventListener("scroll", requestSweep);
      window.removeEventListener("resize", requestSweep);
      document.removeEventListener("visibilitychange", requestSweep);
    };

    const sweep = () => {
      frame = 0;
      const nodes = pending();
      if (nodes.length === 0) {
        detachSweep();
        return;
      }
      const limit = window.innerHeight * 0.94;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) {
          node.classList.add("is-visible");
          intersection.unobserve(node);
        }
      });
    };

    function requestSweep() {
      if (frame) return;
      // requestAnimationFrame no se ejecuta con el documento en segundo plano.
      frame = document.hidden
        ? window.setTimeout(sweep, 0)
        : requestAnimationFrame(sweep);
    }

    window.addEventListener("scroll", requestSweep, { passive: true });
    window.addEventListener("resize", requestSweep, { passive: true });
    document.addEventListener("visibilitychange", requestSweep);
    const initial = window.setTimeout(requestSweep, 700);

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      detachSweep();
      window.clearTimeout(initial);
      if (frame) {
        cancelAnimationFrame(frame);
        clearTimeout(frame);
      }
    };
  }, [pathname]);

  return null;
}
