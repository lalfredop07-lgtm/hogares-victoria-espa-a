import type { ReactNode } from "react";

/**
 * Layout raiz minimo. El <html> real, con su atributo `lang` correcto, se
 * define en src/app/[locale]/layout.tsx.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
