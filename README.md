# Hogares Victoria — web institucional bilingüe

Sitio web de la **Asociación Hogares Victoria de España**, una asociación sin
ánimo de lucro dedicada a la acogida, la orientación y el acompañamiento de
personas afectadas por las adicciones y la vulnerabilidad social.

Nueve páginas, dos idiomas (español e inglés), formularios reales, memorias
oficiales descargables y datos de impacto atribuidos a su ejercicio.

---

## Puesta en marcha

Requisitos: **Node.js 20.9 o superior**.

```bash
npm install
npm run dev
```

El sitio queda en <http://localhost:3000>. La raíz redirige a `/es` o a `/en`
según el idioma del navegador.

Otros comandos:

```bash
npm run build      # compilación de producción
npm start          # servidor de producción
npm run typecheck  # comprobación de tipos
npm run lint       # ESLint
```

---

## Publicar en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project** y elegir el repositorio.
3. Vercel detecta Next.js solo. No hay que tocar la configuración de build.
4. Añadir las variables de entorno (ver más abajo).
5. **Deploy.**
6. Conectar el dominio `hogaresvictoria.es` en *Settings → Domains* y
   actualizar `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.

El proyecto no depende de rutas absolutas del ordenador de desarrollo.

### Variables de entorno

Copiar `.env.example` a `.env.local` para desarrollo y configurar las mismas
variables en Vercel para producción.

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sí | Canonical, hreflang, sitemap e imágenes Open Graph. |
| `RESEND_API_KEY` | Para los formularios | Clave privada de Resend. |
| `CONTACT_FROM_EMAIL` | Para los formularios | Remitente verificado en Resend. |
| `CONTACT_TO_EMAIL` | No | Destinatario. Por defecto `info@hogaresvictoria.es`. |

---

## Formularios

Hay tres formularios —ayuda, contacto y voluntariado— que comparten un mismo
componente (`src/components/forms/ContactForm.tsx`) y un único endpoint
(`src/app/api/contacto/route.ts`).

**Estado actual: construidos, validados y probados, pero sin credenciales.**
Mientras falten `RESEND_API_KEY` y `CONTACT_FROM_EMAIL`, el servidor responde
`503 not_configured` y la interfaz muestra un aviso con el teléfono y el correo
de la asociación. **Nunca se muestra un falso «mensaje enviado».**

### Activarlos

1. Crear una cuenta en [resend.com](https://resend.com).
2. Verificar el dominio `hogaresvictoria.es` añadiendo los registros DNS que
   indica Resend.
3. Crear una API key y ponerla en `RESEND_API_KEY`.
4. Poner en `CONTACT_FROM_EMAIL` una dirección del dominio verificado
   (por ejemplo `web@hogaresvictoria.es`).
5. Volver a desplegar y enviar un mensaje de prueba.

### Qué incluyen ya

- Validación en cliente y en servidor, con mensajes en los dos idiomas.
- Resumen de errores con foco automático y enlaces a cada campo.
- Estados de envío, éxito, error, límite de envíos y «sin configurar».
- Campo trampa invisible y rechazo de envíos en menos de 2,5 segundos.
- Límite de 5 envíos por IP cada 10 minutos.
- No se guarda ningún dato personal: el mensaje se reenvía por correo y nada más.

> El límite por IP vive en la memoria del proceso. Es suficiente contra
> automatismos básicos. Si el sitio recibiera spam persistente, conviene pasar
> a un almacén compartido (Upstash, Vercel KV) o añadir un captcha.

---

## Estructura

```
messages/              es.json · en.json — todo el texto editorial
public/
  brand/               logotipo oficial y sello «Sí Se Puede»
  documentos/          las cuatro memorias en PDF
  images/              fotografías optimizadas a WebP
  og/                  imágenes para redes sociales (una por idioma)
src/
  app/
    [locale]/          una carpeta por página + layout + 404
    api/contacto/      endpoint de los formularios
    robots.ts  sitemap.ts  icon.png  apple-icon.png
  components/
    forms/             formulario de contacto, ayuda y voluntariado
    layout/            cabecera, pie, logotipo, cabecera de página, bandas
    media/             fachada de vídeo de YouTube
    sections/          secciones de la portada y desglose económico
    ui/                piezas del sistema (titular, filete, cifra, figura…)
  content/             datos institucionales — una sola fuente de verdad
  i18n/                rutas localizadas y navegación
  lib/                 formato, SEO y utilidades
  styles/globals.css   sistema visual completo
  proxy.ts             enrutado de idioma
