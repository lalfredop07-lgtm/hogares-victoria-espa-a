"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  label: string;
  copiedLabel: string;
  announcement: string;
  className?: string;
};

/** Boton de copia con confirmacion accesible anunciada por lector de pantalla. */
export function CopyButton({
  value,
  label,
  copiedLabel,
  announcement,
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Respaldo para navegadores sin permiso de portapapeles
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        return;
      } finally {
        document.body.removeChild(area);
      }
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2600);
  }

  return (
    <>
      <button type="button" onClick={copy} className={className}>
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7.5L5 11.5L13 2.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="4.75" y="0.75" width="8.5" height="10.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M9.25 13.25H0.75V2.75" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        )}
        {copied ? copiedLabel : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only-hv">
        {copied ? announcement : ""}
      </span>
    </>
  );
}
