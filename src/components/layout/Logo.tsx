import Image from "next/image";

/**
 * Logotipo oficial de la asociacion, usado tal cual.
 * No se recolorea, no se recorta y no se altera su proporcion: el corazon rojo
 * con el rotulo en blanco funciona sobre fondos claros y oscuros por igual.
 */
export function Logo({
  height = 52,
  priority = false,
  className = "",
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const ratio = 900 / 756;
  return (
    <Image
      src="/brand/logo-hogares-victoria.png"
      alt="Hogares Victoria España"
      width={Math.round(height * ratio)}
      height={height}
      priority={priority}
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}
