/** Filete horizontal con marca roja. Abre secciones y separa bloques. */
export function Rule({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={`relative h-px w-full ${
        tone === "paper" ? "bg-paper/25" : "bg-ink/20"
      } ${className}`}
      aria-hidden="true"
    >
      <span className="absolute -top-px left-0 h-[3px] w-14 bg-red" />
    </div>
  );
}
