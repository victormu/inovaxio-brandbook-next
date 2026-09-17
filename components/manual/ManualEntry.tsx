import { Reveal } from "@/components/ui/Reveal";

interface ManualEntryProps {
  /** Rótulo curto acima da mídia. Ex.: "Assinatura horizontal". */
  eyebrow: string;
  /** A mídia: imagem, placeholder, grade de amostras, o que for. */
  children: React.ReactNode;
  /** Texto descritivo. Curto, no máximo 62ch. */
  description?: string;
  /** Ficha técnica. Ex.: ["SVG", "24 KB", "área de proteção 1x"]. */
  specs?: string[];
  /** Alvo do trilho. Use o mesmo id do subitem em lib/nav.ts. */
  id?: string;
}

/**
 * Unidade do manual: rótulo pequeno, mídia grande, descritivo curto, ficha
 * técnica menor ainda. É o contraste entre 12px e a mídia em largura total
 * que produz a leitura de manual impresso, não o tamanho absoluto de nada.
 */
export function ManualEntry({
  eyebrow,
  children,
  description,
  specs,
  id,
}: ManualEntryProps) {
  return (
    <Reveal as="section" className="entry" id={id}>
      <p className="entry__eyebrow">{eyebrow}</p>
      <div className="entry__media">{children}</div>
      {description ? <p className="entry__desc">{description}</p> : null}
      {specs && specs.length > 0 ? (
        <p className="entry__specs">{specs.join(" · ")}</p>
      ) : null}
    </Reveal>
  );
}
