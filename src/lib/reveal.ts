import type { CSSProperties } from "react";

/** Retardo escalonado para las animaciones de entrada. */
export function delay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

/** Desplazamiento vertical inicial, en pixeles. */
export function rise(px: number, ms = 0): CSSProperties {
  return { "--reveal-y": `${px}px`, "--reveal-delay": `${ms}ms` } as CSSProperties;
}
