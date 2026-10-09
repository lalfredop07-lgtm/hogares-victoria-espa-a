"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  /** Valor ya formateado segun el idioma; es lo que se muestra al terminar. */
  formatted: string;
  className?: string;
};

/**
 * Cifra con animacion de conteo al entrar en pantalla.
 * El valor final esta siempre en el HTML: si no hay JavaScript, o si la
 * persona prefiere movimiento reducido, se muestra directamente.
 */
export function Counter({ value, prefix, formatted, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const duration = Math.min(1500, 450 + value * 2.2);
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutExpo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(String(Math.round(eased * value)));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setDisplay(null);
        };

        setDisplay("0");
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix ? <span aria-hidden="true">{prefix}</span> : null}
      {display ?? formatted}
    </span>
  );
}
