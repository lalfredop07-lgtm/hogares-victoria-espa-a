import { defineRouting } from "next-intl/routing";

/**
 * Rutas localizadas. La clave es la ruta interna (y el nombre de la carpeta
 * dentro de src/app/[locale]); el valor son las URLs publicas por idioma.
 * Al cambiar de idioma, next-intl mantiene al visitante en la pagina equivalente.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/necesito-ayuda": { es: "/necesito-ayuda", en: "/i-need-help" },
    "/quienes-somos": { es: "/quienes-somos", en: "/about-us" },
    "/nuestra-labor": { es: "/nuestra-labor", en: "/what-we-do" },
    "/historias": { es: "/historias", en: "/stories" },
    "/impacto": { es: "/impacto-y-transparencia", en: "/impact-and-transparency" },
    "/colabora": { es: "/colabora-y-dona", en: "/get-involved" },
    "/voluntariado": { es: "/voluntariado", en: "/volunteer" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/aviso-legal": { es: "/aviso-legal", en: "/legal-notice" },
    "/privacidad": { es: "/politica-de-privacidad", en: "/privacy-policy" },
    "/cookies": { es: "/politica-de-cookies", en: "/cookie-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
