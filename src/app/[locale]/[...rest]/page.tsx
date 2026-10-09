import { notFound } from "next/navigation";

/**
 * Captura cualquier ruta desconocida dentro de un idioma para que Next.js
 * renderice la pagina 404 traducida de `[locale]/not-found.tsx` y devuelva un
 * codigo 404 real, en lugar de redirigir al inicio.
 */
export default function CatchAllPage() {
  notFound();
}
