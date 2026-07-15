import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  title: string;
  /** Meta curta à esquerda (wayfinding). Ex.: "Cor", "Logo", "01". */
  eyebrow?: string;
  description?: string;
  level?: 1 | 2;
  /** Remove o hairline/padding do topo (use na primeira seção da página). */
  flush?: boolean;
  /** id no heading, para preservar aria-labelledby da <section> que o envolve. */
  titleId?: string;
}

/**
 * Intro de seção no padrão IBM Design Language: meta pequena à esquerda,
 * título grande + lead à direita, hairline no topo marcando o limite no grid.
 * O nível 1 (cabeçalho de página) fica preservado para compatibilidade, mas
 * as páginas usam PageBanner para isso; na prática só o nível 2 é renderizado.
 */
export function SectionHeader({
  title,
  eyebrow,
  description,
  level = 2,
  flush = false,
  titleId,
}: SectionHeaderProps) {
  if (level === 1) {
    return (
      <header
        style={{
          paddingBottom: "var(--space-10)",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "var(--space-10)",
        }}
      >
        {eyebrow ? (
          <div
            className="label"
            style={{ color: "var(--color-primary-text)", marginBottom: "var(--space-3)" }}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          id={titleId}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-4xl)",
            color: "var(--color-text)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            marginBottom: description ? "var(--space-4)" : 0,
          }}
        >
          {title}
        </h1>
        {description ? (
          <p
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "60ch",
            }}
          >
            {description}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <Reveal as="header" className="section-intro" data-flush={flush ? "true" : undefined}>
      <div className="section-intro__meta">
        {eyebrow ? <span className="label">{eyebrow}</span> : null}
      </div>
      <div className="section-intro__body">
        <h2 id={titleId} className="section-intro__title">{title}</h2>
        {description ? <p className="section-intro__lead">{description}</p> : null}
      </div>
    </Reveal>
  );
}
