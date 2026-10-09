import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Cualquier ruta fuera de /es y /en se redirige al idioma por defecto, donde
 * existe una pagina 404 completa y traducida.
 */
export default function GlobalNotFound() {
  redirect(`/${routing.defaultLocale}`);
}
