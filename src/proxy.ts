import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Enrutado de idioma. Redirige "/" al idioma detectado, recuerda la
 * preferencia en una cookie tecnica y resuelve los slugs localizados.
 * (En Next.js 16 esta convencion se llama `proxy`; antes era `middleware`.)
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
