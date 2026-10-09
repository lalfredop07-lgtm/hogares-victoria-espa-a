"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { Logo } from "./Logo";

const NAV: { href: AppPathname; key: string }[] = [
  { href: "/quienes-somos", key: "about" },
  { href: "/nuestra-labor", key: "work" },
  { href: "/historias", key: "stories" },
  { href: "/impacto", key: "impact" },
  { href: "/colabora", key: "give" },
  { href: "/contacto", key: "contact" },
];

const SCROLL_THRESHOLD = 16;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > SCROLL_THRESHOLD;
}

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* La posicion de scroll es estado del navegador, no de React: se lee con
     useSyncExternalStore para evitar un efecto que llame a setState. */
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  /* Solo la portada tiene un hero oscuro a sangre; en el resto la cabecera
     arranca opaca. Se deriva de la ruta, sin consultar el DOM. */
  const overlay = pathname === "/";

  /* Cierra el menu al cambiar de pagina (incluido el boton "atras" del
     navegador), ajustando el estado durante el render en lugar de en un
     efecto. */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  /* Menu movil: bloqueo de scroll, cierre con Escape y foco contenido. */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const transparent = overlay && !scrolled && !open;

  return (
    <header
      data-transparent={transparent}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        transparent
          ? "on-ink border-b border-transparent bg-transparent"
          : "border-b border-hair bg-paper/95 backdrop-blur-md"
      }`}
    >
      <div className="container-hv flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${t("home")} — Hogares Victoria`}
        >
          <Logo height={44} priority className="lg:!h-[52px]" />
        </Link>

        {/* --- Navegacion de escritorio --- */}
        <nav
          aria-label={t("primary")}
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`label-hv relative py-2 transition-colors duration-200 ${
                  transparent
                    ? "text-paper/85 hover:text-paper"
                    : "text-ink-80 hover:text-red"
                } ${active ? "!text-red" : ""}`}
              >
                {t(item.key)}
                {active ? (
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-red"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          {/* --- Selector de idioma --- */}
          <div
            className={`hidden items-center gap-1.5 border-r pr-3 text-[11px] sm:flex lg:pr-4 ${
              transparent ? "border-paper/25" : "border-hair-strong"
            }`}
          >
            {routing.locales.map((loc) => {
              const current = loc === locale;
              return (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  hrefLang={loc}
                  aria-current={current ? "true" : undefined}
                  className={`label-hv px-2 py-3 transition-colors ${
                    current
                      ? transparent
                        ? "text-paper"
                        : "text-ink"
                      : transparent
                        ? "text-paper/70 hover:text-paper"
                        : "text-ink-40 hover:text-red"
                  }`}
                >
                  <span className="sr-only-hv">
                    {loc === "es" ? t("spanish") : t("english")}
                  </span>
                  <span aria-hidden="true">{loc.toUpperCase()}</span>
                </Link>
              );
            })}
          </div>

          {/* En moviles pequenos solo cabe un boton: tiene prioridad el acceso
              a ayuda. El de donar aparece a partir de 640px y, en cualquier
              caso, encabeza el menu desplegable. */}
          <Link
            href="/necesito-ayuda"
            className={`btn !min-h-11 !px-4 !py-2.5 !text-[11px] sm:hidden ${
              transparent ? "btn-outline-inv" : "btn-primary"
            }`}
          >
            {tc("helpShort")}
          </Link>

          <Link
            href="/necesito-ayuda"
            className={`btn hidden !min-h-11 !px-4 !py-2.5 !text-[11px] md:inline-flex ${
              transparent ? "btn-outline-inv" : "btn-outline"
            }`}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
              aria-hidden="true"
            />
            {tc("help")}
          </Link>

          <Link
            href="/colabora"
            className="btn btn-primary hidden !min-h-11 !px-5 !py-2.5 !text-[11px] sm:inline-flex"
          >
            {tc("donate")}
          </Link>

          {/* --- Boton de menu movil --- */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`flex h-11 w-11 items-center justify-center lg:hidden ${
              transparent && !open ? "text-paper" : "text-ink"
            }`}
          >
            <span className="sr-only-hv">
              {open ? t("closeMenu") : t("openMenu")}
            </span>
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[2px] w-6 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* --- Panel movil --- */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="on-ink fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto border-t border-hair-inv bg-ink lg:hidden"
      >
        <nav
          aria-label={t("primary")}
          className="container-hv flex flex-col py-2"
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className="group flex items-baseline gap-4 border-b border-hair-inv py-5 text-paper"
            >
              <span className="label-hv text-red" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display-s">{t(item.key)}</span>
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/necesito-ayuda"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              {tc("help")}
            </Link>
            <Link
              href="/colabora"
              onClick={() => setOpen(false)}
              className="btn btn-outline-inv w-full"
            >
              {tc("donateLong")}
            </Link>
            <Link
              href="/voluntariado"
              onClick={() => setOpen(false)}
              className="btn btn-outline-inv w-full"
            >
              {t("volunteer")}
            </Link>
          </div>

          <div className="mb-10 mt-8 flex items-center gap-4 border-t border-hair-inv pt-6">
            <span className="label-hv text-paper/60">{t("language")}</span>
            <div className="flex gap-2">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  hrefLang={loc}
                  onClick={() => setOpen(false)}
                  aria-current={loc === locale ? "true" : undefined}
                  className={`label-hv rounded-sm border px-3 py-2 transition-colors ${
                    loc === locale
                      ? "border-paper bg-paper text-ink"
                      : "border-hair-inv-strong text-paper/70"
                  }`}
                >
                  {loc === "es" ? t("spanish") : t("english")}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