```

### Dónde se cambia cada cosa

| Quiero cambiar… | Fichero |
|---|---|
| Un texto, un titular, una traducción | `messages/es.json` y `messages/en.json` |
| Teléfono, correo, IBAN, sedes, PayPal | `src/content/organization.ts` |
| Cifras de impacto o economía de un año | `src/content/impact.ts` |
| Qué programas hay y con qué fotos | `src/content/programs.ts` |
| Vídeos | `src/content/stories.ts` |
| Hitos de la cronología | `src/content/timeline.ts` |
| Colores, tipografías, espaciados | `src/styles/globals.css` |
| Las URL de cada página en cada idioma | `src/i18n/routing.ts` |

**Para añadir una cifra del ejercicio 2026** basta con añadir un bloque a
`reports` en `src/content/impact.ts` y cambiar `latestYear`. Ni una sola página
necesita tocarse.

---

## Bilingüe

Implementado con **next-intl** y rutas localizadas: cada página tiene su propia
URL en cada idioma y el selector mantiene a la persona en la página equivalente.

```
/es                            /en
/es/necesito-ayuda             /en/i-need-help
/es/quienes-somos              /en/about-us
/es/nuestra-labor              /en/what-we-do
/es/historias                  /en/stories
/es/impacto-y-transparencia    /en/impact-and-transparency
/es/colabora-y-dona            /en/get-involved
/es/voluntariado               /en/volunteer
/es/contacto                   /en/contact
/es/aviso-legal                /en/legal-notice
/es/politica-de-privacidad     /en/privacy-policy
/es/politica-de-cookies        /en/cookie-policy
```

El idioma por defecto es el español. El idioma elegido se recuerda en una
cookie técnica, pero cualquiera puede entrar directamente a una URL en el
idioma que quiera. Todo el texto editorial vive en `messages/`: no hay páginas
duplicadas por idioma.

---

## Sistema visual

- **Rojo de marca `#D01A18`**, medido sobre el degradado real del corazón del
  logotipo oficial (entre `#C91818` y `#D61C18`). El logotipo se usa tal cual:
  no se recolorea, no se recorta y no se altera su proporción.
- **Archivo** (grotesca) para titulares, cifras y navegación; **Newsreader**
  (serif editorial) para entradillas y texto largo. Se sirven desde el propio
  dominio mediante `next/font`.
- Fondos cálidos de papel, con secciones oscuras y una banda granate para
  marcar el ritmo. El rojo es acento, no fondo.
- Filetes, etiquetas en versalitas y números de índice recorren todo el sitio:
  son el hilo conductor que da unidad a las nueve páginas.
- Firma tipográfica: **el punto final de cada titular va en rojo**.

### Movimiento

Sin librería de animación. Entradas y revelados en CSS, coordinados por un
único `IntersectionObserver` (`src/components/ui/Reveal.tsx`) con un barrido de
seguridad por si el observador no llega a emitir. Las animaciones solo existen
dentro de `@media (scripting: enabled)`: **sin JavaScript no se oculta nada**.
Se respeta `prefers-reduced-motion`.

---

## Accesibilidad

Objetivo WCAG 2.2 AA. Verificado automáticamente en las nueve páginas, a 390 px
y a 1440 px:

- Un único `h1` por página y jerarquía de encabezados sin saltos.
- Todas las imágenes con texto alternativo descriptivo, definido por idioma.
- Todos los enlaces y botones con nombre accesible.
- Áreas táctiles de 24 px o más.
- Sin scroll horizontal en ningún punto.
- Contraste revisado: ningún texto por debajo de 4,5:1.
- Foco visible en todo el sitio; enlace para saltar al contenido.
- Menú móvil con `aria-expanded`, foco contenido, cierre con Escape y bloqueo
  de scroll.
- Formularios con etiquetas asociadas, `aria-invalid`, `aria-describedby`,
  resumen de errores y confirmaciones anunciadas por lector de pantalla.

---

## Privacidad

- Sin analítica ni rastreadores de terceros.
- Los vídeos de YouTube **no se cargan** hasta que la persona pulsa reproducir;
  entonces se usa `youtube-nocookie.com`. La portada es una fotografía propia
  servida desde este dominio, no la miniatura remota.
- Una única cookie técnica, para recordar el idioma.
- Los formularios no piden datos de salud y lo advierten expresamente.
- Las fotografías de personas atendidas solo se publican anonimizadas, de
  espaldas o a distancia. El criterio completo está en
  `PENDIENTE-DE-CONFIRMAR.md`.

---

## Rendimiento

- 36 fotografías optimizadas a WebP (9 MB en total frente a los 150 MB de los
  originales), servidas por `next/image` con AVIF/WebP, `srcset` y placeholder
  borroso incrustado.
- La imagen del hero se carga con prioridad; el resto en diferido.
- Tipografías autoalojadas con `font-display: swap`.
- Ratios de aspecto fijos en todas las figuras: sin saltos de maquetación.
- Todas las páginas se generan de forma estática en la compilación. Lo único
  dinámico es el endpoint de los formularios.

---

## Antes de publicar

Leer **`PENDIENTE-DE-CONFIRMAR.md`**. Recoge los catorce puntos que la
asociación debe confirmar, empezando por el IBAN, el enlace de PayPal y el
teléfono.

La trazabilidad de cada dato publicado está en **`FUENTES-Y-CONTENIDO.md`**.

---

## Lo que no se ha comprobado

Por honestidad, y porque no era posible desde el entorno de desarrollo:

- **El despliegue en Vercel.** El proyecto compila para producción sin errores
  y no usa rutas absolutas, pero no se ha desplegado.
- **El envío real de correo.** No hay credenciales de Resend. El endpoint está
  probado hasta el punto de la llamada a la API.
- **Que el enlace de PayPal y el IBAN sean los correctos.** Se han publicado
  tal y como figuran en la documentación de la asociación.
