export type BandName = "light" | "dim" | "dark" | "navy";

/** Bandas em que o texto precisa ser claro. */
const ESCURAS: ReadonlySet<BandName> = new Set<BandName>(["dark", "navy"]);

/**
 * Lê a banda a partir das classes de contexto de uma seção. A ordem importa:
 * um elemento pode ter mais de uma classe e a mais escura manda, porque é ela
 * que define a cor do texto por cima.
 */
export function bandFromClasses(classes: readonly string[]): BandName {
  if (classes.includes("ctx-dark")) return "dark";
  if (classes.includes("ctx-navy")) return "navy";
  if (classes.includes("ctx-dim")) return "dim";
  return "light";
}

/** A topbar precisa inverter o texto quando está sobre uma destas. */
export function isBandEscura(band: BandName): boolean {
  return ESCURAS.has(band);
}
